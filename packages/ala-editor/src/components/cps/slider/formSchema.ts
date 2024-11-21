/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 21:18:09
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
    default: "",
})

const position = Type.String({
    code: "config-input",
    title: "标签位置",
    default: "",
})

const placeholder = Type.String({
    code: "config-input",
    title: "占位符",
    default: "",
})

const fieldName = Type.String({
    code: "config-input",
    title: "字段名",
    default: "",
})

const min = Type.Number({
    code: "config-input",
    title: "最小值",
    default: "",
})
const max = Type.Number({
    code: "config-input",
    title: "最大值",
    default: "",
})
const step = Type.Number({
    code: "config-input",
    title: "滑动步长",
    default: "",
})

const range = Type.Boolean({
    code: "config-input",
    title: "选择范围",
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
    // style: schemaAllViewport(style),
})


export type AlaFormSwitchSchema = Static<typeof schema>

export default schema


