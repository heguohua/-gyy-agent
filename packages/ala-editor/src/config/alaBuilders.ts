/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 22:50:58
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 17:57:15
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaBuilders.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import AlaInputSchema from "@/components/cps/input/alaInputSchema"
import AlaNumberSchema from "@/components/cps/number/alaNumberSchema"
import u from "@/utils/u";
import baseRule from "./rules/baseRule";
import AlaRadioSchema from "@/components/cps/radio/alaRadioSchema";
import AlaCheckboxSchema from "@/components/cps/checkbox/alaCheckboxSchema";
import AlaPasswordSchema from "@/components/cps/password/alaPasswordSchema";
import AlaSwitchSchema from "@/components/cps/switch/alaSwitchSchema";
import AlaDateSchema from "@/components/cps/date/alaDateSchema";
import AlaSliderSchema from "@/components/cps/slider/alaSliderSchema";


/**
 * 将 {"男":'man'} 格式对象转换成 { name: "男", value: "man" } 格式
 */
type Item = { name: string; value: string };
function convertToItem(config: { [key: string]: string }): Item {

    const item: Item = {
        name: '',
        value: '',
    }
    Object.keys(config).forEach(key => {
        const value = config[key];
        item.name = key;
        item.value = value;
    });
    return item;
}

export function alaBuild(componentName: string, fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string) {
    return {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : `请输入${label}`,
        fieldName: fieldName,
        rules,
    }
}

export function alaBuildWithItems(componentName: string, fieldName: string, label: string, items: Array<Item>, rules?: Array<baseRule>, placeholder?: string) {
    const obj = {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : `请输入${label}`,
        fieldName: fieldName,
        other: {
            items
        },
        rules
    }
    return obj
}

export function alaBuildWithOther(componentName: string, fieldName: string, label: string, other: { [key: string]: any }, rules?: Array<baseRule>, placeholder?: string) {
    const obj = {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : `请输入${label}`,
        fieldName: fieldName,
        other,
        rules
    }
    return obj
}

/**
 * 构建 AlaInput 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildInput(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string): AlaInputSchema {
    const obj = alaBuild("AlaInput", fieldName, label, rules, placeholder)
    return obj
}

/**
 * 构建 AlaInput 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildRawInput(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string): AlaInputSchema {
    const obj = alaBuild("AlaCustomerizationComponentDemo", fieldName, label, rules, placeholder)
    return obj
}
/**
 * 构建 AlaHidden 组件
 * @param fieldName  属性名
 * @returns 
 */
export function alaBuildHidden(fieldName: string,): AlaInputSchema {
    const obj = alaBuild("AlaHidden", fieldName, "")
    return obj
}

/**
 * 构建 AlaPassword 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildPassword(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string): AlaPasswordSchema {
    const obj = alaBuild("AlaPassword", fieldName, label, rules, placeholder)
    return obj
}


/**
 * 构建 AlaNumber 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildNumber(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string): AlaNumberSchema {
    const obj = alaBuild("AlaNumber", fieldName, label, rules, placeholder)
    return obj
}


/**
 * 
 * 构建 AlaCheckbox 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param items checkbox选项，格式[{name:value},{name:value}]，例如 [{'红色':'red'},{'绿色':'green'},{'黄色':'yellow'}]
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildCheckbox(fieldName: string, label: string, items: Array<{ [key: string]: string }>, rules?: Array<baseRule>, placeholder?: string): AlaCheckboxSchema {
    u.checkBoolean(!items, `表单元素checkbox配置项items为空，表单字段名${fieldName}`)
    const item_s = items.map((item => {
        return convertToItem(item)
    }))
    const obj = alaBuildWithItems("AlaCheckbox", fieldName, label, item_s, rules, placeholder)
    return obj
}


/**
 * 
 * 构建 AlaRadio 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param items radio选项，格式[{name:value},{name:value}]，例如 [{'男':'man'},{'女':'men'},{'未知':'unknown'}]
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildRadio(fieldName: string, label: string, items: Array<{ [key: string]: string }>, rules?: Array<baseRule>, placeholder?: string): AlaRadioSchema {
    u.checkBoolean(!items, `表单元素radio配置项items为空，表单字段名${fieldName}`)
    const item_s = items.map((item => {
        return convertToItem(item)
    }))
    const obj = alaBuildWithItems("AlaRadio", fieldName, label, item_s, rules, placeholder)
    return obj
}


/**
 * 
 * 构建 AlaSelect 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param items select选项，格式[{name:value},{name:value}]，例如 [{'男':'man'},{'女':'men'},{'未知':'unknown'}]
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildSelect(fieldName: string, label: string, items: Array<{ [key: string]: string }>, rules?: Array<baseRule>, placeholder?: string): AlaRadioSchema {
    u.checkBoolean(!items, `表单元素select配置项items为空，表单字段名${fieldName}`)
    const item_s = items.map((item => {
        return convertToItem(item)
    }))
    const obj = alaBuildWithItems("AlaSelect", fieldName, label, item_s, rules, placeholder)
    return obj
}


/**
 * 
 * 构建 AlaSwitch 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @param activeText 激活状态文字
 * @param inActiveText 关闭状态文字
 * @returns 
 */
export function alaBuildSwitch(fieldName: string, label: string, activeText: string, inActiveText: string, rules?: Array<baseRule>, placeholder?: string): AlaSwitchSchema {
    const obj = alaBuildWithOther("AlaSwitch", fieldName, label, { activeText, inActiveText }, rules, placeholder)
    return obj
}


type dataTypee = "date" | "year" | "years" | "month" | "months" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange";

/**
 * 构建 AlaDate 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @param dateType 取值 "date" | "year" | "years" | "month" | "months" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange"
 * @param format 日期格式化表达式 YYYY-MM-DD HH:mm:ss
 * @param rules element-plus 中form表单验证规则
 * @param start 日期选择限定范围开始时间
 * @param end 日期选择限定范围结束时间
 * @returns 
 */
export function alaBuildDate(fieldName: string, label: string, dateType: dataTypee, format: string, rules?: Array<baseRule>, start?: string, end?: string, placeholder?: string): AlaDateSchema {
    const obj = alaBuildWithOther("AlaDate", fieldName, label, { dateType, format, start, end }, rules, placeholder)
    console.log('date:', obj);

    return obj
}

/**
 * 构建 AlaSlider 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param min 滑动范围最小值
 * @param max 滑动范围最大值
 * @param step 滑动步长
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符 
 * @returns 
 */
export function alaBuildSlider(fieldName: string, label: string, min: number, max: number, step: number, rules?: Array<baseRule>, placeholder?: string): AlaSliderSchema {
    const obj = alaBuildWithOther("AlaSlider", fieldName, label, { min, max, step }, rules, placeholder)
    return obj
}


/**
 * 构建 AlaRating 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param max 评分星号数量
 * @param rules element-plus 中form表单验证规则
 * @param allowHalf 是否允许半分评分
 * @param placeholder 占位符 
 * @returns 
 */
export function alaBuildRating(fieldName: string, label: string, max: number, rules?: Array<baseRule>, allowHalf?: boolean, placeholder?: string): AlaSliderSchema {
    const obj = alaBuildWithOther("AlaRating", fieldName, label, { max, allowHalf }, rules, placeholder)
    return obj
}







