/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-18 14:31:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/file/schema.ts
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
const width = Type.Number({
    code: "config-input",
    title: "宽度",
    default: "",
})


const items = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-key-value",
        title: "选项",
        default: [],
        required: true,
    }
);
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
    default: 300,
    other: {
        min: 10,
        max: 500,
        step: 10,
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

const required = Type.String({
    code: "config-boolean",
    title: "必填字段？",
    default: false,
})
const noEditable = Type.String({
    code: "config-boolean",
    title: "禁止修改？",
    default: false,
})


const fileTypes = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-checkbox",
        title: "文件类型",
        checkbox: [{
            name: '图片类',
            value: 'image/*',
        }, {
            name: '音频类',
            value: 'audio/*',
        }, {
            name: '视频类',
            value: 'video/*',
        }, {
            name: 'TXT',
            value: '.txt',
        }, {
            name: 'PDF',
            value: '.pdf',
        }, {
            name: 'Word',
            value: '.doc,.docx',
        }, {
            name: 'Excel',
            value: '.xls,.xlsx',
        }, {
            name: 'PPT',
            value: '.ppt,.pptx',
        }, {
            name: 'zip、rar、7z',
            value: '.zip,.rar,.7z',
        }],
    }
);


const multipleFile = Type.String({
    code: "config-boolean",
    title: "多文件选择？",
    default: false,
})


const oneLevel = Type.String({
    code: "config-input",
    title: "一级分类",
    default: "",
    required: true,
})

const secondLevel = Type.String({
    code: "config-input",
    title: "二级分类",
    default: "",
    required: true,
})

const strMax = Type.String({
    code: "config-int",
    title: "最大长度",
    other: {
        min: 1000,
        max: 20000
    }
})

const schema = Type.Object({
    label: schemaAllViewport(label),
    placeholder: schemaAllViewport(placeholder),
    width: schemaAllViewport(width),
    fileTypes: schemaAllViewport(fileTypes),
    fieldName: schemaAllViewport(fieldName),
    strMax: schemaAllViewport(strMax),
    oneLevel: schemaAllViewport(oneLevel),
    secondLevel: schemaAllViewport(secondLevel),
    multipleFile: schemaAllViewport(multipleFile),
    help: schemaAllViewport(help),
    columnNum: schemaAllViewport(columnNum),
    columnWidth: schemaAllViewport(columnWidth),
    showInSearch: schemaAllViewport(showInSearch),
    showInTable: schemaAllViewport(showInTable),
    required: schemaAllViewport(required),
    noEditable: schemaAllViewport(noEditable),
    // style: schemaAllViewport(style),
})


export type AlaFormFileSchema = Static<typeof schema>

export default schema


