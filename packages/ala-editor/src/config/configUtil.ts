import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport"
import { Type } from "@sinclair/typebox"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-13 10:37:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 15:42:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/configUtil.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export const configTitle = (title: string) => {
    const title_title = Type.String({
        code: "config-title",
        title,
    })
    return title_title
}

export const configFontStyle = (title: string) => {

    const fontStyle = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            default: [{
                name: '正常字',
                value: 'normal',
            }, {
                name: '斜体字',
                value: 'italic',
            }, {
                name: '斜体字',
                value: 'oblique',
            }],
        }
    );


    return fontStyle
}

export const configTextAlign = (title: string) => {

    const fontStyle = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            default: [{
                name: '自动',
                value: 'auto',
            }, {
                name: '左对齐',
                value: 'left',
            }, {
                name: '右对齐',
                value: 'right',
            }, {
                name: '居中对齐',
                value: 'center',
            }],
        }
    );


    return fontStyle
}

export const configTextVerticalAlign = (title: string) => {

    const fontStyle = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            default: [{
                name: '自动',
                value: 'auto',
            }, {
                name: '顶部对齐',
                value: 'top',
            }, {
                name: '居中对齐',
                value: 'middle',
            }, {
                name: '底部对齐',
                value: 'bottom',
            }],
        }
    );


    return fontStyle
}

export const configFontWeight = (title: string) => {

    const fontWeight = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            default: [{
                name: '100',
                value: '100',
            }, {
                name: '200',
                value: '200',
            }, {
                name: '300',
                value: '300',
            }, {
                name: '400',
                value: '400',
            }, {
                name: '500',
                value: '500',
            }, {
                name: '600',
                value: '600',
            }, {
                name: '700',
                value: '700',
            }, {
                name: '800',
                value: '800',
            }, {
                name: '900',
                value: '900',
            }],
        }
    );


    return fontWeight
}



export const configNumber = (title: string, defaultValue = 10, min = 0) => {
    const lineHeight = Type.Number({
        code: "config-int",
        title,
        default: defaultValue,
        // 绑定 element-plus 原始组件的其他属性
        other: {
            min: min,
            controlsPosition: ''
        }
    })
    return lineHeight
}


export const configTextOverflow = (title: string) => {

    const fontStyle = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            default: [{
                name: '截断',
                value: 'truncate',
            }, {
                name: '换行',
                value: 'break',
            }, {
                name: '内换行',
                value: 'breakAll',
            }],
        }
    );


    return fontStyle
}

export const configColor = (title: string, defaultValue = '#bbb') => {
    const color = Type.String({
        code: "config-color",
        default: defaultValue,
        title,
    })
    return color
}

export const configMainTitle = () => {
    const config = {
        text_color: schemaAllViewport(configColor("字体颜色")),
        text_backgroundColor: schemaAllViewport(configColor("背景颜色", 'rgba(255, 255, 255, 0)')),
        text_borderRadius: schemaAllViewport(configNumber("圆角半径", 2)),
        text_fontStyle: schemaAllViewport(configFontStyle("字体风格")),
        text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        text_fontSize: schemaAllViewport(configNumber("字体大小")),
        text_width: schemaAllViewport(configNumber("显示宽度", 100)),
        text_height: schemaAllViewport(configNumber("显示高度")),
        text_overflow: schemaAllViewport(configTextOverflow("换行策略")),
        text_lineHeight: schemaAllViewport(configNumber("字体行高")),
        text_left: schemaAllViewport(configNumber("左侧距离")),
        text_top: schemaAllViewport(configNumber("顶部距离")),
        text_padding: schemaAllViewport(configNumber("内边距")),
        text_textAlign: schemaAllViewport(configTextAlign("水平对齐")),
        text_textVerticalAlign: schemaAllViewport(configTextVerticalAlign("垂直对齐")),
        text_itemGap: schemaAllViewport(configNumber("主副间距")),
    }
    return config
}


export const configSubTitle = () => {
    const config = {
        sub_text_color: schemaAllViewport(configColor("字体颜色")),
        sub_text_fontStyle: schemaAllViewport(configFontStyle("字体风格")),
        sub_text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        sub_text_fontSize: schemaAllViewport(configNumber("字体大小")),
        sub_text_width: schemaAllViewport(configNumber("显示宽度", 100)),
        sub_text_height: schemaAllViewport(configNumber("显示高度")),
        sub_text_overflow: schemaAllViewport(configTextOverflow("换行策略")),
        sub_text_lineHeight: schemaAllViewport(configNumber("字体行高")),
        sub_text_textAlign: schemaAllViewport(configTextAlign("水平对齐")),
        sub_verticalAlign: schemaAllViewport(configTextVerticalAlign("垂直对齐")),
    }
    return config
}





