/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-29 20:36:04
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/ai/formSchema.ts
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



const placeholder = Type.String({
    code: "config-input",
    title: "占位符",
    default: "",
})

const fieldName = Type.String({
    code: "config-input",
    title: "字段名",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'min', length: 3, message: '最少3个字符' },
        { name: 'max', length: 30, message: '最多30个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
        { name: 'pattern', pattern: 'LOrl', message: '只能包含大写字母、小写字母' },
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
    default: 200,
    other: {
        min: 10,
        max: 500,
        step: 10,
        controlsPosition: ''
    }
})

const strMax = Type.String({
    code: "config-int",
    title: "最大长度",
    other: {
        min: 0,
        max: 500,
        controlsPosition: 'right'
    }
})

const onlineSearch = Type.String({
    code: "config-boolean",
    title: "联网查询？",
    default: false,
})

const showImageIcon = Type.String({
    code: "config-boolean",
    title: "上传图片？",
    default: false,
})

const showFileIcon = Type.String({
    code: "config-boolean",
    title: "上传文件？",
    default: false,
})

const deepThink = Type.String({
    code: "config-boolean",
    title: "深度思考？",
    default: false,
})

const showListenIcon = Type.String({
    code: "config-boolean",
    title: "允许听写？",
    default: false,
})

const schema = Type.Object({
    label: schemaAllViewport(label),
    placeholder: schemaAllViewport(placeholder),
    fieldName: schemaAllViewport(fieldName),
    help: schemaAllViewport(help),
    deepThink: schemaAllViewport(deepThink),
    onlineSearch: schemaAllViewport(onlineSearch),
    showImageIcon: schemaAllViewport(showImageIcon),
    showFileIcon: schemaAllViewport(showFileIcon),
    showListenIcon: schemaAllViewport(showListenIcon),
    columnNum: schemaAllViewport(columnNum),
    columnWidth: schemaAllViewport(columnWidth),
    strMax: schemaAllViewport(strMax),
})


export type AlaFormTextareaSchema = Static<typeof schema>

export default schema


