/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-14 21:38:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/slider/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";

const label = Type.String({
    code: "config-input",
    title: "标签",
    required: true,
})

const position = Type.String({
    code: "config-select",
    title: "标签位置",
    default: [{
        name: '左侧',
        value: 'left',
    }, {
        name: '右侧',
        value: 'right',
    }, {
        name: '顶部',
        value: 'top',
    }]
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
})
const min = Type.Number({
    code: "config-number",
    title: "最小值",
    default: 0,
    required: true,
})
const max = Type.Number({
    code: "config-number",
    title: "最大值",
    default: 100,
    required: true,
})
const step = Type.Number({
    code: "config-number",
    title: "滑动步长",
    default: 1,
    required: true,
})

const range = Type.Boolean({
    code: "config-boolean",
    title: "选择范围",
    default: "",
})
const help = Type.String({
    code: "config-textarea",
    title: "帮助提示信息",
    default: "",
})
const schema = Type.Object({
    label: schemaAllViewport(label),
    position: schemaAllViewport(position),
    placeholder: schemaAllViewport(placeholder),
    min: schemaAllViewport(min),
    max: schemaAllViewport(max),
    step: schemaAllViewport(step),
    range: schemaAllViewport(range),
    fieldName: schemaAllViewport(fieldName),
    help: schemaAllViewport(help),
    // style: schemaAllViewport(style),
})


export type AlaFormSwitchSchema = Static<typeof schema>

export default schema


