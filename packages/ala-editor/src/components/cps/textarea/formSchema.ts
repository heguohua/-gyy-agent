/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-12 22:05:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/textarea/formSchema.ts
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

const help = Type.String({
    code: "config-textarea",
    title: "帮助提示信息",
    default: "",
})

const icon = Type.String({
    code: "config-input",
    title: "图标",
    default: "",
})

const iconWidth = Type.String({
    code: "config-number",
    title: "图标宽度",
    default: "",
})

const iconHeight = Type.String({
    code: "config-number",
    title: "图标高度",
    default: "",
})



const schema = Type.Object({
    label: schemaAllViewport(label),
    position: schemaAllViewport(position),
    placeholder: schemaAllViewport(placeholder),
    fieldName: schemaAllViewport(fieldName),
    help: schemaAllViewport(help),
    icon: schemaAllViewport(icon),
    iconWidth: schemaAllViewport(iconWidth),
    iconHeight: schemaAllViewport(iconHeight),
    // style: schemaAllViewport(style),
})


export type AlaFormTextareaSchema = Static<typeof schema>

export default schema


