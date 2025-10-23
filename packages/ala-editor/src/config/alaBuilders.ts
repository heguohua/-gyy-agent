/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 22:50:58
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-15 09:09:19
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
import AlaSelectApiSchema from "@/components/cps/select-api/alaSelectApiSchema";
import AlaSelectTableSchema from "@/components/cps/select-table/alaSelectTableSchema";
import AlaSelectDictSchema from "@/components/cps/select-dict/alaSelectDictSchema";
import AlaSelectTreeSchema from "@/components/cps/select-tree/alaSelectTredSchema";


/**
 * 将 {"男":'man'} 格式对象转换成 { name: "男", value: "man" } 格式
 */
type Item = { name: string; value: string | number };
export function convertToItem(config: { [key: string]: string | number }): Item {

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

export function alaBuild(componentName: string, fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }) {
    const params: any = {
        componentName: componentName,
        label: label,
        // placeholder: placeholder ? placeholder : (window as any).ai18n.global.t('form.p-tip') + `${label}`,
        placeholder: placeholder ? placeholder : '',
        fieldName: fieldName,
        rules,
        other
    }

    // 手动编写的表单直接复用动态表单 columnNum 逻辑
    if (other?.columnNum) {
        params['columnNum'] = other.columnNum
    }

    return params
}

export function alaBuildWithItems(componentName: string, fieldName: string, label: string, items: Array<Item>, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }) {
    const obj = {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : '',
        fieldName: fieldName,
        other: {
            items,
            ...other
        },
        rules
    }
    return obj
}

export function alaBuildWithOther(componentName: string, fieldName: string, label: string, other: { [key: string]: any }, rules?: Array<baseRule>, placeholder?: string) {
    const obj: any = {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : '',
        fieldName: fieldName,
        other,
        rules
    }

    if (other?.columnNum) {
        obj['columnNum'] = other.columnNum
    }

    return obj
}

