/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-22 19:52:42
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-22 19:58:23
 * @FilePath: /low-coding/packages/ala-editor/src/config/page-schemas.ts
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

const keywords = Type.String({
    code: "config-input",
    title: "关键字",
    placeholder: "请输入页面关键字",
})

const description = Type.String({
    code: "config-input",
    title: "描述",
    placeholder: "请输入页面描述",
})

const schema = Type.Object({
    background: schemaAllViewport(background),
    title: schemaAllViewport(title),
    keywords: schemaAllViewport(keywords),
    description: schemaAllViewport(description),
})


export type AlaPageSchema = Static<typeof schema>

export default schema


