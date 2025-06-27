/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-27 19:00:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/cards/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { max } from "lodash";
import { configColor, configFontStyle, configFontWeight, configMainTitle, configInt, configSubTitle, configTextAlign, configTextOverflow, configTextVerticalAlign, configTitle, configItemStyle, configCollapseItem, configStyle, configBoolean, configText, configScaleOrdinalScale, configScaleLinearScale, configLine, configApis, configLineLabel } from "@/config/configUtil";


const icon = Type.String({
    code: "config-image",
    title: "图标",
    rules: [
        { name: 'max', length: 1000, message: '最多1000个字符' },
    ]
})

const mainTitleText = Type.String({
    code: "config-input",
    title: "标题",
    rules: [
        { name: 'max', length: 20, message: '最多20个字符' },
    ]
})

const mainTitleLink = Type.String({
    code: "config-textarea",
    title: "跳转地址",
})


const cs = configStyle('200px','100px')
const cmt = configMainTitle()
const apis = configApis()
const schema = Type.Object({

    // 主标题
    configStyle: schemaAllViewport(configCollapseItem("卡片样式")),
    ...cs,


    // 卡片图标
    configIconTitle: schemaAllViewport(configCollapseItem("卡片图标")),
    icon: schemaAllViewport(icon),

    // 卡片标题
    configMainTitle: schemaAllViewport(configCollapseItem("卡片标题")),
    mainTitleText: schemaAllViewport(mainTitleText),

    // 通用 卡片标题 配置
    ...cmt,
    mainTitleLink: schemaAllViewport(mainTitleLink),


    // 副标题
    // configSubTitle: schemaAllViewport(configCollapseItem("副标题配置区")),
    // text_subtext: schemaAllViewport(title_subtext),
    // 通用 副标题 配置
    // ...cst,

    // 数据请求API相关
    api: schemaAllViewport(configCollapseItem("数据API")),
    ...apis


})


export type AlaLineChartSchema = Static<typeof schema>

export default schema


