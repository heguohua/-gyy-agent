/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-19 13:09:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/column/schema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";

const background = Type.Boolean({
    code: "config-color",
    title: "背景颜色",
    default: '#fff',
})

const cols = Type.Array(Type.Number(), {
    code: "config-column",
    title: "列数",
    default: 0.5,
    minItems: 2,
    maxItems: 6
})

const schema = Type.Object({
    // background: schemaAllViewport(background),
    cols: schemaAllViewport(cols),
})

export type AlaConfigColumnSchema = Static<typeof schema>

export default schema


