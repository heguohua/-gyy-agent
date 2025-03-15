/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-03-15 19:34:05
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-15 20:59:45
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/websocket.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { alaConsts } from "@/config/alaConsts";
import { logger } from "@/utils/logger";

// utils/websocket.ts
export class WebSocketClient {
    private socket: WebSocket | null = null;
    private url: string;
    private timer: any;
    private pingCount: number;
    private reconnectInterval: number;
    private reconnectTimer: number | null = null;
    private isConnecting: boolean = false; // 避免重复连接的标志位
    constructor(url: string, reconnectInterval: number = 3000, pingCount = 5) {
        logger.info(`即将建立ws连接，URL[ ${url} ]，reconnectInterval[ ${reconnectInterval} ]`);

        this.url = url;
        this.reconnectInterval = reconnectInterval;
        this.connect();
        this.pingCount = pingCount
    }

    private connect(): void {

        if (this.isConnecting) {
            console.warn('WebSocket is already connecting. Avoiding duplicate connection.');
            return;
        }

        this.isConnecting = true;

        logger.info(`正在建立ws连接，URL[ ${this.url} ]，reconnectInterval[ ${this.reconnectInterval} ]`);

        const token = localStorage.getItem(alaConsts.token_name)
        // config.headers[alaConsts.token_name] = localStorage.getItem(alaConsts.token_name) || '';
        this.socket = new WebSocket(this.url + '?token=' + token + '&ct=web');

        this.socket.onopen = (event: Event) => {
            logger.info('WebSocket connected:', event);
            this.$emit('ws:open', event);

            // 注册心跳定时发送机制
            // 定时心跳

            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setInterval(() => {
                // console.log("ws【 发送心跳 】")
                // ping超过5次未响应则重连
                // this.pingCount++
                // if (this.pingCount >= 5) {

                //     console.log("【 5次心跳均发送失败 】即将重新连接")
                //     this.reconnect()

                //     return
                // } else {

                // }

                this.send('ping')


            }, 5000)

        };

        this.socket.onmessage = (event: MessageEvent) => {
            // logger.info('ws接收到数据:', event);
            this.$emit('ws:message', event);
        };

        this.socket.onerror = (event: Event) => {
            console.error('ws接收到错误事件', event);
            this.$emit('ws:error', event);
        };

        this.socket.onclose = (event: CloseEvent) => {
            logger.info('即将关闭ws连接', event);
            this.$emit('ws:close', event);
            this.reconnect();
        };
    }

    private reconnect(): void {
        logger.warn('即将【 重新建立ws连接 】');
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
        this.reconnectTimer = window.setTimeout(() => {
            this.connect();
        }, this.reconnectInterval);
    }

    public send(data: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            console.warn('WebSocket is not connected');
        }
    }

    public close(): void {
        if (this.socket) {
            this.socket.close();
        }
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
    }

    private $emit(event: string, data: any): void {
        const customEvent = new CustomEvent(event, { detail: data });
        // console.log('派发事件:',customEvent);

        window.dispatchEvent(customEvent);
    }

    public on(event: any, callback: (data: any) => void): void {
        // console.log('event:',event);

        window.addEventListener(event, (e: CustomEvent) => {
            if (e.detail) {
                callback(e.detail);
            }
        });
    }
}