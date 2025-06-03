import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport"
import { Type } from "@sinclair/typebox"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-13 10:37:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-03 09:37:59
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

export const configCollapseItem = (title: string) => {
    const title_title = Type.String({
        code: "config-collapse-item",
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
            options: [{
                name: '正常字',
                value: 'normal',
            }, {
                name: '斜体字',
                value: 'italic',
            }, {
                name: '斜体字',
                value: 'oblique',
            }],
            default: 'normal'
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
            options: [{
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
            default: 'left',
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
            options: [{
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
            default: 'middle',
        }
    );


    return fontStyle
}

export const configBorderType = (title: string) => {

    const config = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            options: [{
                name: '实线',
                value: 'solid',
            }, {
                name: '虚线',
                value: 'dashed',
            }, {
                name: '点线',
                value: 'dotted',
            }],
            default: 'solid',
        }
    );


    return config
}

export const configCap = (title: string) => {

    const config = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            options: [{
                name: '方形',
                value: 'butt',
            }, {
                name: '圆形',
                value: 'round',
            }, {
                name: '正方形',
                value: 'square',
            }],
            default: 'butt',
        }
    );


    return config
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
            options: [{
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
            default: '400',
        }
    );


    return fontWeight
}



export const configInt = (title: string, defaultValue = 10, min = 0) => {
    const config = Type.Number({
        code: "config-int",
        title,
        default: defaultValue,
        // 绑定 element-plus 原始组件的其他属性
        other: {
            min: min,
            controlsPosition: ''
        }
    })
    return config
}



export const configFloat = (title: string, defaultValue = 0, min = 0) => {
    const config = Type.Number({
        code: "config-number",
        title,
        default: defaultValue,
        // 绑定 element-plus 原始组件的其他属性
        other: {
            min: min,
            controlsPosition: ''
        }
    })
    return config
}


