/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 20:45:03
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-15 19:53:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/validate.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import notify from "@/utils/notify"
import WarnException from "@/utils/WarnException"
import { cloneDeep, merge } from "lodash";
import { logger } from "./logger";
import u from "./u";
const profile = import.meta.env.VITE_PROFILE
export default class validate {

    static readonly rules: Record<string, RegExp> = {
        phone: /^1[3-9]\d{9}$/,
        idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        LOrl: /^[a-zA-Z]*$/,
        LOrlOr8: /^[a-zA-Z0-9]*$/,
        Ll8: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]*$/,
        LOrlOr8Or_: /^[a-zA-Z0-9\p{P}\p{S}]+$/u,
        Ll8_: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
        No_: /^[a-zA-Z0-9\u4E00-\u9FFF\u0400-\u04FF]+$/,
    }

    /**
     * 
     * @param data 
     * @param message 
     * @param t 
     * @param callback 
     * @returns true - 通过 ， false - 未通过
     */
    public static required(data: any) {
        let result = false
        if (typeof data === 'string') {
            if (u.trim(data)) {
                result = true
            }
        } else if (typeof data === 'number') {
            if (!data) {
                if (data === 0) {
                    result = true
                }
            } else {
                result = true
            }
        } else {
            if (data) {
                result = true
            }
        }
        return result
    }

    /**
     * 
     * @param data 
     * @param pattern 
     * @param message 
     * @param t 
     * @param callback 
     */
    public static pattern(data: string, type: any) {
        let result = false
        if (typeof data === 'string') {
            let pattern = undefined
            if (typeof type === "string") {
                pattern = validate.rules[type]
            } else if (type instanceof RegExp) {
                pattern = type
            } else {
                logger.error(`注意，注意，注意：type【 ${type} 】类型未知`);
            }

            if (pattern) {
                const checkResult = u.pattern(data, pattern)
                if (checkResult) {
                    result = true
                }
            }
        } else {
            logger.error(`data【 ${data} 】不是字符串，不能使用正则表达式检验`);
        }

        return result
    }

    /**
     * 
     * @param data 
     * @param length 
     * @returns  true - 通过 ， false - 未通过
     */
    public static min(data: any, length: number) {
        let result = false
        if (typeof data === 'string') {
            if (u.trim(data).length >= length) {
                result = true
            }
        } else if (typeof data === 'number') {
            if (!data) {
                if (u.trim(data + '').length >= length) {
                    result = true
                }
            } else {
                result = true
            }
        } else {
            if (data) {
                result = true
            }
        }
        return result
    }

    /**
     * 
     * @param data 
     * @param length 
     * @returns  true - 通过 ， false - 未通过
     */
    public static max(data: any, length: number) {
        let result = false
        if (typeof data === 'string') {
            if (u.trim(data).length <= length) {
                result = true
            }
        } else if (typeof data === 'number') {
            if (!data) {
                if (u.trim(data + '').length <= length) {
                    result = true
                }
            } else {
                result = true
            }
        } else {
            if (data) {
                result = true
            }
        }
        return result
    }

}
