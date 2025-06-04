import { schemaAllViewport } from "@/components/cps/utils/schemaAllViewport"
import { Type } from "@sinclair/typebox"

/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-13 10:37:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-04 20:28:21
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

export const configCurveStyle = (title: string) => {

    const config = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,
            options: [{
                name: '直线',
                value: 'curveLinear',
            }, {
                name: 'X轴平滑',
                value: 'curveMonotoneX',
            }, {
                name: 'Y轴平滑',
                value: 'curveMonotoneY',
            }, {
                name: 'B样条曲线',
                value: 'curveBasis',
            }, {
                name: '张力曲线',
                value: 'curveCardinal',
            }, {
                name: 'Catmull-Rom曲线',
                value: 'curveCatmullRom',
            }],
            default: 'curveLinear',
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

export const configTextAnchor = (title: string) => {

    const anchor = Type.Array(
        Type.Object({
            name: Type.String(),
            value: Type.String(),
        }),
        {
            code: "config-select",
            title,// start 、 middle 、 end
            options: [{
                name: '头部',
                value: 'start',
            }, {
                name: '中间',
                value: 'middle',
            }, {
                name: '尾部',
                value: 'end',
            }],
            default: 'middle',
        }
    );


    return anchor
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



export const configFloat = (title: string, defaultValue = 0, min = 0, step = 1) => {
    const config = Type.Number({
        code: "config-number",
        title,
        default: defaultValue,
        // 绑定 element-plus 原始组件的其他属性
        other: {
            min,
            step,
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
            default: 'break',
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
        bottom: schemaAllViewport(configFloat("下边距", 40, 0)),
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
            default: defaultValue
        }
    );


    return scales
}

export const configScaleOrdinalScale = () => {
    const config = {
        xName: schemaAllViewport(configText("属性名", 'name')),
        scaleXType: schemaAllViewport(configScale('比例尺类型', 'scaleOrdinal')),


        // 轴线
        x_axis_color: schemaAllViewport(configColor("轴线颜色")),
        x_axis_width: schemaAllViewport(configFloat("轴线宽度", 1, 0, 0.2)),

        // 刻度线
        x_scaleMarks_length: schemaAllViewport(configText("刻度线长度", '10px')),
        x_scaleMarks_width: schemaAllViewport(configFloat("刻度线宽度", 1, 0, 0.2)),
        x_scaleMarks_color: schemaAllViewport(configColor("刻度线颜色")),
        x_dashed_line_style: schemaAllViewport(configText("虚线样式(6,4)")),
        x_dashed_line_point: schemaAllViewport(configCap('虚线端点样式')),


        // 标签
        x_label_color: schemaAllViewport(configColor("标签字体颜色")),
        x_label_fontSize: schemaAllViewport(configInt("标签字体大小", 14)),
        x_label_weight: schemaAllViewport(configFontWeight("标签字体粗细")),
        x_label_textAnchor: schemaAllViewport(configTextAnchor("标签对齐方式")),
        x_label_dy: schemaAllViewport(configInt("标签轴线间距", 16)),
        x_label_rotate: schemaAllViewport(configInt("标签旋转角度", 0, -359)),


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


export const configScaleLinearScale = () => {
    const config = {
        yName: schemaAllViewport(configText("属性名", 'value')),
        scaleYType: schemaAllViewport(configScale('比例尺类型', 'scaleLinear')),

        addZero: schemaAllViewport(configBoolean('填补零值？')),
        addMinPercentage: schemaAllViewport(configFloat("填补最小值%", 0, 1, 0.1)),
        // decimalNum: schemaAllViewport(configInt("小数位数", 0, 0)),
        levelNum: schemaAllViewport(configInt("分段数", 5, 0)),

        // 轴线
        y_axis_color: schemaAllViewport(configColor("轴线颜色")),
        y_axis_width: schemaAllViewport(configFloat("轴线宽度", 1, 0, 0.2)),

        // 刻度线
        y_scaleMarks_length: schemaAllViewport(configText("刻度线长度", '10px')),
        y_scaleMarks_width: schemaAllViewport(configFloat("刻度线宽度", 1, 0, 0.2)),
        y_scaleMarks_color: schemaAllViewport(configColor("刻度线颜色")),
        y_dashed_line_style: schemaAllViewport(configText("虚线样式(6,4)")),
        y_dashed_line_point: schemaAllViewport(configCap('虚线端点样式')),


        // 标签
        y_label_color: schemaAllViewport(configColor("标签字体颜色")),
        y_label_fontSize: schemaAllViewport(configInt("标签字体大小", 14)),
        y_label_weight: schemaAllViewport(configFontWeight("标签字体粗细")),
        y_label_textAnchor: schemaAllViewport(configTextAnchor("标签对齐方式")),
        y_label_dy: schemaAllViewport(configInt("标签轴线间距", -16, -100)),
        y_label_rotate: schemaAllViewport(configInt("标签旋转角度", 0, -359)),
        y_label_unit: schemaAllViewport(configText("数据单位")),


    }
    return config
}


export const configLine = () => {
    const config = {

        // 刻度线
        line_width: schemaAllViewport(configFloat("折线宽度", 1, 0, 0.2)),
        line_color: schemaAllViewport(configColor("折线颜色")),
        line_dashed_style: schemaAllViewport(configText("虚线样式(6,4)")),
        line_dashed_point: schemaAllViewport(configCap('虚线端点样式')),
        lineAnimation: schemaAllViewport(configBoolean('折线动画？')),
        line_inflection_point: schemaAllViewport(configFloat("拐点半径", 6, 0, 0.2)),
        line_inflection_color: schemaAllViewport(configColor("拐点颜色")),
        circleAnimation: schemaAllViewport(configBoolean('拐点动画？')),
        line_curve_style: schemaAllViewport(configCurveStyle("平滑策略")),
        addArea: schemaAllViewport(configBoolean('添加区域图')),
        areaColor: schemaAllViewport(configColor('区域图颜色')),


    }
    return config
}


