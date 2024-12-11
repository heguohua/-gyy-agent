/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-11 22:06:43
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/select-dict/formSchema.ts
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

const width = Type.Number({
    code: "config-input",
    title: "宽度",
    default: "",
})

const propertyName = Type.String({
    code: "config-input",
    title: "属性名字段",
    default: "",
})

const valueName = Type.String({
    code: "config-input",
    title: "属性值字段",
    default: "",
})

const itemProperty = Type.String({
    code: "config-itemProperty",
    title: "属性映射字段",
    default: "",
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
    title: "帮助提示信息",
    default: "",
})
const schema = Type.Object({
    label: schemaAllViewport(label),
    position: schemaAllViewport(position),
    placeholder: schemaAllViewport(placeholder),
    width: schemaAllViewport(width),
    fieldName: schemaAllViewport(fieldName),
    propertyName: schemaAllViewport(propertyName),
    valueName: schemaAllViewport(valueName),
    itemProperty: schemaAllViewport(itemProperty),
    params: schemaAllViewport(params),
    isFormDesign: schemaAllViewport(isFormDesign),
    help: schemaAllViewport(help),
})


export type AlaFormSelectDictSchema = Static<typeof schema>

export default schema


