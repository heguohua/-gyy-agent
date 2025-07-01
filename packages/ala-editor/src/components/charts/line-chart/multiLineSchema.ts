/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-01 22:05:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/line-chart/multiLineSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { max } from "lodash";
import { configColor, configFontStyle, configFontWeight, configMainTitle, configInt, configSubTitle, configTextAlign, configTextOverflow, configTextVerticalAlign, configTitle, configItemStyle, configCollapseItem, configStyle, configBoolean, configText, configScaleOrdinalScale, configScaleLinearScale, configLine, configLines, configApis } from "@/config/configUtil";


const mainTitleText = Type.String({
    code: "config-input",
    title: "标题",
    rules: [
        { name: 'max', length: 50, message: '最多20个字符' },
    ]
})

const mainTitleLink = Type.String({
    code: "config-textarea",
    title: "跳转地址",
})



const attrs = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-key-value",
        title: "属性配置",
        default: [],
        required: true,
    }
);



const cs = configStyle()
const cmt = configMainTitle()
const cst = configSubTitle()
const cis = configItemStyle()
const xScale = configScaleOrdinalScale()
const yScale = configScaleLinearScale()
const lines = configLines()
const apis = configApis()
const schema = Type.Object({

    // 主标题
    configStyle: schemaAllViewport(configCollapseItem("图形样式")),
    ...cs,

    // 主标题
    configMainTitle: schemaAllViewport(configCollapseItem("图形标题")),
    mainTitleText: schemaAllViewport(mainTitleText),

    // 通用 主标题 配置
    ...cmt,
    mainTitleLink: schemaAllViewport(mainTitleLink),
    freeTitle: schemaAllViewport(configBoolean('外部标题？')),
    freeTitleIcon: schemaAllViewport(configText('外部标题图标', 'bar-chart.svg')),

    // X坐标轴
    xScale: schemaAllViewport(configCollapseItem("X坐标轴")),
    ...xScale,

    // Y坐标轴
    yScale: schemaAllViewport(configCollapseItem("Y坐标轴")),
    ...yScale,

    // 折线样式
    line: schemaAllViewport(configCollapseItem("折线")),
    attrs: schemaAllViewport(attrs),
    ...lines,

    // 数据请求API相关
    api: schemaAllViewport(configCollapseItem("数据API")),
    ...apis

    // 副标题
    // configSubTitle: schemaAllViewport(configCollapseItem("副标题配置区")),
    // text_subtext: schemaAllViewport(title_subtext),
    // 通用 副标题 配置
    // ...cst,




})


export type AlaLineChartSchema = Static<typeof schema>

export default schema


