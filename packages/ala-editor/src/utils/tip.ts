/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 19:22:27
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-31 18:54:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/tip.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { ElMessage } from 'element-plus'
type messageType = 'success' | 'warning' | 'info' | 'error'
type positionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export default class tip {
    /**
     * 显示 html 格式的消息
     */
    public static html(message: string) {
        ElMessage({
            dangerouslyUseHTMLString: true,
            message: message,
        })
    }
    /**
     * 显示 success 格式的消息
     */
    public static success(message: string) {
        // messageTitle , message , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._message(message, 'success', false, 3000, false, 'top-right', 0)
    }
    /**
     * 显示 info 格式的消息
     */
    public static info(title: string, message: string) {
        // messageTitle , message , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._message(message, 'info', false, 2000, false, 'top-right', 0)
    }
    /**
     * 显示 warn 格式的消息
     */
    public static warn(title: string, message: string) {
        // messageTitle , message , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._message(message, 'warning', false, 4000, true, 'top-right', 0)
    }

    /**
     * 显示 error 格式的消息
     */
    public static error(message: string) {
        // messageTitle , message , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._message(message, 'error', false, 5000, true, 'top-right', 0)
    }
    /**
     * 本类内部通用方法
     */
    public static _message(message: string, mt: messageType, isHtml = false, durationTime = 3000, showCloseButton = false, pt: positionType, ot = 0) {
        ElMessage({
            message,
            offset: ot,
            type: mt,
            dangerouslyUseHTMLString: isHtml,
            duration: durationTime,
            showClose: showCloseButton,
        })
    }
}