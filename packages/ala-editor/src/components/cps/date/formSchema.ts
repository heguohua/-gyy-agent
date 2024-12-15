/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-15 20:01:35
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/date/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { AlaDateFormat, AlaDateType, date } from "@/utils/date";

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

const position = Type.String({
    code: "config-select",
    title: "标签位置",
    default: [{
        name: '左侧',
        value: 'left',
    }, {
        name: '右侧',
        value: 'right',
    }, {
        name: '顶部',
        value: 'top',
    }]
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
        { name: 'max', length: 30, message: '最多20个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
        { name: 'pattern', pattern: 'LOrl', message: '只能包含大写字母、小写字母' },
    ]
})

const dateType = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-select",
        title: "时间类型",
        default: AlaDateType,
        required: true,
    }
);


const format = Type.Array(
    Type.Object({
        name: Type.String(),
        value: Type.String(),
    }),
    {
        code: "config-select",
        title: "时间格式",
        default: AlaDateFormat,
        required: true,
    }
);

const help = Type.String({
    code: "config-textarea",
    title: "帮助提示信息",
    default: "",
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
    position: schemaAllViewport(position),
    placeholder: schemaAllViewport(placeholder),
    fieldName: schemaAllViewport(fieldName),
    dateType: schemaAllViewport(dateType),
    format: schemaAllViewport(format),
    help: schemaAllViewport(help),
    showInSearch: schemaAllViewport(showInSearch),
    showInTable: schemaAllViewport(showInTable),
    // style: schemaAllViewport(style),
})


export type AlaFormDataSchema = Static<typeof schema>

export default schema


