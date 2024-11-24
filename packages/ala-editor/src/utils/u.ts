/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 20:45:03
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-24 11:21:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/u.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import notify from "@/utils/notify"
import WarnException from "@/utils/WarnException"
import { cloneDeep, merge } from "lodash";
import { logger } from "./logger";
const profile = import.meta.env.VITE_PROFILE
export default class u {

    // 生成uuid
    public static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

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
    public static checkBoolean(obj: boolean, remark: any, title = "温馨提示：") {
        if (obj) {
            throw new WarnException({ title, remark })
        }
    }
    /**
     * 对象深度clone方法
     * @param e object
     * @returns 
     */
    public static cloned(obj: object) {
        return cloneDeep({ ...obj })
    }
    /**
     * 对象深度 合并 方法
     * @param target 
     * @param source 
     * @returns 
     */
    public static merged(target: object, source: object) {
        return merge(target, source)
    }

    /**
     * 清空对象所有属性
     * @param obj 
     */
    public static clear(obj: Record<string, any> | undefined) {
        if (obj) {
            Object.keys(obj).forEach(key => {
                delete obj[key];
            });
        }

    }

    /**
     * 使用 params 对象中的字段变量 格式化模板字符串 source
     * 使用示例：
     * format("这是第一个参数{name},这是第二个参数{age}",{name:'张三'，age:18})
     * 输出结果：这是第一个参数张三,这是第二个参数18
     * @params obj 
     */
    public static format(target: string, params: { [key: string]: any }): string {
        logger.error(`格式化字符串入参`, target, params);

        return target.replace(/\{(\w+)\}/g, (_, key) => {
            return key in params ? String(params[key]) : '';
        })
    }

    public static resetState(obj: any) {
        Object.keys(obj).forEach(key => {
            // 排除原型链上的属性和索引，只清空自定义属性
            if (obj.hasOwnProperty(key)) {
                obj[key] = null; // 或者 state[key] = undefined; 或者 state[key] = '';
            }
        });


    }
}
