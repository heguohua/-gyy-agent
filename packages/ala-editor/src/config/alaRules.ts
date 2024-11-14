import emailRule from "./rules/emailRule";
import enumRule from "./rules/enumRule";
import numberMaxRule from "./rules/numberMaxRule";
import numberMinRule from "./rules/numberMinRule";
import numberRangeRule from "./rules/numberRangeRule";
import numberRule from "./rules/numberRule";
import patternRule from "./rules/patternRule";
import requiredRule from "./rules/requiredRule";
import strLengthRangeRule from "./rules/strLengthRangeRule";
import strLengthRule from "./rules/strLengthRule";
import strMaxRule from "./rules/strMaxRule";
import strMinRule from "./rules/strMinRule";
import urlRule from "./rules/urlRule";

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 19:22:22
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 20:51:46
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaRules.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */


/**
 * 【 非空 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaRequired(message?: string, trigger = 'change'): requiredRule {
    return {
        required: true,
        trigger,
        message: message ? message : "参数不能为空"
    }
}

/**
 * 字符串 【 最少字符数 】 校验
 * @param message 提示信息
 * @param min 最少字符数
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaStrMin(min: number, message?: string, trigger = 'change'): strMinRule {
    return {
        min,
        trigger,
        message: message ? message : `字符长度不能少于 ${min} 个`
    }
}

/**
 * 字符串 【 最大字符数 】 校验
 * @param message 提示信息
 * @param max 最大字符数
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaStrMax(max: number, message?: string, trigger = 'change'): strMaxRule {
    return {
        max,
        trigger,
        message: message ? message : `字符长度不能大于 ${max} 个`
    }
}
/**
 * 字符串 【 字符长度 】 校验
 * @param message 提示信息
 * @param min 最少字符数
 * @param max 最大字符数
 * @param trigger  校验时机，默认change
 * @returns 
 */
export function alaStrLengthRange(min: number, max: number, message?: string, trigger = 'change'): strLengthRangeRule {
    return {
        min,
        max,
        trigger,
        message: message ? message : `字符长度需要在 ${min} 和 ${max} 之间`
    }
}
/**
 * 字符串 【 精确长度 】 校验
 * @param message 提示信息
 * @param len 字符数
 * @param trigger  校验时机，默认change
 * @returns 
 */
export function alaStrLength(len: number, message?: string, trigger = 'change'): strLengthRule {
    return {
        len,
        trigger,
        message: message ? message : `只能输入 ${len} 个字符`
    }
}


/**
 * 数值 【 最小值 】 校验
 * @param message 提示信息
 * @param min 最小值
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaNumberMin(min: number, message?: string, trigger = 'change'): numberMinRule {
    return {
        min,
        trigger,
        message: message ? message : `参数值不能小于 ${min}`,
        type: 'number',
    }
}

/**
 * 数值 【 最大值 】 校验
 * @param message 提示信息
 * @param max 最大值
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaNumberMax(max: number, message?: string, trigger = 'change'): numberMaxRule {
    return {
        max,
        trigger,
        message: message ? message : `参数值不能大于 ${max}`,
        type: 'number',
    }
}

/**
 * 数值 【 范围 】 校验
 * @param message 提示信息
 * @param min 最小值
 * @param max 最大值
 * @param trigger  校验时机，默认change
 * @returns 
 */
export function alaNumberRange(min: number, max: number, message?: string, trigger = 'change'): numberRangeRule {
    return {
        min,
        max,
        trigger,
        message: message ? message : `参数值需要在 ${min} 和 ${max}之间`,
        type: 'number',
    }
}


/**
 * 字符串 【 正则表达式 】 校验
 * @param message 提示信息
 * @param pattern 正则表达式
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaPattern(message: string, pattern: RegExp, trigger = 'change'): patternRule {
    return {
        trigger,
        message,
        pattern,
    }
}

/**
 * 字符串 【 枚举值 】 校验
 * @param message 提示信息
 * @param enums 枚举值数组
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaEnumRule(message: string, enums: [string], trigger = 'change'): enumRule {
    return {
        trigger,
        message: message ? message : `只能填写${enums}`,
        enum: enums,
    }
}

// 邮箱

/**
 * 【 邮箱 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaEmail(message?: string, trigger = 'change'): emailRule {
    return {
        trigger,
        message: message ? message : "邮箱格式不正确",
        type: 'email'
    }
}

/**
 * 【 手机号 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaPhone(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "手机号格式不正确",
        pattern: /^1[3-9]\d{9}$/, // 正则表达式，匹配中国大陆手机号
    }
}

/**
 * 【 URL 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaUrl(message?: string, trigger = 'change'): urlRule {
    return {
        trigger,
        message: message ? message : "网址格式不正确",
        type: 'url'
    }
}


// 身份证号

/**
 * 【 身份证号 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaCard(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "身份证号码格式不正确",
        pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 正则表达式，匹配身份证号码
    }
}

// 纯数字

/**
 * 【 纯数字 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaNumber(message?: string, trigger = 'change'): numberRule {
    return {
        trigger,
        message: message ? message : "只能包含数字",
        type: 'number'
    }
}

// 纯字母
/**
 * 【 大写字母、小写字母混合 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaLetter(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "只能包含大写字母、小写字母",
        pattern: /^[a-zA-Z]*$/,
    }
}

// 字母+数字
/**
 * 【 大写字母、小写字母、数字混合 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaLOrlOr8(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "只能包含大写字母、小写字母或数字",
        pattern: /^[a-zA-Z0-9]*$/,
    }
}

// 字母+数字
/**
 * 同时包含【 大写字母、小写字母、数字 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaLl8(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "至少包含一个大写字母、小写字母和数字的组合",
        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]*$/,
    }
}

// 小写字母、大写字母、数字
/**
 * 【 大写字母、小写字母、数字混合、特殊字符 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaLOrlOr8Or_(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "只能是大写字母、小写字母、数字或特殊字符的组合",
        pattern: /^[a-zA-Z0-9\p{P}\p{S}]+$/u,
    }
}
/**
 * 同时包含【 大写字母、小写字母、数字混合、特殊字符 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaLl8_(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "至少包含一个大写字母、小写字母、数字和特殊字符的组合",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
    }
}

// 密码强度
/**
 * 【 至少包含一个大写字母、小写字母、数字的，字符数在 8 ~ 32 之间的密码 】 校验
 * @param message 提示信息
 * @param trigger 校验时机，默认change
 * @returns 
 */
export function alaPassword(message?: string, trigger = 'change'): patternRule {
    return {
        trigger,
        message: message ? message : "密码8~32位，至少包含一个大写字母、小写字母和数字的组合",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
    }
}
