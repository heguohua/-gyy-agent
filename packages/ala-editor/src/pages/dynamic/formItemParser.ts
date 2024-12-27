import { alaBuildChapter, alaBuildCheckbox, alaBuildDate, alaBuildDateRange, alaBuildDivider, alaBuildInput, alaBuildNumber, alaBuildRadio, alaBuildRating, alaBuildSelect, alaBuildSelectDict, alaBuildSelectTable, alaBuildSlider, alaBuildSwitch, alaBuildTextarea } from "@/config/alaBuilders";
import baseRule from "@/config/rules/baseRule";
import { logger } from "@/utils/logger";

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-17 21:06:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-27 13:36:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/formItemParser.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */



export function parseInput(item: { fieldName: { desktop: string }, label: { desktop: string }, required: { desktop: boolean }, strMin: { desktop: number }, strMax: { desktop: number }, numberMin: { desktop: number }, numberMax: { desktop: number }, rules: { desktop: string } }) {

    const result = alaBuildInput(item.fieldName.desktop, item.label.desktop)
    logger.info(`解析【 input 】字段：`, result);
    return result
}

export function parseNumber(item: { fieldName: { desktop: string }, label: { desktop: string } }) {
    const result = alaBuildNumber(item.fieldName.desktop, item.label.desktop)
    logger.info(`解析【 number 】字段：`, result);
    return result
}

export function parseTextarea(item: { fieldName: { desktop: string }, label: { desktop: string } }) {
    const result = alaBuildTextarea(item.fieldName.desktop, item.label.desktop)
    logger.info(`解析【 textarea 】字段：`, result);
    return result
}

export function parseRadio(item: { fieldName: { desktop: string }, label: { desktop: string }, items: { desktop: [] } }) {
    // alaBuildRadio('gender', "性别", [{ '男': 'man' }, { '女': 'men' }, { '未知': 'unknown' }], [alaRequired()])
    const item_s: any = []
    const items = item.items.desktop
    items.forEach(((it: { name: string, value: any }) => {
        item_s.push({ [it.name]: it.value })
    }))
    const result = alaBuildRadio(item.fieldName.desktop, item.label.desktop, item_s)
    logger.info(`解析【 radio 】字段：`, result);
    return result
}

export function parseCheckbox(item: { fieldName: { desktop: string }, label: { desktop: string }, items: { desktop: [] } }) {
    // alaBuildCheckbox('color', "偏好色系", [{ '红色': 'red' }, { '绿色': 'green' }, { '黄色': 'yellow' }], [alaRequired()]),
    const item_s: any = []
    const items = item.items.desktop
    items.forEach(((it: { name: string, value: any }) => {
        item_s.push({ [it.name]: it.value })
    }))
    const result = alaBuildCheckbox(item.fieldName.desktop, item.label.desktop, item_s)
    logger.info(`解析【 checkbox 】字段：`, result);
    return result
}

type dataTypee = "date" | "year" | "years" | "month" | "months" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange";

export function parseDate(item: { fieldName: { desktop: string }, label: { desktop: string }, dateType: { desktop: dataTypee }, format: { desktop: string } }) {
    // alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
    const result = alaBuildDate(item.fieldName.desktop, item.label.desktop, item.dateType.desktop, item.format.desktop)
    logger.info(`解析【 date 】字段：`, result);
    return result
}



export function parseSelect(item: { fieldName: { desktop: string }, label: { desktop: string }, items: { desktop: [] } }) {
    // alaBuildSelect('channel', "购票渠道", [{ '拼多多': 'pin' }, { '美团': 'mei' }, { '淘票票': 'yellow' }], [alaRequired()]),
    const item_s: any = []
    const items = item.items.desktop
    items.forEach(((it: { name: string, value: any }) => {
        item_s.push({ [it.name]: it.value })
    }))
    const result = alaBuildSelect(item.fieldName.desktop, item.label.desktop, item_s)
    logger.info(`解析【 select 】字段：`, result);
    return result
}

export function parseSlider(item: { fieldName: { desktop: string }, label: { desktop: string }, max: { desktop: number }, min: { desktop: number }, range: { desktop: boolean }, step: { desktop: number } }) {
    //  alaBuildSlider('weight', "大概体重", 40, 200, 5, [alaRequired()]),
    const result = alaBuildSlider(item.fieldName.desktop, item.label.desktop, item.min.desktop, item.max.desktop, item.step.desktop,)
    logger.info(`解析【 slider 】字段：`, result);
    return result
}