export function alaBuildNoneFormItem(componentName: string, label?: string, other?: { [key: string]: any }) {
    const obj: any = {
        componentName: componentName,
        label: label,
        other,
    }

    if (other?.columnNum) {
        obj['columnNum'] = other.columnNum
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
export function alaBuildInput(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaInputSchema {
    const obj = alaBuild("AlaInput", fieldName, label, rules, placeholder, other)
    return obj
}
export function alaBuildTextarea(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaInputSchema {
    const obj = alaBuild("AlaTextarea", fieldName, label, rules, placeholder, other)
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
export function alaBuildNumber(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaNumberSchema {
    const obj = alaBuild("AlaNumber", fieldName, label, rules, placeholder, other)
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
    u.checkTrue(!items, `表单元素checkbox配置项items为空，表单字段名${fieldName}`, () => { })
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
export function alaBuildRadio(fieldName: string, label: string, items: Array<{ [key: string]: any }>, rules?: Array<baseRule>, placeholder?: string): AlaRadioSchema {
    u.checkTrue(!items, `表单元素radio配置项items为空，表单字段名${fieldName}`, () => { })
    const item_s = items.map((item => {
        return convertToItem(item)
    }))
    const obj = alaBuildWithItems("AlaRadio", fieldName, label, item_s, rules, placeholder)
    return obj
}


export function alaBuildChildTableCount(fieldName: string, label: string, colors: Array<{ [key: string]: any }>, backgroundNum: string, moduleName: string, params: string): AlaRadioSchema {
    const obj = alaBuildWithOther("AlaChildTableCount", fieldName, label, { colors, backgroundNum, moduleName, params })
    return obj
}


export function alaBuildAi(fieldName: string, label: string, showImageIcon: boolean, showFileIcon: boolean, showListenIcon: boolean, onlineSearch: boolean, deepThink: boolean, placeholder: string): AlaRadioSchema {
    const obj = alaBuildWithOther("AlaAi", fieldName, label, { showImageIcon, showFileIcon, onlineSearch, deepThink, showListenIcon, placeholder })
    return obj
}


/**
 * 
 * 构建 AlaFile 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param items radio选项，格式[{name:value},{name:value}]，例如 [{'男':'man'},{'女':'men'},{'未知':'unknown'}]
 * @param rules element-plus 中form表单验证规则
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildFile(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaRadioSchema {
    const obj = alaBuild("AlaFile", fieldName, label, rules, placeholder, other)
    return obj
}
export function alaBuildImage(fieldName: string, label: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaRadioSchema {
    const obj = alaBuild("AlaImage", fieldName, label, rules, placeholder, other)
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
export function alaBuildSelect(fieldName: string, label: string, items: Array<{ [key: string]: string | number }>, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaRadioSchema {
    u.checkTrue(!items, `表单元素select配置项items为空，表单字段名${fieldName}`, () => { })
    const item_s = items.map((item => {
        return convertToItem(item)
    }))
    const obj = alaBuildWithItems("AlaSelect", fieldName, label, item_s, rules, placeholder, other)
    return obj
}

export function alaBuildRelationSubForm(fieldName: string, label: string, other?: { [key: string]: any }): AlaRadioSchema {
    const obj = alaBuildWithOther("AlaRelationSubForm", fieldName, label, { ...other })
    return obj
}


/**
 * 
 * 构建 AlaSelectApi 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param url api加载数据 url
 * @param itemProperty api数据解析映射字段 { propertyName:'name',valueName:'value',}
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildSelectApi(fieldName: string, label: string, url: string, itemProperty: { [key: string]: string }, rules?: Array<baseRule>, params?: { [key: string]: string }, placeholder?: string, other?: { [key: string]: any }): AlaSelectApiSchema {

    u.checkTrue(!url, `表单元素 select-api 配置项 url 为空，表单字段名${fieldName}`, () => { })
    u.checkTrue(!itemProperty, `表单元素 select-api 配置项 itemProperty 为空，表单字段名${fieldName}`, () => { })
    const obj = alaBuildWithOther("AlaSelectApi", fieldName, label, { url, itemProperty, params, ...other }, rules, placeholder)

    return obj
}

/**
 * 
 * 构建 AlaSelectApi 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param params 查询参数 { propertyName:'name',valueName:'value',}
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildSelectDict(fieldName: string, label: string, params: { [key: string]: string }, itemProperty: { [key: string]: string }, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaSelectDictSchema {
    const obj = alaBuildWithOther("AlaSelectDict", fieldName, label, { params, itemProperty, isFormDesign: false, ...other }, rules, placeholder)
    return obj
}
/**
 * 
 * 构建 AlaCascader 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param params 查询参数 { propertyName:'name',valueName:'value',}
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildCascader(fieldName: string, label: string, items: string, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaSelectDictSchema {
    const obj = alaBuildWithOther("AlaCascader", fieldName, label, { items, isFormDesign: false, ...other }, rules, placeholder)
    return obj
}

/**
 * 
 * 构建 AlaSelectTree 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param params 查询参数 { propertyName:'name',valueName:'value',}
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildSelectTree(fieldName: string, label: string, url: string, params: { [key: string]: any }, itemProperty: { [key: string]: string }, rules?: Array<baseRule>, placeholder?: string, other?: { [key: string]: any }): AlaSelectTreeSchema {
    const obj = alaBuildWithOther("AlaSelectTree", fieldName, label, { url, params, itemProperty, ...other }, rules, placeholder)
    return obj
}
export function alaBuildFormTable(fieldName: string, label: string, moduleName: string): AlaSelectTreeSchema {
    const obj = alaBuildWithOther("AlaFormTable", fieldName, label, { moduleName })
    return obj
}

/**
 * 
 * 构建 AlaSelectApi 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param url 数据请求url
 * @param params 查询参数 { propertyName:'name',valueName:'value',}
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildSelectTable(fieldName: string, label: string, url: string, columns: any, itemProperty: { [key: string]: any }, rules?: Array<baseRule>, params?: { [key: string]: string }, placeholder?: string, icon?: string, iconWidth?: number, iconHeight?: number, canEmpty = false, singleValue = false, valueToString = false, other = {}): AlaSelectTableSchema {

    u.checkTrue(!url, `表单元素 select-table 配置项 url 为空，表单字段名${fieldName}`, () => { })
    // u.checkBoolean(!params, `表单元素 select-table 配置项 params 为空，表单字段名${fieldName}`, () => { })
    u.checkTrue(!columns, `表单元素 select-table 配置项 columns 为空，表单字段名${fieldName}`, () => { })

    params = params ? params : {}

    const obj = alaBuildWithOther("AlaSelectTable", fieldName, label, { url, params, columns: Array.isArray(columns) ? u.tojson(columns) : columns, itemProperty, isFormDesign: false, icon, canEmpty, iconWidth, iconHeight, singleValue, valueToString, ...other }, rules, placeholder)
    return obj
}

/**
 * 
 * 构建 AlaDivider 组件
 * @param label 组件名字
 * @param position 取值 left 、 right 、 center
 * @returns 
 */
export function alaBuildDivider(label?: string, position = 'center', height?: number): any {
    const obj = alaBuildNoneFormItem("AlaDivider", label, { position, fullWidth: true, height })
    return obj
}

/**
 * 
 * 构建 AlaChapter 组件
 * @param label 组件名字
 * @returns 
 */
export function alaBuildChapter(label: string, help?: string, other?: { [key: string]: any }): any {
    if (!other) {
        other = {}
    }
    u.merged(other, { help })
    const obj = alaBuildNoneFormItem("AlaChapter", label, other)
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
type switchValueType = Boolean | String | Number
export function alaBuildSwitch(fieldName: string, label: string, activeText: string, inActiveText: string, activeValue?: switchValueType, inActiveValue?: switchValueType, rules?: Array<baseRule>, placeholder?: string): AlaSwitchSchema {
    const obj = alaBuildWithOther("AlaSwitch", fieldName, label, { activeText, inActiveText, activeValue, inActiveValue }, rules, placeholder)
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
export function alaBuildDate(fieldName: string, label: string, dateType: dataTypee, format: string, rules?: Array<baseRule>, start?: string, end?: string, placeholder?: string, daysBefore?: number, daysAfter?: number): AlaDateSchema {
    const obj = alaBuildWithOther("AlaDate", fieldName, label, { dateType, format, start, end, daysBefore, daysAfter }, rules, placeholder)
    return obj
}

export function alaBuildDateRange(fieldName: string, label: string, dateType: dataTypee, format: string, rules?: Array<baseRule>, start?: string, end?: string, placeholder?: string): AlaDateSchema {
    const obj = alaBuildWithOther("AlaDateRange", fieldName, label, { dateType, format, start, end }, rules, placeholder)
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







