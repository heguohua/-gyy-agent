/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:34:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 22:09:18
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
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "多行输入",
        code: "textarea",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "数值",
        code: "number",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "单选项",
        code: "radio",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "多选项",
        code: "checkbox",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "下拉选项",
        code: "select",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "开关",
        code: "switch",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "滑块",
        code: "slider",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "打分",
        code: "rating",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "日期和时间",
        code: "date",
        icon: "video",
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
]
