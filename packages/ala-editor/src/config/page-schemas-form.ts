/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-22 19:52:42
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-21 18:28:58
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/page-schemas-form.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";
import { min } from "lodash";
import { formTypes } from "@/components/cps/dynamic/formTypes";
import { configCollapseItem } from "./configUtil";

const background = Type.Boolean({
    code: "config-color",
    title: "背景色",
    default: '',
})
// { name: 'required', message: '不能为空' },
// { name: 'pattern', pattern: 'phone', message: '只能填写手机号' },
// { name: 'min', length: 3, message: '最少3个字符' },
// { name: 'max', length: 20, message: '最多20个字符' },
// { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
const title = Type.String({
    id: "config-input",
    code: "config-input",
    title: "标题",
    placeholder: "请输入页面标题",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'max', length: 20, message: '最多20个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
    ]
})

const width = Type.Number({
    code: "config-int",
    title: "页面宽度",
    placeholder: "请输入页面宽度",
    other: {
        min: 400,
        max: 1920,
        step: 50
    }
})

const labelWidth = Type.Number({
    code: "config-int",
    title: "标签宽度",
    placeholder: "请输入标签宽度",
    other: {
        min: 80,
        max: 200,
        step: 5
    }
})
const position = Type.String({
    code: "config-select",
    title: "标签位置",
    options: [{
        name: '左侧',
        value: 'left',
    }, {
        name: '右侧',
        value: 'right',
    }, {
        name: '顶部',
        value: 'top',
    }],
    other: {
        clearable: true,
    },
    default: 'left'
})

const moduleName = Type.Number({
    code: "config-input",
    title: "模块名",
    placeholder: "请输入模块名",
    required: true,
    rules: [
        { name: 'required', message: '不能为空' },
        { name: 'min', length: 3, message: '最少3个字符' },
        { name: 'max', length: 30, message: '最多30个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
        { name: 'pattern', pattern: 'LOrl', message: '只能包含大写字母、小写字母' },
    ]
})


const formType = Type.String({
    code: "config-select",
    title: "页面类型",
    options: formTypes,
    rules: [
        { name: 'required', message: '不能为空' },
    ],
    other: {
        clearable: true
    },
    default: 'pageForm'
})


const columnNum = Type.Number({
    code: "config-int",
    title: "表单列数",
    placeholder: "请输入表单列数",
    default: 1,
    // 绑定 element-plus 原始组件的其他属性
    other: {
        min: 1,
        max: 4,
        controlsPosition: ''
    }
})




const useFormTitle = Type.String({
    code: "config-boolean",
    title: "自定义标题？",
    default: false,
})



const showButtonsColumn = Type.String({
    code: "config-boolean",
    title: "显示按钮列？",
    default: false,
})

const showAddButton = Type.String({
    code: "config-boolean",
    title: "显示编辑按钮？",
    default: false,
})

const showEditButton = Type.String({
    code: "config-boolean",
    title: "显示新增按钮？",
    default: false,
})

const showDeleteButton = Type.String({
    code: "config-boolean",
    title: "显示删除按钮？",
    default: false,
})

const showCreatedBy = Type.String({
    code: "config-boolean",
    title: "添加创建人？",
    default: false,
})

const showCreatedTime = Type.String({
    code: "config-boolean",
    title: "添加创建时间？",
    default: false,
})


const showUpdatedBy = Type.String({
    code: "config-boolean",
    title: "添加更新人？",
    default: false,
})

const showUpdatedTime = Type.String({
    code: "config-boolean",
    title: "添加更新时间？",
    default: false,
})


const openDataPermission = Type.String({
    code: "config-boolean",
    title: "开启数据权限？",
    default: true,
})
// 数据权限字段名
const dataPermissionColumn = Type.String({
    id: "config-input",
    code: "config-input",
    title: "数据权限字段名",
    placeholder: "请填写组件字段名",
    required: false,
    rules: [
        { name: 'max', length: 50, message: '最多50个字符' },
        { name: 'pattern', pattern: 'No_', message: '不能含有特殊字符' },
    ]
})
const showDisableButton = Type.String({
    code: "config-boolean",
    title: "显示禁用按钮？",
    default: false,
})


const outApi = Type.String({
    code: "config-boolean",
    title: "外部API？",
    default: false,
})



const outApiUrl = Type.String({
    code: "config-textarea",
    title: "API地址",
    placeholder: "请输入外部API的URL地址",
    rules: [
        { name: 'max', length: 30, message: '最多200个字符' },
    ]
})


const outApiParams = Type.String({
    code: "config-textarea",
    title: "默认参数",
    placeholder: "请输入请求外部API的默认参数",
    rules: [
        { name: 'max', length: 30, message: '最多200个字符' },
    ]
})


const schema = Type.Object({
    background: schemaAllViewport(background),
    title: schemaAllViewport(title),
    width: schemaAllViewport(width),
    labelWidth: schemaAllViewport(labelWidth),
    position: schemaAllViewport(position),
    moduleName: schemaAllViewport(moduleName),
    formType: schemaAllViewport(formType),
    columnNum: schemaAllViewport(columnNum),
    useFormTitle: schemaAllViewport(useFormTitle),
    pageButtons: schemaAllViewport(configCollapseItem("页面按钮")),
    showButtonsColumn: schemaAllViewport(showButtonsColumn),
    showAddButton: schemaAllViewport(showAddButton),
    showEditButton: schemaAllViewport(showEditButton),
    showDeleteButton: schemaAllViewport(showDeleteButton),
    showDisableButton: schemaAllViewport(showDisableButton),
    dataPermission: schemaAllViewport(configCollapseItem("数据权限")),
    openDataPermission: schemaAllViewport(openDataPermission),
    dataPermissionColumn: schemaAllViewport(dataPermissionColumn),
    time: schemaAllViewport(configCollapseItem("创建和更新相关")),
    showCreatedBy: schemaAllViewport(showCreatedBy),
    showCreatedTime: schemaAllViewport(showCreatedTime),
    showUpdatedBy: schemaAllViewport(showUpdatedBy),
    showUpdatedTime: schemaAllViewport(showUpdatedTime),

    outApis: schemaAllViewport(configCollapseItem("外部API")),
    outApi: schemaAllViewport(outApi),
    outApiUrl: schemaAllViewport(outApiUrl),
    outApiParams: schemaAllViewport(outApiParams),

})


export type AlaPageSchemaForm = Static<typeof schema>

export default schema


