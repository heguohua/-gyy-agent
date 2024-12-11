/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-11 22:09:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/switch/formSchema.ts
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

const activeText = Type.String({
    code: "config-input",
    title: "激活文字",
    default: "",
})
const activeValue = Type.String({
    code: "config-input",
    title: "激活值",
    default: "",
})
const inActiveText = Type.String({
    code: "config-input",
    title: "关闭文字",
    default: "",
})

const inActiveValue = Type.String({
    code: "config-input",
    title: "关闭值",
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
    activeText: schemaAllViewport(activeText),
    activeValue: schemaAllViewport(activeValue),
    inActiveText: schemaAllViewport(inActiveText),
    inActiveValue: schemaAllViewport(inActiveValue),
    fieldName: schemaAllViewport(fieldName),
    help: schemaAllViewport(help),
    // style: schemaAllViewport(style),
})


export type AlaFormSwitchSchema = Static<typeof schema>

export default schema


