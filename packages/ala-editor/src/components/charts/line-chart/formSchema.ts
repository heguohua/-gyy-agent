/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 15:32:55
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/line-chart/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { max } from "lodash";
import { configColor, configFontStyle, configFontWeight, configMainTitle, configNumber, configSubTitle, configTextAlign, configTextOverflow, configTextVerticalAlign, configTitle } from "@/config/configUtil";


const title_text = Type.String({
    code: "config-input",
    title: "标题",
    rules: [
        { name: 'max', length: 20, message: '最多20个字符' },
    ]
})

const title_link = Type.String({
    code: "config-textarea",
    title: "链接",
})


const title_subtext = Type.String({
    code: "config-input",
    title: "标题",
    rules: [
        { name: 'max', length: 50, message: '最多20个字符' },
    ]
})


const placeholder = Type.String({
    code: "config-input",
    title: "占位符",
    default: "",
})

const fieldName = Type.String({
    code: "config-input",
    title: "字段名",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'min', length: 3, message: '最少3个字符' },
        { name: 'max', length: 30, message: '最多30个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
        { name: 'pattern', pattern: 'LOrl', message: '只能包含大写字母、小写字母' },
    ]
})

const help = Type.String({
    code: "config-textarea",
    title: "提示信息",
    default: "",
})

const columnNum = Type.Number({
    code: "config-int",
    title: "占用列数",
    placeholder: "请输入占用列数",
    default: 1,
    // 绑定 element-plus 原始组件的其他属性
    other: {
        min: 1,
        controlsPosition: ''
    }
})



const columnWidth = Type.String({
    code: "config-int",
    title: "单列宽度",
    default: 16,
    other: {
        min: 0,
        max: 500,
        step: 10,
        controlsPosition: ''
    }
})


const showInSearch = Type.String({
    code: "config-boolean",
    title: "查询条件？",
    default: false,
})

const showInTable = Type.String({
    code: "config-boolean",
    title: "列表显示？",
    default: false,
})

const icon = Type.String({
    code: "config-input",
    title: "头部图标",
    default: "",
})

const iconWidth = Type.String({
    code: "config-int",
    title: "图标宽度",
    default: 16,
    other: {
        min: 1,
        max: 50,
        controlsPosition: ''
    }
})


const iconHeight = Type.String({
    code: "config-int",
    title: "图标高度",
    default: 16,
    other: {
        min: 1,
        max: 50,
        controlsPosition: ''
    }
})
const required = Type.String({
    code: "config-boolean",
    title: "必填字段？",
    default: false,
})
const detail = Type.String({
    code: "config-boolean",
    title: "详情列？",
    default: false,
})

const rules = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-form-rules",
        title: "字段校验规则",
        checkbox: [{
            name: '手机号',
            value: 'alaPhone',
        }, {
            name: '邮箱',
            value: 'alaEmail',
        }, {
            name: '身份证',
            value: 'alaCard',
        }, {
            name: 'URL',
            value: 'alaUrl',
        }, {
            name: '纯数字',
            value: 'alaNumber',
        }, {
            name: '大、小写字母',
            value: 'alaLetter',
        }, {
            name: '大、小写字母、数字',
            value: 'alaLOrlOr8',
        }, {
            name: '大、小写字母、数字、特殊字符',
            value: 'alaLOrlOr8Or_',
        }, {
            name: '简体中文',
            value: 'alaCn',
        }, {
            name: '繁体中文',
            value: 'alaTw',
        }, {
            name: '简体、繁体中文',
            value: 'alaCnTw',
        },],
    }
);

const strMin = Type.String({
    code: "config-int",
    title: "最小长度",
    other: {
        min: 0,
        max: 500,
        controlsPosition: 'right'
    }
})

const strMax = Type.String({
    code: "config-int",
    title: "最大长度",
    other: {
        min: 0,
        max: 500,
        controlsPosition: 'right'
    }
})



const cmt = configMainTitle()
const cst = configSubTitle()
const schema = Type.Object({
    // 主标题
    text_text_title: schemaAllViewport(configTitle("主标题配置区")),
    text_text: schemaAllViewport(title_text),

    // 通用 主标题 配置
    ...cmt,

    text_link: schemaAllViewport(title_link),

    // 副标题
    text_subtext_title: schemaAllViewport(configTitle("副标题配置区")),
    text_subtext: schemaAllViewport(title_subtext),
    // 通用 副标题 配置
    ...cst,
})


export type AlaLineChartSchema = Static<typeof schema>

export default schema


