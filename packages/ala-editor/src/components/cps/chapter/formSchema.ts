/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-19 15:28:16
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


const height = Type.Number({
    code: "config-input",
    title: "分隔线宽度",
    default: 2,
})

const lineStyle = Type.String({
    code: "config-select",
    title: "分隔线样式",
    default: [{
        name: '实线',
        value: 'solid',
    }, {
        name: '虚线',
        value: 'dashed',
    }, {
        name: '点线',
        value: 'dotted',
    }, {
        name: '双实线',
        value: 'double',
    }]
})

const help = Type.String({
    code: "config-textarea",
    title: "帮助提示信息",
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
const showInSearch = Type.String({
    code: "config-boolean",
    title: "查询条件？",
    default: false,
})

const showInTable = Type.String({
    code: "config-boolean",
    title: "列表显示？",
    default: false,
})

const schema = Type.Object({
    label: schemaAllViewport(label),
    height: schemaAllViewport(height),
    lineStyle: schemaAllViewport(lineStyle),
    help: schemaAllViewport(help),
    columnNum: schemaAllViewport(columnNum),
    showInSearch: schemaAllViewport(showInSearch),
    showInTable: schemaAllViewport(showInTable),
})


export type AlaFormChapterSchema = Static<typeof schema>

export default schema