export function parseRating(item: { fieldName: { desktop: string }, label: { desktop: string }, max: { desktop: number }, allowHalf: { desktop: boolean } }) {
    const result = alaBuildRating(item.fieldName.desktop, item.label.desktop, item.max.desktop, [], item.allowHalf.desktop)
    logger.info(`解析【 rating 】字段：`, result);
    return result
}

export function parseDivider(item: { label: { desktop: string }, position: { desktop: string }, height: { desktop: number } }) {
    const result = alaBuildDivider(item.label.desktop, item.position.desktop, item.height.desktop)
    logger.info(`解析【 divider 】字段：`, result);
    return result
}

export function parseChapter(item: { label: { desktop: string }, help?: { desktop: string } }) {
    const result = alaBuildChapter(item.label.desktop, item.help?.desktop)
    logger.info(`解析【 divider 】字段：`, result);
    return result
}



type switchValueType = Boolean | String | Number
export function parseSwitch(item: { fieldName: { desktop: string }, label: { desktop: string }, activeText: { desktop: string }, inActiveText: { desktop: string }, activeValue: { desktop: switchValueType }, inActiveValue: { desktop: switchValueType } }) {
    //  alaBuildSwitch('status', "账号状态", '正常', '禁用', [alaRequired()]),
    const result = alaBuildSwitch(item.fieldName.desktop, item.label.desktop, item.activeText.desktop, item.inActiveText.desktop, item.activeValue.desktop, item.inActiveValue.desktop)
    logger.info(`解析【 checkbox 】字段：`, result);
    return result
}


// alaBuildSelectApi("select_api", "api下拉选", "/u/menu/list", { propertyName: 'name', valueName: 'id' }, undefined, { value: '1' }, "请选择"),
//     alaBuildSelectDict("select_dict", "字典下拉选", {}, { propertyName: 'dictLabel', valueName: 'id' }, undefined, "请选择"),
//     alaBuildSelectTable("select_table", "table下拉选", "/u/menu/page", [{ prop: 'name', label: t('module.menu.name'), isQuery: true }, { prop: 'delFlag', label: t('common.enable') }], { propertyName: 'name', valueName: 'id' }, undefined, { value: '1' }, "请选择"),
//     alaBuildSelectTree("select_tree", "tree下拉选", "/a/dict/tree", { dictValue: 'i18n' }, { propertyName: 'dictLabel', valueName: 'id', childrenName: 'children' }, undefined, "请选择"),

export function parseSelectTable(item: { fieldName: { desktop: string }, label: { desktop: string }, url: { desktop: string }, columns: { desktop: any }, itemProperty: { desktop: any } }) {
    //  alaBuildSelectTable("select_table", "table下拉选", "/u/menu/page", [{ prop: 'name', label: t('module.menu.name'), isQuery: true }, { prop: 'delFlag', label: t('common.enable') }], { propertyName: 'name', valueName: 'id' }, undefined, { value: '1' }, "请选择"),
    // const result={}
    const result = alaBuildSelectTable(item.fieldName.desktop, item.label.desktop, item.url.desktop, item.columns.desktop, item.itemProperty.desktop, undefined, { value: '1' })
    logger.info(`解析【 selectTable 】字段：`, result);
    return result
}


export function parseDateRange(item: { startFieldName: { desktop: string }, endFieldName: { desktop: string }, label: { desktop: string }, dateType: { desktop: dataTypee }, format: { desktop: string } }) {
    // alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
    const result = alaBuildDateRange(item.startFieldName.desktop + '_' + item.endFieldName.desktop, item.label.desktop, item.dateType.desktop, item.format.desktop)
    logger.info(`解析【 dateRange 】字段：`, result);
    return result
}




export function parseSelectDict(item: { fieldName: { desktop: string }, label: { desktop: string }, url: { desktop: string }, columns: { desktop: any }, itemProperty: { desktop: any } }) {
    //  alaBuildSelectTable("select_table", "table下拉选", "/u/menu/page", [{ prop: 'name', label: t('module.menu.name'), isQuery: true }, { prop: 'delFlag', label: t('common.enable') }], { propertyName: 'name', valueName: 'id' }, undefined, { value: '1' }, "请选择"),
    // const result={}
    const result = alaBuildSelectDict(item.fieldName.desktop, item.label.desktop, { value: '1' }, item.itemProperty.desktop)
    logger.info(`解析【 selectDict 】字段：`, result);
    return result
}



