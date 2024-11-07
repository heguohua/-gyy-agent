/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 19:22:27
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 20:52:19
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/msg.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { ElMessage } from 'element-plus'
type msgType = 'success' | 'warning' | 'info' | 'error';

export default class msg {
    /**
     * 显示 html 格式的消息
     */
    public static html(msg: string) {
        ElMessage({
            dangerouslyUseHTMLString: true,
            message: msg,
        })
    }
    /**
     * 显示 success 格式的消息
     */
    public static success(msg: string) {
        // msg, mt, isHtml, durationTime, showCloseButton, alignCenter, topHeight, grouped
        this._msg(msg, 'success', false, 3000, false, false, 26, false, true)
    }
    /**
     * 显示 info 格式的消息
     */
    public static info(msg: string) {
        // msg, mt, isHtml, durationTime, showCloseButton, alignCenter, topHeight, grouped
        this._msg(msg, 'info', false, 2000, false, false, 26, false, true)
    }
    /**
     * 显示 warn 格式的消息
     */
    public static warn(msg: string) {
        // msg, mt, isHtml, durationTime, showCloseButton, alignCenter, topHeight, grouped
        this._msg(msg, 'warning', false, 4000, false, false, 26, false, true)
    }

    /**
     * 显示 error 格式的消息
     */
    public static error(msg: string) {
        // msg, mt, isHtml, durationTime, showCloseButton, alignCenter, topHeight, grouped
        this._msg(msg, 'error', false, 5000, false, false, 26, false, true)
    }
    /**
     * 本类内部通用方法
     * msg：消息体
     * mt：消息类型，只能取值 'success' | 'warning' | 'info' | 'error'
     * plain：是否是纯色消息
     * icon：自定义图标string / Component
     * isHtml：是否是以html显示消息体
     * durationTime：消息显示持续时间 ms
     * showCloseButton：是否显示关闭按钮
     * alignCenter：文字是否居中显示
     * topHeight：消息距离顶部的距离
     * grouped：是否分组
     */
    public static _msg(msg: string, mt: msgType, isHtml = false, durationTime = 3000, showCloseButton = false, alignCenter = false, topHeight = 16, grouped = false, isPlain = false) {
        ElMessage({
            message: msg,
            grouping: grouped,
            type: mt,
            dangerouslyUseHTMLString: isHtml,
            duration: durationTime,
            showClose: showCloseButton,
            center: alignCenter,
            offset: topHeight,
            plain: isPlain,
        })
    }
}