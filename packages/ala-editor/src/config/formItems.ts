/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:34:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-16 11:14:29
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/formItems.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { BaseBlock } from "./blocks";
import { BlockSchemas, BlockSchemaKeys } from "./schemas";

export const baseFields: BaseBlock[] = [
    {
        id: "",
        name: "图片",
        code: "image",
        icon: "image",
        formData: {},
    },
    {
        id: "",
        name: "单行输入",
        code: "input",
        icon: "input",
        formData: {},
    },
    {
        id: "",
        name: "多行输入",
        code: "textarea",
        icon: "textarea",
        formData: {},
    },
    {
        id: "",
        name: "数值",
        code: "number",
        icon: "number",
        formData: {},
    },
    {
        id: "",
        name: "单选项",
        code: "radio",
        icon: "radio",
        formData: {},
    },
    {
        id: "",
        name: "多选项",
        code: "checkbox",
        icon: "checkbox",
        formData: {},
    },
    {
        id: "",
        name: "下拉选",
        code: "select",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "开关",
        code: "switch",
        icon: "switch",
        formData: {},
    },
    {
        id: "",
        name: "滑块",
        code: "slider",
        icon: "slider",
        formData: {},
    },
    {
        id: "",
        name: "打分",
        code: "rating",
        icon: "star",
        formData: {},
    },
    {
        id: "",
        name: "日期",
        code: "date",
        icon: "calendar",
        formData: {},
    },
    {
        id: "",
        name: "时间",
        code: "date",
        icon: "time",
        formData: {},
    },
]

export const seniorFields: BaseBlock[] = [
    {
        id: "",
        name: "多列",
        code: "column",
        icon: "column",
        nested: true,
        children: [[], []],
        formData: {
            cols: {
                desktop: [0.5, 0.5],
                mobile: [0.5, 0.5],
            }
        },
    },
    {
        id: "",
        name: "下拉选(API)",
        code: "selectApi",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "下拉选(Tree)",
        code: "selectTree",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "下拉选(Table)",
        code: "selectTable",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "分隔线",
        code: "divider",
        icon: "line_x",
        formData: {},
    },
    {
        id: "",
        name: "章节标题",
        code: "chapter",
        icon: "chapter",
        formData: {},
    }
]

export const businessFields: BaseBlock[] = [
    {
        id: "",
        name: "下拉选(Dict)",
        code: "selectDict",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "下拉选(Tree)",
        code: "select",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "下拉选(Table)",
        code: "select",
        icon: "select",
        formData: {},
    }
]
