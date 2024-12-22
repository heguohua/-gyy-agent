/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-19 15:30:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/number/formSchema.ts
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
    title: "前置图标",
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
    // style: schemaAllViewport(style),
})


export type AlaFormInputSchema = Static<typeof schema>

export default schema


