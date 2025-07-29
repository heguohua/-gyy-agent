/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-29 18:49:51
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/number/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { configCollapseItem, configInt, configText, configTextarea } from "@/config/configUtil";

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

const step = Type.Number({
    code: "config-number",
    title: "数值步长",
    placeholder: "请输入步长",
    default: 0.01,
})

const precision = Type.Number({
    code: "config-int",
    title: "数值精度",
    placeholder: "请输入精度",
    default: 0,
})
const right = Type.String({
    code: "config-boolean",
    title: "按钮在右侧？",
    default: false,
})
const columnWidth = Type.String({
    code: "config-int",
    title: "单列宽度",
    default: 100,
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


const icon = Type.String({
    code: "config-input",
    title: "头部图标",
    default: "",
})

const iconWidth = Type.String({
    code: "config-int",
    title: "图标宽度",
    default: 16,
    other: {
        min: 1,
        max: 50,
        controlsPosition: ''
    }
})

const iconHeight = Type.String({
    code: "config-int",
    title: "图标高度",
    default: 16,
    other: {
        min: 1,
        max: 50,
        controlsPosition: ''
    }
})

const required = Type.String({
    code: "config-boolean",
    title: "必填字段？",
    default: false,
})

const numberMin = Type.String({
    code: "config-int",
    title: "最小值",
    other: {
        controlsPosition: 'right'
    }
})

const numberMax = Type.String({
    code: "config-int",
    title: "最大值",
    other: {
        controlsPosition: 'right'
    }
})
const detail = Type.String({
    code: "config-boolean",
    title: "详情列？",
    default: false,
})
const thousandth = Type.String({
    code: "config-boolean",
    title: "数值千分位？",
    default: false,
})


const syncWriteTypes = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-radio",
        title: "值转写方式",
        default: 'replace',
        checkbox: [{
            name: '替换',
            value: 'replace',
        }, {
            name: '相加',
            value: 'addition',
        }, {
            name: '相减',
            value: 'subtraction',
        }],
    }
);


const schema = Type.Object({
    label: schemaAllViewport(label),
    placeholder: schemaAllViewport(placeholder),
    fieldName: schemaAllViewport(fieldName),
    help: schemaAllViewport(help),
    icon: schemaAllViewport(icon),
    iconWidth: schemaAllViewport(iconWidth),
    iconHeight: schemaAllViewport(iconHeight),
    columnNum: schemaAllViewport(columnNum),
    columnWidth: schemaAllViewport(columnWidth),
    step: schemaAllViewport(step),
    precision: schemaAllViewport(precision),
    right: schemaAllViewport(right),
    showInSearch: schemaAllViewport(showInSearch),
    showInTable: schemaAllViewport(showInTable),
    required: schemaAllViewport(required),
    detail: schemaAllViewport(detail),
    min: schemaAllViewport(numberMin),
    max: schemaAllViewport(configInt('最大值', Number.MAX_VALUE, 0)),
    thousandth: schemaAllViewport(thousandth),
    syncWrite: schemaAllViewport(configCollapseItem("数值转写")),
    syncWriteTableName: schemaAllViewport(configText("转写模块名", "", [{ name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },])),
    syncWriteColumnName: schemaAllViewport(configText("转写字段名", "", [{ name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },])),
    syncWriteWhereColumnName: schemaAllViewport(configTextarea("转写条件关系")),
    syncWriteType: schemaAllViewport(syncWriteTypes),

    // style: schemaAllViewport(style),
})


export type AlaFormNumberSchema = Static<typeof schema>

export default schema


