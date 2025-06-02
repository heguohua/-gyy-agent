<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-02 21:33:11
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/line-chart/ala-line-chart.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-line-chart-wrapper" :style="divStyles" ref="chartWrapper">
        <div v-if="formData.freeTitle?.desktop" class="title" :style="titleStyles">
            <VIcon v-if="formData.freeTitleIcon?.desktop" :image="'/bi/' + formData.freeTitleIcon?.desktop"
                :width="formData.text_fontSize?.desktop + 'px'" :height="formData.text_fontSize?.desktop + 'px'" />
            {{ formData.mainTitleText?.desktop }}
        </div>
        <svg class="ala-line-chart-svg" ref="chart" :width="dWidth" :height="dHeight" :style="svgStyle"></svg>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import * as d3 from 'd3';
import * as ad3 from '@/components/charts/utils/dChart';

// State
const props = defineProps({
    bType: {
        type: String
    },
    formData: {
        type: Object,
        default: () => { }
    }
})


const emit = defineEmits(['callback', "init"])

// Methods

logger.info(`bType[ ${props.bType} ]，动态渲染 ala-line-chart 组件，props：`, props);


const dWidth = ref()
const dHeight = ref()
watch(() => props.formData, (v) => {
    nextTick(() => {
        const formData = props.formData

        // 计算svg整体宽度
        dWidth.value = +(chartWrapper.value.offsetWidth)

        // 计算svg整体高度
        // 外层div高度 - 外标题高度
        let height = +(chartWrapper.value.offsetHeight)

        const mainTitleText = formData.mainTitleText?.desktop
        const freeTitle = formData.freeTitle?.desktop
        const text_fontSize = formData.text_fontSize?.desktop
        const text_top = formData.text_top?.desktop
        const text_bottom = formData.text_bottom?.desktop
        if (mainTitleText && freeTitle) {
            const newHeight = height - (text_fontSize + calculateValue(height, text_top) + calculateValue(height, text_bottom))
            height = newHeight
        }
        dHeight.value = height

        nextTick(() => {
            drawChart()
        })
    })

}, { immediate: true, deep: true })

// 图标外层对象div实例
const chartWrapper = ref()

const chart = ref<HTMLDivElement | null>(null)

// 1、设置svg图形 外部div 样式
const divStyles = computed(() => {
    const style: { [key: string]: any } = { width: '100%', height: '100%', borderRadius: props.formData.radius?.desktop }
    return style
})

// 2、设置 svg 图形样式
const svgStyle = computed(() => {
    const style: { [key: string]: any } = {}
    style.background = props.formData.backgroundColor?.desktop
    style.borderRadius = props.formData.radius?.desktop
    return style
})

// 3、计算外部标题的样式
const titleStyles = computed(() => {

    const style: { [key: string]: any } = {}
    const formData = props.formData

    const mainTitleText = formData.mainTitleText?.desktop
    const freeTitle = formData.freeTitle?.desktop

    if (mainTitleText && freeTitle) {

        // 说明用户配置了主标题
        // 文字颜色
        const text_color = formData.text_color?.desktop
        if (text_color) style.color = text_color
        // 文字粗细
        const text_fontWeight = formData.text_fontWeight?.desktop || 400
        if (text_fontWeight) style.fontWeight = text_fontWeight

        // 文字水平偏移距离
        const text_left = formData.text_left?.desktop
        if (text_left) style.paddingLeft = text_left

        // 设置垂直偏移
        const text_top = formData.text_top?.desktop
        const text_bottom = formData.text_bottom?.desktop
        if (text_top) style.paddingTop = text_top
        if (text_bottom) style.paddingBottom = text_bottom

        // 文字大小
        const text_fontSize = formData.text_fontSize?.desktop
        if (text_fontSize) {
            style.fontSize = text_fontSize + 'px'
            style.lineHeight = text_fontSize + 'px'
        }

    }

    return style
})

interface DataPoint {
    name: string
    value: number
}

// 计算 px 和 % 具体的值
const calculateValue = (sourceValue: number, value: string) => {
    let v = 0
    if (value.includes('px')) {
        v = +(value.replaceAll('px', '').trim())
    } else if (value.includes('%')) {
        v = sourceValue * (+(value.replaceAll('%', '').trim())) / 100
    }
    return v
}

