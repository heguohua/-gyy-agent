/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 15:34:39
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-19 16:44:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/blocks.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { BlockSchemas, BlockSchemaKeys } from "./schemas";
export interface BaseBlock {
    /**
     * 组件ID
     */
    id: string,
    /**
     * 组件类型编码
     */
    code: string,
    /**
     * 组件名字
     */
    name: string,
    /**
     * 组件图标
     */
    icon: string,
    /**
     * 组件是否可嵌套
     */
    nested?: boolean,
    /**
     * 子组件
     */
    children?: BaseBlock[][],
    /**
     * 组件属性表单
     */
    formData?: BlockSchemas[BlockSchemaKeys] | Object,
}

export const baseBlocks: BaseBlock[] = [
    {
        id: "",
        name: "图片",
        code: "image",
        icon: "image",
        formData: {},
    },
    {
        id: "",
        name: "视频",
        code: "config-video",
        icon: "video",
        formData: {},
    },
    {
        id: "",
        name: "文本",
        code: "config-text",
        icon: "text",
        formData: {},
    },
    {
        id: "",
        name: "幻灯片",
        code: "config-swiper",
        icon: "swiper",
        formData: {},
    }, {
        id: "",
        name: "留白",
        code: "config-blank",
        icon: "blank",
        formData: {},
    },
]
export const seniorBlocks: BaseBlock[] = [
    {
        id: "",
        name: "多行",
        code: "row",
        icon: "row",
        formData: {},
    },
    {
        id: "",
        name: "多列",
        code: "column",
        icon: "column",
        nested: true,
        children: [],
        formData: {},
    },
]

export const canvasBlocks: BaseBlock[] = [
    {
        id: "",
        name: "图片",
        code: "image",
        icon: "image",
        formData: {},
    },
    {
        id: "",
        name: "文本",
        code: "column",
        icon: "column",
        formData: {},
    },
]