export const configText = (title: string, defaultValue = '', rules: Array<any> = []) => {
    const config = Type.String({
        code: "config-input",
        title,
        default: defaultValue,
        rules: rules
    })
    return config
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
            options: [{
                name: '截断',
                value: 'truncate',
            }, {
                name: '换行',
                value: 'break',
            }, {
                name: '内换行',
                value: 'breakAll',
            }],
            default:'break',
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

export const configBoolean = (title: string, defaultValue = false) => {
    const bool = Type.String({
        code: "config-boolean",
        title: title,
        default: defaultValue,
    })
    return bool
}

export const configMainTitle = () => {
    const config = {
        text_color: schemaAllViewport(configColor("字体颜色", '#3D446E')),
        text_fontSize: schemaAllViewport(configInt("字体大小", 14)),
        text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        text_left: schemaAllViewport(configText("左偏移", '20px')),
        text_top: schemaAllViewport(configText("上偏移", '10px')),
        text_bottom: schemaAllViewport(configText("下偏移", '10px')),
        // text_backgroundColor: schemaAllViewport(configColor("背景颜色", 'rgba(255, 255, 255, 0)')),
        // text_borderRadius: schemaAllViewport(configInt("圆角半径", 2)),
        // text_fontStyle: schemaAllViewport(configFontStyle("字体风格")),
        // text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        // text_width: schemaAllViewport(configInt("显示宽度", 100)),
        // text_height: schemaAllViewport(configInt("显示高度")),
        // text_overflow: schemaAllViewport(configTextOverflow("换行策略")),
        // text_lineHeight: schemaAllViewport(configInt("字体行高")),
        // text_padding: schemaAllViewport(configInt("内边距")),
        // text_textAlign: schemaAllViewport(configTextAlign("水平对齐")),
        // text_textVerticalAlign: schemaAllViewport(configTextVerticalAlign("垂直对齐")),
    }
    return config
}


export const configSubTitle = () => {
    const config = {
        text_itemGap: schemaAllViewport(configInt("主副间距")),
        sub_text_color: schemaAllViewport(configColor("字体颜色")),
        sub_text_fontStyle: schemaAllViewport(configFontStyle("字体风格")),
        sub_text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        sub_text_fontSize: schemaAllViewport(configInt("字体大小", 10)),
        sub_text_width: schemaAllViewport(configInt("显示宽度", 100)),
        sub_text_height: schemaAllViewport(configInt("显示高度")),
        sub_text_overflow: schemaAllViewport(configTextOverflow("换行策略")),
        sub_text_lineHeight: schemaAllViewport(configInt("字体行高")),
        sub_text_textAlign: schemaAllViewport(configTextAlign("水平对齐")),
        sub_verticalAlign: schemaAllViewport(configTextVerticalAlign("垂直对齐")),
    }
    return config
}


// color: "red",
// borderColor: 'orange',
// borderWidth: 6,
// borderType: 'dashed', configBorderType
// borderCap: 'round',
// opacity: 0.2
export const configItemStyle = () => {
    const config = {
        itemStyle_color: schemaAllViewport(configColor("字体颜色")),
        itemStyle_borderType: schemaAllViewport(configBorderType("边框类型")),
        itemStyle_borderCap: schemaAllViewport(configCap("端点类型")),
        itemStyle_opacity: schemaAllViewport(configFloat("透明度", 1)),
    }
    return config
}


export const configStyle = () => {
    const config = {
        width: schemaAllViewport(configText("宽度", '500px')),
        height: schemaAllViewport(configText("高度", '300px')),
        x: schemaAllViewport(configText("X坐标", '200px')),
        y: schemaAllViewport(configText("Y坐标", '10px')),
        backgroundColor: schemaAllViewport(configColor("背景色", '#fff')),
        radius: schemaAllViewport(configText("圆角大小", '0px')),
        top: schemaAllViewport(configFloat("上边距", 20, 0)),
        bottom: schemaAllViewport(configFloat("下边距", 20, 0)),
        left: schemaAllViewport(configFloat("左边距", 20, 0)),
        right: schemaAllViewport(configFloat("右边距", 20, 0)),
    }
    return config
}




export const configScale = (title: string, defaultValue = 'scaleOrdinal') => {

    const scales = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String()
        }),
        {
            code: "config-select",
            title,
            options: [{
                name: '线性比例尺',
                value: 'scaleLinear',
            }, {
                name: '序数比例尺',
                value: 'scaleOrdinal',
            }, {
                name: '时间比例尺',
                value: 'scaleTime',
            }, {
                name: '量化比例尺',
                value: 'scaleQuantize',
            }, {
                name: '对数比例尺',
                value: 'scaleLog',
            }, {
                name: '指数比例尺',
                value: 'scalePow',
            }, {
                name: '恒等比例尺',
                value: 'scaleIdentity',
            }, {
                name: '分位数比例尺',
                value: 'scaleQuantile',
            }, {
                name: '顺序量表比例尺',
                value: 'scaleSequential',
            }],
            default: 'scaleOrdinal'
        }
    );


    return scales
}

export const configXScale = () => {
    const config = {
        xName: schemaAllViewport(configText("属性名", 'name')),
        scaleXType: schemaAllViewport(configScale('比例尺类型', 'scaleOrdinal')),
        // text_fontSize: schemaAllViewport(configInt("字体大小", 14)),
        // text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        // text_left: schemaAllViewport(configText("左偏移", '20px')),
        // text_top: schemaAllViewport(configText("上偏移", '10px')),
        // text_bottom: schemaAllViewport(configText("下偏移", '10px')),
        // text_backgroundColor: schemaAllViewport(configColor("背景颜色", 'rgba(255, 255, 255, 0)')),
        // text_borderRadius: schemaAllViewport(configInt("圆角半径", 2)),
        // text_fontStyle: schemaAllViewport(configFontStyle("字体风格")),
        // text_fontWeight: schemaAllViewport(configFontWeight("字体粗细")),
        // text_width: schemaAllViewport(configInt("显示宽度", 100)),
        // text_height: schemaAllViewport(configInt("显示高度")),
        // text_overflow: schemaAllViewport(configTextOverflow("换行策略")),
        // text_lineHeight: schemaAllViewport(configInt("字体行高")),
        // text_padding: schemaAllViewport(configInt("内边距")),
        // text_textAlign: schemaAllViewport(configTextAlign("水平对齐")),
        // text_textVerticalAlign: schemaAllViewport(configTextVerticalAlign("垂直对齐")),
    }
    return config
}


