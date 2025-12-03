/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:34:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-26 10:42:23
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
        name: "级联选择",
        code: "cascader",
        icon: "f_cascader",
        formData: {},
    },
    {
        id: "",
        name: "Dict级联",
        code: "cascaderDict",
        icon: "f_cascader",
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
        name: "日期范围",
        code: "dateRange",
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
    {
        id: "",
        name: "图片",
        code: "image",
        icon: "image",
        formData: {},
    },
    {
        id: "",
        name: "文件",
        code: "file",
        icon: "file",
        formData: {},
    }
]

export const seniorFields: BaseBlock[] = [
    // {
    //     id: "",
    //     name: "多列",
    //     code: "column",
    //     icon: "column",
    //     nested: true,
    //     children: [[], []],
    //     formData: {
    //         cols: {
    //             desktop: [0.5, 0.5],
    //             mobile: [0.5, 0.5],
    //         }
    //     },
    // },
    {
        id: "",
        name: "下拉选(API)",
        code: "selectApi",
        icon: "select",
        formData: {},
    },
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
        code: "selectTree",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "Table选择",
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
    },
    {
        id: "",
        name: "子表单",
        code: "formTable",
        icon: "f_table",
        formData: {},
    },
    {
        id: "",
        name: "子表计数器",
        code: "childTableCount",
        icon: "f_counter",
        formData: {},
    },
    {
        id: "",
        name: "创建时间",
        code: "createdTime",
        icon: "calendar",
        formData: {},
    },
    {
        id: "",
        name: "完成时间",
        code: "finishedTime",
        icon: "calendar",
        formData: {},
    },
    {
        id: "",
        name: "权限组",
        code: "status",
        icon: "status",
        formData: {},
    },
    {
        id: "",
        name: "AI智慧填充",
        code: "ai",
        icon: "f_ai",
        formData: {},
    },
    {
        id: "",
        name: "AI搜索",
        code: "aiInfo",
        icon: "aiIcon",
        formData: {},
    },
    {
        id: "",
        name: "Table数值转写",
        code: "numberTransliterate",
        icon: "number",
        formData: {},
    }
]

export const businessFields: BaseBlock[] = [
    {
        id: "",
        name: "用户弹窗选择",
        code: "selectTable",
        icon: "f_user",
        formData: {},
    },
    {
        id: "",
        name: "部门弹窗选择",
        code: "selectTable",
        icon: "f_dept",
        formData: {},
    },
    {
        id: "",
        name: "角色弹窗选择",
        code: "selectTable",
        icon: "role",
        formData: {},
    },
    {
        id: "",
        name: "职位弹窗选择",
        code: "selectTable",
        icon: "select",
        formData: {},
    },
    {
        id: "",
        name: "流程弹窗选择",
        code: "selectTable",
        icon: "flow_define",
        formData: {},
    },
    {
        id: "",
        name: "表单弹窗选择",
        code: "selectTable",
        icon: "code_form",
        formData: {},
    },
    {
        id: "",
        name: "动态模块弹窗选择",
        code: "selectTable",
        icon: "select",
        formData: {},
    },

]
