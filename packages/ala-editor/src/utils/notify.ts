/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 19:22:27
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 20:52:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/notify.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { ElNotification } from 'element-plus'
type notifyType = 'success' | 'warning' | 'info' | 'error'
type positionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export default class notify {
    /**
     * 显示 html 格式的消息
     */
    public static html(notify: string) {
        ElNotification({
            dangerouslyUseHTMLString: true,
            message: notify,
        })
    }
    /**
     * 显示 success 格式的消息
     */
    public static success(title: string, notify: string) {
        // notifyTitle , notify , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._notify(title, notify, 'success', false, 3000, false, 'top-right', 0)
    }
    /**
     * 显示 info 格式的消息
     */
    public static info(title: string, notify: string) {
        // notifyTitle , notify , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._notify(title, notify, 'info', false, 2000, false, 'top-right', 0)
    }
    /**
     * 显示 warn 格式的消息
     */
    public static warn(title: string, notify: string) {
        // notifyTitle , notify , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._notify(title, notify, 'warning', false, 4000, false, 'top-right', 0)
    }

    /**
     * 显示 error 格式的消息
     */
    public static error(title: string, notify: string) {
        // notifyTitle , notify , mt , isHtml , durationTime , showCloseButton , pt , ot
        this._notify(title, notify, 'error', false, 5000, false, 'top-right', 0)
    }
    /**
     * 本类内部通用方法
     */
    public static _notify(notifyTitle: string, notify: string, mt: notifyType, isHtml = false, durationTime = 3000, showCloseButton = false, pt: positionType, ot = 0) {
        ElNotification({
            title: notifyTitle,
            message: notify,
            offset: ot,
            type: mt,
            dangerouslyUseHTMLString: isHtml,
            duration: durationTime,
            showClose: showCloseButton,
            position: pt,
        })
    }
}