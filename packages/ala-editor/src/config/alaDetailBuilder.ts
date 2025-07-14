import { dType } from "@/components/cps/dynamic/detailType"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-26 09:38:46
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-14 08:28:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaDetailBuilder.ts
 * @Description: 
 *  { prop: formData.fieldName?.desktop, label: formData.label?.desktop, formItem: item }
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export function alaDetailBuild(componentName: string, columnName: string, label: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: componentName, formData: { fieldName: { desktop: columnName }, detail: { desktop: detail }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailInput(columnName: string, label: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.input, formData: { fieldName: { desktop: columnName }, detail: { desktop: detail }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailFile(columnName: string, label: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.file, formData: { fieldName: { desktop: columnName }, detail: { desktop: detail }, columnNum: { desktop: columnNum }, ...other } },
    }
}


export function alaDetailImage(columnName: string, label: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.image, formData: { fieldName: { desktop: columnName }, detail: { desktop: detail }, columnNum: { desktop: columnNum }, ...other } },
    }
}


export function alaDetailDeepBuild(columnName: string, innerColumnName: string, label: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.deep, formData: { fieldName: { desktop: columnName }, detail: { desktop: detail }, columnNum: { desktop: columnNum }, ...other, innerColumnName: { desktop: innerColumnName }, } },
    }
}


export function alaDetailSelectDict(columnName: string, label: string, propertyName: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.selectDict, formData: { fieldName: { desktop: columnName }, detail, itemProperty: { desktop: { propertyName: propertyName } }, columnNum: { desktop: columnNum }, ...other } },
    }
}


export function alaDetailRadio(columnName: string, label: string, items: Array<{ [key: string]: any }>, columnNum = 1, detail = false, other?: Object) {

    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.radio, formData: { fieldName: { desktop: columnName }, detail, items: { desktop: items }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailSelect(columnName: string, label: string, items: Array<{ [key: string]: any }>, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.select, formData: { fieldName: { desktop: columnName }, detail, items: { desktop: items }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailSelectTable(columnName: string, label: string, propertyName: string, columnNum = 1, detail = false, other?: Object, valueName = 'id') {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.selectTable, formData: { fieldName: { desktop: columnName }, detail, itemProperty: { desktop: { propertyName: propertyName, valueName: 'id' } }, columnNum: { desktop: columnNum }, params: { desktop: '{}' }, ...other } },
    }
}

export function alaDetailSelectTree(columnName: string, label: string, propertyName: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.selectTree, formData: { fieldName: { desktop: columnName }, detail, itemProperty: { desktop: { propertyName: propertyName } }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailSwitch(columnName: string, label: string, activeText: string, activeValue: any, inActiveText: string, inActiveValue: any, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.switch, formData: { fieldName: { desktop: columnName }, detail, activeText: { desktop: activeText }, activeValue: { desktop: activeValue }, inActiveText: { desktop: inActiveText }, inActiveValue: { desktop: inActiveValue }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailSwitchImage(columnName: string, label: string, items: Array<{ [key: string]: any }>, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.switchImage, formData: { fieldName: { desktop: columnName }, detail, items: { desktop: items }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailTextarea(columnName: string, label: string, pageMax = 10, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.textarea, formData: { fieldName: { desktop: columnName }, detail, pageMax: { desktop: pageMax }, columnNum: { desktop: columnNum }, ...other } },
    }
}


export function alaDetailDate(columnName: string, label: string, format = "YYYY-MM-DD", columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.date, formData: { fieldName: { desktop: columnName }, format: { desktop: format }, detail: { desktop: detail }, columnNum: { desktop: columnNum }, ...other } },
    }
}

export function alaDetailCascader(columnName: string, label: string, columnNum = 1, detail = false, other?: Object) {
    return {
        prop: columnName,
        label: label,
        formItem: { code: dType.cascader, formData: { fieldName: { desktop: columnName }, detail, columnNum: { desktop: columnNum }, ...other } },
    }
}
