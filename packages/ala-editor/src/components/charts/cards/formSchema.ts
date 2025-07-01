/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-01 16:37:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/cards/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { max } from "lodash";
import { configColor, configFontStyle, configFontWeight, configMainTitle, configInt, configSubTitle, configTextAlign, configTextOverflow, configTextVerticalAlign, configTitle, configItemStyle, configCollapseItem, configStyle, configBoolean, configText, configScaleOrdinalScale, configScaleLinearScale, configLine, configApis, configLineLabel, configValue as configValueNumber } from "@/config/configUtil";




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

export const configPosition = (title: string) => {

    const config = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            options: [{
                name: '左侧',
                value: 'left',
            }, {
                name: '右侧',
                value: 'right',
            }, {
                name: '上方',
                value: 'top',
            }],
            default: 'left',
        }
    );


    return config
}

const cs = configStyle('200px', '100px')
const {text_color,text_fontSize,text_fontWeight,text_top,text_left} = configMainTitle()
const cvn = configValueNumber()
const apis = configApis()
const schema = Type.Object({

    // 主标题
    configStyle: schemaAllViewport(configCollapseItem("卡片样式")),
    ...cs,


    // 卡片图标
    configIconTitle: schemaAllViewport(configCollapseItem("卡片图标")),
    icon: schemaAllViewport(configText("卡片图标", 'process.svg', [{ name: 'max', length: 100, message: '最多200个字符' }, { name: 'min', length: 1, message: '最少1个字符' }])),
    icon_width: schemaAllViewport(configInt("图标宽度", 30, 10)),
    icon_height: schemaAllViewport(configInt("图标高度", 30, 10)),
    icon_background: schemaAllViewport(configColor("图标背景色", 'rgb(236, 245, 255)')),
    icon_background_radius: schemaAllViewport(configInt("图标圆角(%)", 10, 0)),
    icon_position: schemaAllViewport(configPosition("图标位置")),

    // 卡片标题
    configMainTitle: schemaAllViewport(configCollapseItem("卡片标题")),
    mainTitleText: schemaAllViewport(mainTitleText),

    // 通用 卡片标题 配置
    text_color,
    text_fontSize,
    text_fontWeight,
    text_top,
    text_left,
    mainTitleLink: schemaAllViewport(mainTitleLink),
    // 卡片值
    configValueTitle: schemaAllViewport(configCollapseItem("卡片值")),
    yName: schemaAllViewport(configText("值字段名", 'num', [{ name: 'max', length: 200, message: '最多200个字符' }, { name: 'min', length: 1, message: '最少1个字符' },])),
    unit: schemaAllViewport(configText("数值单位")),
    decimalNum: schemaAllViewport(configInt("小数位数", 0, 0)),
    thousandsSeparator: schemaAllViewport(configBoolean("千位分隔符？", false)),
    ...cvn,



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


