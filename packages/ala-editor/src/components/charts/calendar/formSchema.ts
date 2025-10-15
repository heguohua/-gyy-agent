/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-15 22:06:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/calendar/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { configApis, configBoolean, configCollapseItem, configInt, configMainTitle, configStyle } from "@/config/configUtil";

const cs = configStyle()
const cmt = configMainTitle()

const mainTitleText = Type.String({
    code: "config-input",
    title: "日历标题",
    rules: [
        { name: 'max', length: 20, message: '最多20个字符' },
    ]
})

const className = Type.String({
    code: "config-input",
    title: "模块名",
    rules: [
        { name: 'max', length: 100, message: '最多100个字符' },
    ],
    required: true,
})

const url = Type.String({
    code: "config-input",
    title: "数据API",
    rules: [
        { name: 'max', length: 100, message: '最多100个字符' },
    ]
})

const dateName = Type.String({
    code: "config-input",
    title: "日期字段名",
    rules: [
        { name: 'max', length: 100, message: '最多100个字符' },
    ]
})

const valueName = Type.String({
    code: "config-input",
    title: "值字段名",
    rules: [
        { name: 'max', length: 100, message: '最多100个字符' },
    ]
})

const colorName = Type.String({
    code: "config-input",
    title: "着色字段名",
    rules: [
        { name: 'max', length: 100, message: '最多100个字符' },
    ]
})

const apis = configApis()

const schema = Type.Object({


    // 日历样式 
    configStyle: schemaAllViewport(configCollapseItem("日历样式")),
    ...cs,
    showMonth: schemaAllViewport(configBoolean("显示月历视图")),

    // 日历标题
    configMainTitle: schemaAllViewport(configCollapseItem("日历标题")),
    mainTitleText: schemaAllViewport(mainTitleText),


    // 数据请求API相关
    configApi: schemaAllViewport(configCollapseItem("数据API")),
    className: schemaAllViewport(className),
    url: schemaAllViewport(url),
    dateName: schemaAllViewport(dateName),
    valueName: schemaAllViewport(valueName),
    colorName: schemaAllViewport(colorName),
    data_time: schemaAllViewport(configInt('数据刷新间隔', 30000, 1000)),
    data_request_enabled: schemaAllViewport(configBoolean('开启API请求？')),


})


export type AlaCalendarSchema = Static<typeof schema>

export default schema


