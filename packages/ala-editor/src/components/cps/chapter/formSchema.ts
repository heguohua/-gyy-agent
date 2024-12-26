/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-19 19:39:07
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/chapter/formSchema.ts
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

const columnWidth = Type.String({
    code: "config-int",
    title: "单列宽度",
    default: 16,
    other: {
        min: 0,
        max: 500,
        step: 10,
        controlsPosition: ''
    }
})



const schema = Type.Object({
    label: schemaAllViewport(label),
    help: schemaAllViewport(help),
    columnNum: schemaAllViewport(columnNum),
    columnWidth: schemaAllViewport(columnWidth),
})


export type AlaFormChapterSchema = Static<typeof schema>

export default schema


