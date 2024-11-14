/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-14 22:50:58
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 23:33:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaBuilders.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import AlaInputSchema from "@/components/cps/input/alaInputSchema"
import AlaNumberSchema from "@/components/cps/number/alaNumberSchema"


/**
 * 将 {"男":'man'} 格式对象转换成 { name: "男", value: "man" } 格式
 */
type Item = { name: string; value: string };
function convertToItem(input: string): Item {
    // 将输入字符串按照冒号分割为两部分
    const parts = input.split(':');
    // 将分割后的字符串数组转换为 NameValueMap 格式的对象
    return {
        name: parts[0].trim(),
        value: parts[1].trim().replace(/'/g, '') // 移除单引号
    };
}

export function alaBuild(componentName: string, fieldName: string, label: string, placeholder?: string) {
    return {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : `请输入${label}`,
        fieldName: fieldName
    }
}

export function alaBuildWithItems(componentName: string, fieldName: string, label: string, items: Array<Item>, placeholder?: string) {
    const obj = {
        componentName: componentName,
        label: label,
        placeholder: placeholder ? placeholder : `请输入${label}`,
        fieldName: fieldName,
        other: {
            items
        },
    }
    return obj
}

/**
 * 构建 AlaInput 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildInput(fieldName: string, label: string, placeholder?: string): AlaInputSchema {
    const obj = alaBuild("AlaInput", fieldName, label, placeholder)
    return obj
}


/**
 * 构建 AlaNumber 组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildNumber(fieldName: string, label: string, placeholder?: string): AlaNumberSchema {
    const obj = alaBuild("AlaNumber", fieldName, label, placeholder)
    return obj
}


/**
 * 构建 AlaCheckbox组件
 * @param fieldName 属性名
 * @param label 字段名字
 * @param placeholder 占位符
 * @returns 
 */
export function alaBuildCheckbox(fieldName: string, label: string, items: Array<{ string: string }>, placeholder?: string): AlaNumberSchema {
    const obj = alaBuildWithItems("AlaNumber", fieldName, label, convertToItem(items), placeholder)
    return obj
}







