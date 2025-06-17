/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-17 13:49:59
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/childTableCount/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { configColors } from "@/config/configUtil";
import colors from "@/utils/colors";

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

const unit = Type.String({
    code: "config-input",
    title: "单位",
    required: false,
    rules: []
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
    default: 0,
    other: {
        min: 0,
        max: 500,
        step: 10,
        controlsPosition: ''
    }
})

const showInTable = Type.String({
    code: "config-boolean",
    title: "列表显示？",
    default: false,
})

const backgroundNum = Type.String({
    code: "config-input",
    title: "背景色边界值",
    default: "0,1",
})


const moduleName = Type.String({
    code: "config-input",
    title: "子模块名",
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
    label: schemaAllViewport(label),
    fieldName: schemaAllViewport(fieldName),
    unit: schemaAllViewport(unit),
    moduleName: schemaAllViewport(moduleName),
    colors: schemaAllViewport(configColors("背景色", colors.chartColors)),
    backgroundNum: schemaAllViewport(backgroundNum),
    help: schemaAllViewport(help),
    columnNum: schemaAllViewport(columnNum),
    columnWidth: schemaAllViewport(columnWidth),
    showInTable: schemaAllViewport(showInTable),
})


export type AlaFormRadioSchema = Static<typeof schema>

export default schema


