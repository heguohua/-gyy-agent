<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-30 11:11:07
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/d_221_基础条形图.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="chart-wrapper" ref="chartWrapper">
        <svg class="svg" ref="chart" width="350" height="250"></svg>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as d3 from 'd3';
import * as ad3 from '@/components/charts/utils/dChart';
import colors from '@/utils/colors';

const chart = ref<HTMLDivElement | null>(null)
const chartWrapper = ref()

interface DataPoint {
    name: string
    value: number
}

onMounted(() => {

    const svg = d3.select(chart.value);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    // const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


    // 示例数据
    const data: DataPoint[] = [{ name: '一月', value: 130 }, { name: '三月', value: 310 }, { name: '五月', value: 56 }, { name: '七月', value: 183 }, { name: '九月', value: 235 }, { name: '十一月', value: 478 }];


    const aTitleAttrs = ad3.aTitleAttrs(width)
    aTitleAttrs.set('y', 30)
    const title = ad3.aText(group, "基础条形图", aTitleAttrs)
    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    const yScale = ad3.aScaleBand(data, 'name', [0, height])
    // yScale.padding(0.4) // 控制柱形条之间的间距

    const ticks = ad3.aTick(yScale, 'left')

    const yAxisAttrs = new Map<string, any>()
    yAxisAttrs.set("class", "ala-axis-y")
    // xAxisAttrs.set("transform", `translate(0,${height})`)
    yAxisAttrs.set("transform", `translate(0,0)`)

    const xAxis = ad3.aAxis(group, ticks, yAxisAttrs)


    // const yData: any[] =  [0, 30, 40, 50, 10, 20];
    const yData: any[] = Array.from(new Set(data.map((d) => d.value)));
    yData.push(0)


    const xScale = ad3.aScaleLinear(yData, [0, width], false)

    // 修改，修改，修改：只需要修改这里
    const xTicks = ad3.aTick(xScale, 'bottom', undefined, 2, 6, 2, 2)

    const xAxisAttrs = new Map<string, any>()
    xAxisAttrs.set("class", "ala-axis")
    xAxisAttrs.set("transform", `translate(0,${height})`)

    const yAxis = ad3.aAxis(group, xTicks, xAxisAttrs)



    // Create line generator
    const line = d3.line<DataPoint>()
        .x(d => xScale(d.value))
        .y(d => (yScale(d.name) || 0) + yScale.bandwidth() / 2);

    const tooltip = d3.select(chartWrapper.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

    // 绘制柱子
    group.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')

        // .attr('x', d => (yScale(d.name) || 0))
        // .attr('width', yScale.bandwidth())
        // .attr('y', height) // 初始高度为底部，用于动画
        // .attr('height', 0)

        .attr('y', d => (yScale(d.name) || 0))
        .attr('height', yScale.bandwidth())
        // .attr('x', d => (yScale(d.name) || 0)) // 初始高度为底部，用于动画
        // .attr('width', 0)

        .attr('name', d => d.name)


        .attr('fill', colors.chartColors[5])
        .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip.html(`${d.name}<br/>值: ${d.value}`)
                .style('left', `${event.offsetX + 10}px`)
                .style('top', `${event.offsetY - 28}px`)
        })
        .on('mouseout', () => {
            tooltip.transition().duration(300).style('opacity', 0)
        })
        .transition()
        .duration(800)
        // .attr('x', d => xScale(d.value))
        // .attr('height', d => height - xScale(d.value))
        .attr('x', d => xScale(d.value))
        .attr('width', d => width - xScale(d.value))




})

// Methods

</script>

<style scoped lang="scss">
.chart-wrapper {
    display: inline-flex;
    position: relative;

    .svg {

        margin-right: 6px;
        background: #fff;
        border-radius: 4px;


        // :deep(path) {
        //     stroke: var(--el-color-primary);
        // }

        // :deep(line) {
        //     stroke: red;
        // }

        :deep(text) {
            // color: #ef4d4b;
            font-size: 1.2em;

        }

        :deep(.ala-axis-y) {
            path {
                //stroke: none;
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

    :deep(.tooltip) {
        position: absolute;
        text-align: center;
        padding: 6px 8px;
        background: rgb(255, 1, 1);
        border: 1px solid #ccc;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        font-size: 12px;
        pointer-events: none;
        z-index: 10;
        border-radius: 4px;
        color: #fff;
    }
}
</style>