/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-22 19:52:42
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-09 11:23:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/page-schemas.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";

const background = Type.Boolean({
    code: "config-color",
    title: "背景色",
    default: '',
})

const title = Type.String({
    code: "config-input",
    title: "标题",
    placeholder: "请输入页面标题",
})

const width = Type.Number({
    code: "config-input",
    title: "页面宽度",
    placeholder: "请输入页面宽度",
    default:500
})

const labelWidth = Type.Number({
    code: "config-input",
    title: "标签宽度",
    placeholder: "标签宽度",
})

const schema = Type.Object({
    background: schemaAllViewport(background),
    title: schemaAllViewport(title),
    width: schemaAllViewport(width),
    labelWidth: schemaAllViewport(labelWidth),
})


export type AlaPageSchema = Static<typeof schema>

export default schema


