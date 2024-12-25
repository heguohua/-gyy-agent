/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-25 19:30:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/textarea/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";

const label = Type.String({
    code: "config-input",
    title: "标签名",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'max', length: 20, message: '最多20个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
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

const pageMax = Type.String({
    code: "config-int",
    title: "截取长度",
    other: {
        min: 6,
        max: 500,
        controlsPosition: 'right'
    }
})


const required = Type.String({
    code: "config-boolean",
    title: "必填字段？",
    default: false,
})



const schema = Type.Object({
    label: schemaAllViewport(label),
    placeholder: schemaAllViewport(placeholder),
    fieldName: schemaAllViewport(fieldName),
    help: schemaAllViewport(help),
    icon: schemaAllViewport(icon),
    iconWidth: schemaAllViewport(iconWidth),
    iconHeight: schemaAllViewport(iconHeight),
    columnNum: schemaAllViewport(columnNum),
    showInSearch: schemaAllViewport(showInSearch),
    showInTable: schemaAllViewport(showInTable),
    required: schemaAllViewport(required),
    strMin: schemaAllViewport(strMin),
    strMax: schemaAllViewport(strMax),
    pageMax: schemaAllViewport(pageMax),
    // style: schemaAllViewport(style),
})


export type AlaFormTextareaSchema = Static<typeof schema>

export default schema


