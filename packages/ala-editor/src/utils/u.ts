/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 20:45:03
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 17:33:05
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/u.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import notify from "@/utils/notify"
import WarnException from "@/utils/WarnException"
const profile = import.meta.env.VITE_PROFILE
export default class u {
    /**
     * 自动拼接访问路径代理前缀
     */
    public static url(url: string) {
        return profile + url
    }
    /**
     * 检查任一对象是否不存在
     * @param obj 
     * @returns 
     */
    public static isNull(obj: any) {
        if (!obj) {
            return true
        }
        return false
    }

    /**
     * 检查任一对象是否为不存在，如果不存在则给出提示消息
     * @param obj 
     * @param remark 
     * @param title 
     */
    public static checkNull(obj: any, remark: any, title = "温馨提示：") {
        if (this.isNull(obj)) {
            // throw new WarnException({ title, remark, code: 'checkNull' })
            throw new WarnException({ title, remark })
        }
    }

    /**
     * 当前参数是否是False，为False给出提示消息
     * @param obj 
     * @param remark 
     * @param title 
     */
    public static checkFalse(obj: boolean, remark: any, title = "温馨提示：") {
        if (!obj) {
            throw new WarnException({ title, remark })
        }
    }
}
