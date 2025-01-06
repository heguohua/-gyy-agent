/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 20:45:03
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-06 18:01:59
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

    /**
     * 将对象转为json字符串
     * @param obj 
     * @returns 
     */
    public static tojson(obj: any) {
        return JSON.stringify(obj);
    }

    /**
     * 将 字符串 转为对象
     * @param str 
     * @returns 
     */
    public static parseJson(str: string) {
        return JSON.parse(str);
    }

    /**
     * 
     * @param label 解析国际化字符串
     * @param t 
     * @returns 
     */
    public static parseI18n(label: string, t: Function) {
        if (label.startsWith('t("')) {
            return t(label.slice(3, label.length - 2));
        } else {
            return label
        }
    }

    /**
     *  非空校验
     * @param data 数据
     * @param i18nKey 国际化key或者提示信息
     * @param t 
     * @returns 
     */
    public static checkEmpty(data: object, i18nKey: string, t: Function) {
        if (!data) {
            const title = (i18nKey.startsWith("t('") ? t(i18nKey) : i18nKey) + '“ 不存在 ” ！'
            notify.error(t('pop.warm_title'), title)
            throw `${title}`
        }
    }

    /**
     *  去除 收尾 空格
     * @param data 数据
     * @returns 
     */
    public static trim(data: string) {
        return data.trim()
    }

    /**
     * 根据正则表达式判断是否匹配
     * @param data 
     * @param pattern 
     * @returns 
     */
    public static pattern(data: string, pattern: RegExp) {
        if (!data) {
            return false
        }
        let result = false
        if (pattern.test(data)) {
            result = true
        }
        return result
    }


    /**
     * 抛出异常
     * @param remark 
     * @param title 
     */
    public static error(remark: any, title = "温馨提示：") {
        notify.error(title, remark)
        throw new WarnException({ title, remark })
    }

    /**
     * 从一个对象中深度取值，如
     * const aaa = {instance: {user: {name: 123}}};
     * const path = 'instance.user.name';
     * @param data 
     * @param path 
     * @returns 
     */
    public static deepValue(data: object, path: string) {
        // 将路径字符串拆分成属性名数组
        const pathParts = path.split('.');

        // 使用 reduce 方法遍历路径数组，动态访问对象属性
        const value = pathParts.reduce((obj: { [key: string]: any }, key) => obj && obj[key], data);

        return value
    }

}
