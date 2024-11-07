/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 21:06:04
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 21:26:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/WarnException.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
type exceptionInfo = {
    title: string,
    remark: string,
    code?: string,
}
export default class WarnException extends Error {
    private info: exceptionInfo
    constructor(message: exceptionInfo) {
        super(message.title);
        this.info = message
        this.name = "WarnException";
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    public getInfo(): exceptionInfo {
        return this.info
    }
}