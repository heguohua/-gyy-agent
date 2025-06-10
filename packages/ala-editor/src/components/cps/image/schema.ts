/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-10 08:47:40
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/image/schema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";

const src = Type.String({
    code: "config-files",
    title: "图片",
    default: "",
})

const link = Type.String({
    code: "config-input",
    title: "链接",
    default: "",
    placeholder: "请输入链接",
})

const width = Type.String({
    code: "config-input",
    title: "宽度",
    default: "100%",
    placeholder: "请输入宽度",

})

const height = Type.String({
    code: "config-input",
    title: "高度",
    default: "300px",
    placeholder: "请输入高度",

})

const style = Type.String({
    code: "config-textarea",
    title: "样式",
    default: "",
    placeholder: "请输入样式",

})

const schema = Type.Object({
    src: schemaAllViewport(src),
    link: schemaAllViewport(link),
    width: schemaAllViewport(width),
    height: schemaAllViewport(height),
    // style: schemaAllViewport(style),
})


// type AlaImageSchema = {
//     link: {
//         desktop: string;
//         mobile: string;
//     };
//     height: {
//         desktop: string;
//         mobile: string;
//     };
//     width: {
//         desktop: string;
//         mobile: string;
//     };
//     display: {
//         desktop: boolean;
//         mobile: boolean;
//     };
//     src: {
//         desktop: string;
//         mobile: string;
//     };
// }
export type AlaImageSchema = Static<typeof schema>

export default schema


