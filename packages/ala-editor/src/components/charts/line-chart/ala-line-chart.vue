<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-04 10:32:44
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
import DataPoint, * as ad3 from '@/components/charts/utils/dChart';

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
            const newHeight = height - (text_fontSize + ad3.calculateValue(height, text_top) + ad3.calculateValue(height, text_bottom))
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

    const formData = props.formData

    const mainTitleText = formData.mainTitleText?.desktop
    const freeTitle = formData.freeTitle?.desktop

    let style: { [key: string]: any } = {}

    if (mainTitleText && freeTitle) {
        style = ad3.mainTitleCssStyle(formData)
    }

    return style
})

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
        ad3.drawMainTitle(formData, width, height, group);
    }

    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    // 7、添加 X 坐标轴
    const xName = formData.xName?.desktop
    const scaleXType = formData.scaleXType?.desktop || 'scaleLinear'

    let xScale = undefined
    if ('scaleLinear' === scaleXType) {

    } else if ('scaleOrdinal' === scaleXType) {
        // 以下不需要修改
        xScale = ad3.drawScaleOrdinal(formData, data, xName, width, height, group); //  设置 标签 旋转角度
    }

    // 8、添加 Y 坐标轴
    // const yData: any[] =  [0, 30, 40, 50, 10, 20];
    const yName = formData.yName?.desktop
    const scaleYType = formData.scaleYType?.desktop || 'scaleLinear'

    let yScale: any = undefined

    if ('scaleLinear' === scaleYType) {
        yScale = ad3.drawScaleLinear(formData, data, yName, height, width, group);
    } else if ('scaleOrdinal' === scaleYType) {

    }

    // 9、创建 折线 生成器
    const line = d3.line<DataPoint>()
        .x((d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
        .y((d: any) => yScale(d[yName]));
    const line_curve_style = formData.line_curve_style?.desktop || 'curveLinear'
    // 设定曲线样式
    ad3.curveStyle(line, line_curve_style)

    // 10、绘制折线
    const line_color = ad3.drawLine(formData, group, data, line);

    // 11、添加区域图生成器
    const addArea = formData.addArea?.desktop || false
    const areaColor = formData.areaColor?.desktop || 'red'
    if (addArea) {

        const area = d3.area<DataPoint>()
            .x((d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
            .y0(height)
            .y1((d: any) => yScale(d[yName]))

        // 设定曲线样式 
        ad3.curveStyle(area, line_curve_style)
        // 绘制面积
        ad3.drawArea(group, data, areaColor, area);

    }

    // 12、设置端点样式
    const line_inflection_point = formData.line_inflection_point?.desktop || 0
    const line_inflection_color = formData.line_inflection_color?.desktop || 'red'
    const y_label_unit = formData.y_label_unit?.desktop || ''

    // Circle 点和 tooltip
    const tooltip = d3.select(chartWrapper.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

    group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
        .attr('cy', (d: any) => yScale(d[yName]))
        .attr('r', line_inflection_point)
        .attr('fill', line_inflection_color)
        .on('mouseover', (event, d: any) => {

            // 添加 tooltip
            tooltip.html(`
                <div class='tooltip-title' style='color:${line_color}'>${d[xName]}</div>
                <div class='tooltip-row'>
                    <p class='category'>值：</p>
                    <p class='value-wrapper'>
                        <i class='value' style='color:${line_color}'>${d[yName]}</i>
                        <i class='unit'>${y_label_unit}</i>
                    </p>
                </div>
                
            `)
                .style('left', `${event.offsetX + 10}px`)
                .style('top', `${event.offsetY - 28}px`)

            // 显示 tooltip
            tooltip.transition().duration(200).style('opacity', 1)

            // 鼠标悬停时扩大半径
            d3.select(event.target)
                .transition()
                .duration(200) // 动画过渡时间
                .attr('r', line_inflection_point * 1.5); // 半径扩大到原来的 1.5 倍（假设初始半径为4）

        })
        .on('mouseout', (event, d: any) => {

            // 隐藏 tooltip
            tooltip.transition().duration(500).style('opacity', 0)

            // 鼠标悬停时扩大半径
            d3.select(event.target)
                .transition()
                .duration(100) // 动画过渡时间
                .attr('r', line_inflection_point); // 半径扩大到原来的 1.5 倍（假设初始半径为4）
        })

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

    :deep(.tooltip) {
        position: absolute;
        text-align: center;
        padding: 1rem;
        background: rgb(255, 255, 255);
        box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.2);
        font-size: 12px;
        pointer-events: none;
        z-index: 10;
        border-radius: 4px;

        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;

        .tooltip-title {
            width: 100%;
            display: flex;
            font-size: 1.2rem;
            line-height: 1.2rem;
            padding-bottom: 0.5rem;
        }

        .tooltip-row {
            width: 100%;
            display: flex;
            line-height: 1.3rem;

            .category {
                font-size: 1rem;
            }

            .value-wrapper {
                font-size: 1rem;
                display: flex;

                i {
                    display: flex;
                    flex-wrap: nowrap;
                }

                .value {
                    font-weight: bold;
                    font-size: 1.2rem;
                }

                .unit {
                    margin-left: 0.2rem;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>