// 4、绘制图形
const drawChart = () => {

    const formData = props.formData

    // 1、查找 svg 图形组件
    const svg = d3.select(chart.value);

    // 2、清除原有的图形元素，例如路径、圆、文本等
    svg.selectAll("*").remove();

    // 3、计算 svg 图形内边距信息
    const margin = {
        top: formData.top?.desktop,
        bottom: formData.bottom?.desktop,
        left: formData.left?.desktop,
        right: formData.right?.desktop,
    };

    // 4、计算 svg 图形宽度、高度
    const width = +svg.attr("width") - margin.left - margin.right;
    let height = +svg.attr("height") - margin.top - margin.bottom;

    // 高度减去外标题上下 padding 的距离
    const mainTitleText = formData.mainTitleText?.desktop
    const freeTitle = formData.freeTitle?.desktop


    // const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // 5、设置 svg 内部顶层 group 的坐标原点
    const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // 示例数据
    const data: DataPoint[] = [{ name: '一月', value: 300 }, { name: '三月', value: 210 }, { name: '五月', value: 567 }, { name: '七月', value: 183 }, { name: '九月', value: 235 }, { name: '十一月', value: 478 }];

    // 6、添加图形标题
    if (mainTitleText && !freeTitle) {

        // 说明用户配置了主标题

        const titleAttrs = new Map<string, any>()

        // 文字颜色
        const text_color = formData.text_color?.desktop
        titleAttrs.set("fill", text_color)

        // 文字水平偏移距离
        let titleLeft = 0
        const text_left = formData.text_left?.desktop
        if (text_left) {
            titleLeft = calculateValue(width, text_left)
        }
        titleAttrs.set("x", titleLeft)
        titleAttrs.set("text-anchor", 'middle')

        // 设置垂直偏移
        titleAttrs.set("dominant-baseline", 'middle')
        let titleTop = 0
        const text_top = formData.text_top?.desktop
        if (text_top) {
            titleTop = calculateValue(height, text_top)
        }
        const text_bottom = formData.text_bottom?.desktop
        if (text_bottom) {
            titleTop += calculateValue(height, text_bottom)
        }
        titleAttrs.set('y', titleTop)
        const title = ad3.aText(group, mainTitleText, titleAttrs)

        // 文字大小
        const text_fontSize = formData.text_fontSize?.desktop
        title.style("font-size", text_fontSize);

    }

    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    // 7、添加 X 坐标轴
    const xName = formData.xName?.desktop
    const scaleXType = formData.scaleXType?.desktop || 'scaleLinear'
    console.log('scaleXType:', scaleXType);

    let xScale = undefined
    if ('scaleLinear' === scaleXType) {



    } else if ('scaleOrdinal' === scaleXType) {

        xScale = ad3.aScaleBand(data, xName, [0, width])

        const ticks = ad3.aTick(xScale, 'bottom')

        const xAxisAttrs = new Map<string, any>()
        // xAxisAttrs.set("class", "ala-axis")
        xAxisAttrs.set("transform", `translate(0,${height})`)

        const xAxis = ad3.aAxis(group, ticks, xAxisAttrs)

        // 轴线和刻度颜色
        // xAxis.style('color', 'red')

        // 坐标值字体样式
        xAxis.style("stroke", "blue")
        xAxis.style("font-size", "14px")
        xAxis.style("font-weight", "100")
        // 对齐方式
        xAxis.style("text-anchor", "middle")
        // xAxis.tickPadding(10)

        // 设置 轴线 样式
        xAxis.selectAll('.domain')
            .style("stroke-width", 1.5) // 轴线宽度
            .style('stroke', 'red') // 轴线颜色

        // 设置 刻度线 样式
        xAxis.selectAll('line')
        .attr('y2', -150) // 刻度线长度
            .style("stroke-width", 3.5) // 刻度线宽度
            .style('stroke', 'blue') // 刻度线颜色
            .style("stroke-dasharray", "18,20") // 虚线样式，8-虚线线段长度、2-虚线间隔
            .style("stroke-linecap", "round") // 端点样式，butt - 平直（默认值）、round - 圆形、square - 方形


        // 设置 刻度标签 样式
        xAxis.selectAll('text')
            .attr('dy', 30) //  设置 标签和轴线 间的距离
            .style('transform', 'rotate(-30deg)') //  设置 标签 旋转角度
            // .style("text-anchor", "end") // start 、 middle 、 end
            .style("text-anchor", "end") // 设置 标签 对齐方式



        // xAxis.attr("transform", "rotate(-5)")
        // xAxis.style("fill", "green")
        // xAxis.attr('dy',10)

        // 
        // xAxis.style("stroke-width", 2)

    }


    // 8、添加 Y 坐标轴
    // const yData: any[] =  [0, 30, 40, 50, 10, 20];
    const yData: any[] = Array.from(new Set(data.map((d) => d.value)));
    yData.push(0)


    const yScale = ad3.aScaleLinear(yData, [0, height], true)

    // 修改，修改，修改：只需要修改这里
    const yTicks = ad3.aTick(yScale, 'left', undefined, 2, 6, -width, 0)

    const yAxisAttrs = new Map<string, any>()
    yAxisAttrs.set("class", "ala-axis-y")
    yAxisAttrs.set("transform", `translate(0,0)`)

    const yAxis = ad3.aAxis(group, yTicks, yAxisAttrs)


    // Create line generator
    const line = d3.line<DataPoint>()
        .x(d => (xScale!(d.name) || 0) + xScale!.bandwidth() / 2)
        .y(d => yScale(d.value));

    group.append('path')
        .datum(data)
        .attr('class', 'line-path')
        .attr('fill', 'none')
        .attr('stroke', '#ef4d4b')
        .attr('opacity', '0.7')
        .attr('stroke-width', 2)
        .attr('d', line)
}



</script>

<style scoped lang="scss">
.ala-line-chart-wrapper {

    display: inline-flex;
    height: auto;
    flex-wrap: wrap;

    .title {
        display: flex;
        align-items: center;
        // justify-content: center;
        width: 100%;
        padding: 0px;
        margin: 0px;

        :deep(.icon-image) {
            margin-right: 8px;
        }
    }

    .ala-line-chart-svg {

        :deep(text) {
            // color: #ef4d4b;
            font-size: 1.2em;

        }

        :deep(.ala-axis-y) {
            path {
                stroke: none;
            }

            line {
                stroke-opacity: 0.4;
                stroke-width: 0.06em;
                stroke-dasharray: 16, 16;
            }
        }

        :deep(.line-path) {
            position: relative;
        }

    }
}
</style>