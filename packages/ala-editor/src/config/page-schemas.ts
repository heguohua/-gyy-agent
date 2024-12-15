/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-22 19:52:42
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-15 19:57:24
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
// { name: 'required', message: '不能为空' },
// { name: 'pattern', pattern: 'phone', message: '只能填写手机号' },
// { name: 'min', length: 3, message: '最少3个字符' },
// { name: 'max', length: 20, message: '最多20个字符' },
// { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
const title = Type.String({
    code: "config-input",
    title: "标题",
    placeholder: "请输入页面标题",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'max', length: 20, message: '最多20个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
    ]
})

const width = Type.Number({
    code: "config-input",
    title: "页面宽度",
    placeholder: "请输入页面宽度",
    default: 500
})

const labelWidth = Type.Number({
    code: "config-input",
    title: "标签宽度",
    placeholder: "请输入标签宽度",
})

const moduleName = Type.Number({
    code: "config-input",
    title: "模块名",
    placeholder: "请输入模块名",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'min', length: 3, message: '最少3个字符' },
        { name: 'max', length: 30, message: '最多30个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
        { name: 'pattern', pattern: 'LOrl', message: '只能包含大写字母、小写字母' },
    ]
})

const schema = Type.Object({
    background: schemaAllViewport(background),
    title: schemaAllViewport(title),
    width: schemaAllViewport(width),
    labelWidth: schemaAllViewport(labelWidth),
    moduleName: schemaAllViewport(moduleName),
})


export type AlaPageSchema = Static<typeof schema>

export default schema


