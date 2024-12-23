/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-23 10:05:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-table/formSchema.ts
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
const width = Type.Number({
    code: "config-input",
    title: "宽度",
    default: "",
})


const url = Type.String({
    code: "config-input",
    title: "api链接",
    default: "/u/menu/list",
    required: true,
})

const propertyName = Type.String({
    code: "config-input",
    title: "属性名字段",
    default: "",
    required: true,
})

const valueName = Type.String({
    code: "config-input",
    title: "属性值字段",
    default: "",
    required: true,
})

const columns = Type.String({
    code: "config-object",
    title: "列字段",
    default: [],
    required: true,
})

const itemProperty = Type.String({
    code: "config-itemProperty",
    title: "属性映射字段",
    default: Object,
})

const params = Type.String({
    code: "config-object",
    title: "请求参数",
    default: "",
})

const isFormDesign = Type.Boolean({
    code: "config-boolean",
    title: "api请求测试",
    default: true,
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

const required = Type.String({
    code: "config-boolean",
    title: "必填字段？",
    default: false,
})

const schema = Type.Object({
    label: schemaAllViewport(label),
    placeholder: schemaAllViewport(placeholder),
    width: schemaAllViewport(width),
    url: schemaAllViewport(url),
    fieldName: schemaAllViewport(fieldName),
    columns: schemaAllViewport(columns),
    propertyName: schemaAllViewport(propertyName),
    valueName: schemaAllViewport(valueName),
    itemProperty: schemaAllViewport(itemProperty),
    params: schemaAllViewport(params),
    isFormDesign: schemaAllViewport(isFormDesign),
    help: schemaAllViewport(help),
    columnNum: schemaAllViewport(columnNum),
    showInSearch: schemaAllViewport(showInSearch),
    showInTable: schemaAllViewport(showInTable),
    required: schemaAllViewport(required),
})


export type AlaFormSelecTableSchema = Static<typeof schema>

export default schema


