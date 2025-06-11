/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-02-02 18:51:41
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-11 15:59:53
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/Snowflake.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export default class Snowflake {
    // 起始时间戳（2021-01-01 00:00:00, UTC）
    private static readonly EPOCH = 1609459200000;

    // 机器节点位数
    private static readonly WORKER_ID_BITS = 10;

    // 序列号位数
    private static readonly SEQUENCE_BITS = 12;

    // 最大机器节点数
    private static readonly MAX_WORKER_ID = (1 << Snowflake.WORKER_ID_BITS) - 1;

    // 最大序列号
    private static readonly MAX_SEQUENCE = (1 << Snowflake.SEQUENCE_BITS) - 1;

    // 机器节点左移位数
    private static readonly WORKER_ID_SHIFT = Snowflake.SEQUENCE_BITS;

    // 时间戳左移位数
    private static readonly TIMESTAMP_SHIFT = Snowflake.SEQUENCE_BITS + Snowflake.WORKER_ID_BITS;

    // 机器节点 ID
    private workerId: number;

    // 序列号
    private sequence: number;

    // 上一次生成 ID 的时间戳
    private lastTimestamp: number;

    constructor(workerId: number) {
        if (workerId < 0 || workerId > Snowflake.MAX_WORKER_ID) {
            throw new Error(`workerId must be between 0 and ${Snowflake.MAX_WORKER_ID}`);
        }
        this.workerId = workerId;
        this.sequence = 0;
        this.lastTimestamp = -1;
    }

    private tilNextMillis(lastTimestamp: number): number {
        let timestamp = this.timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = this.timeGen();
        }
        return timestamp;
    }

    private timeGen(): number {
        return Date.now();
    }

    public nextId(): number {
        let timestamp = this.timeGen();

        if (timestamp < this.lastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) & Snowflake.MAX_SEQUENCE;
            if (this.sequence === 0) {
                timestamp = this.tilNextMillis(this.lastTimestamp);
            }
        } else {
            this.sequence = 0;
        }

        this.lastTimestamp = timestamp;

        return (
            ((timestamp - Snowflake.EPOCH) << Snowflake.TIMESTAMP_SHIFT) |
            (this.workerId << Snowflake.WORKER_ID_SHIFT) |
            this.sequence
        );
    }
}


// 使用示例
// const snowflake = new Snowflake(1); // 机器节点 ID 为 1