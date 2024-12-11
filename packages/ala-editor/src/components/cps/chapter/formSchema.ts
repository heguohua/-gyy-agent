/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-11 22:07:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/chapter/formSchema.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { Static, Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport";

const label = Type.String({
    code: "config-input",
    title: "标签",
    default: "",
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
        name: '中间',
        value: 'center',
    }]
})

const height = Type.Number({
    code: "config-input",
    title: "分隔线宽度",
    default: 2,
})

const lineStyle = Type.String({
    code: "config-select",
    title: "分隔线样式",
    default: [{
        name: '实线',
        value: 'solid',
    }, {
        name: '虚线',
        value: 'dashed',
    }, {
        name: '点线',
        value: 'dotted',
    }, {
        name: '双实线',
        value: 'double',
    }]
})

const help = Type.String({
    code: "config-textarea",
    title: "帮助提示信息",
    default: "",
})

const schema = Type.Object({
    label: schemaAllViewport(label),
    position: schemaAllViewport(position),
    height: schemaAllViewport(height),
    lineStyle: schemaAllViewport(lineStyle),
    help: schemaAllViewport(help),

})


export type AlaFormChapterSchema = Static<typeof schema>

export default schema


