/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-26 09:38:46
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-29 21:07:58
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaDetailBuilder.ts
 * @Description: 
 *  { prop: formData.fieldName?.desktop, label: formData.label?.desktop, formItem: item }
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export function alaDetailBuild(componentName: string, columnName: string, label: string, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: componentName, formData: { detail, ...other } },
    }
}


export function alaDetailSelectDict(componentName: string, columnName: string, label: string, propertyName: string, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: componentName, formData: { detail, itemProperty: { desktop: { propertyName: propertyName } }, ...other } },
    }
}

export function alaDetailSwitch(componentName: string, columnName: string, label: string, activeText: string, activeValue: any, inActiveText: string, inActiveValue: any, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: componentName, formData: { detail, activeText: { desktop: activeText }, activeValue: { desktop: activeValue }, inActiveText: { desktop: inActiveText }, inActiveValue: { desktop: inActiveValue }, ...other } },
    }
}

export function alaDetailTextarea(componentName: string, columnName: string, label: string, pageMax = 10, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: componentName, formData: { detail, pageMax: { desktop: pageMax }, ...other } },
    }
}


