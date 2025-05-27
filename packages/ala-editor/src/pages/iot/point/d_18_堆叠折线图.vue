<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-27 16:31:50
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/d_18_堆叠折线图.vue
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
import u from '@/utils/u';

const chart = ref<HTMLDivElement | null>(null)
const chartWrapper = ref<HTMLDivElement | null>(null)

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
    const data: DataPoint[] = [{ name: '一月', value: 300 }, { name: '三月', value: 310 }, { name: '五月', value: 567 }, { name: '七月', value: 150 }, { name: '九月', value: 235 }, { name: '十一月', value: 378 }];

    const data2: DataPoint[] = [{ name: '一月', value: 210 }, { name: '三月', value: 380 }, { name: '五月', value: 500 }, { name: '七月', value: 178 }, { name: '九月', value: 535 }, { name: '十一月', value: 478 }];

    const data3: DataPoint[] = [{ name: '一月', value: 190 }, { name: '三月', value: 156 }, { name: '五月', value: 520 }, { name: '七月', value: 193 }, { name: '九月', value: 335 }, { name: '十一月', value: 578 }];


    // 将 data 中的数据加到data2 中 形成新的 data22 
    const dataMap = u.array2Map(data, 'name')

    const data22 = u.clonedAny(data2)
    data22.forEach(d22 => {
        const name = d22.name
        const value = dataMap.get(name)
        if (value) {
            d22.value += value.value
        }
    })


    // 将 data 中的数据加到data2 中 形成新的 data22 
    const data22Map = u.array2Map(data22, 'name')

    const data33 = u.clonedAny(data3)
    data33.forEach(d => {
        const name = d.name
        const value = data22Map.get(name)
        if (value) {
            d.value += value.value
        }
    })


    const aTitleAttrs = ad3.aTitleAttrs(width)
    aTitleAttrs.set('y', 30)
    const title = ad3.aText(group, "多条折线图", aTitleAttrs)
    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    const xScale = ad3.aScaleBand(data, 'name', [0, width])

    const ticks = ad3.aTick(xScale, 'bottom')

    const xAxisAttrs = new Map<string, any>()
    xAxisAttrs.set("class", "ala-axis")
    xAxisAttrs.set("transform", `translate(0,${height})`)

    const xAxis = ad3.aAxis(group, ticks, xAxisAttrs)


    // const yData: any[] =  [0, 30, 40, 50, 10, 20];
    const yData: any[] = Array.from(new Set(data33.map((d) => d.value)));
    yData.push(0)


    const yScale = ad3.aScaleLinear(yData, [0, height], true)

    const yTicks = ad3.aTick(yScale, 'left', undefined, 2, 6, -width, 0)

    const yAxisAttrs = new Map<string, any>()
    yAxisAttrs.set("class", "ala-axis-y")
    yAxisAttrs.set("transform", `translate(0,0)`)

    const yAxis = ad3.aAxis(group, yTicks, yAxisAttrs)


    // Create line generator
    const line = d3.line<DataPoint>()
        .x(d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
        .y(d => yScale(d.value))
        // 修改，修改，修改
        .curve(d3.curveMonotoneX); // 使用平滑曲线

    // d3.curveLinear: 直线（默认值）。
    // d3.curveMonotoneX: X 轴方向的平滑曲线（适合大多数折线图的平滑效果）。
    // d3.curveMonotoneY: Y 轴方向的平滑曲线。
    // d3.curveBasis: 基于控制点的 B 样条曲线。
    // d3.curveCardinal: 基于张力参数的曲线。
    // d3.curveCatmullRom: Catmull-Rom 样条曲线。

    group.append('path')
        .datum(data)
        .attr('class', 'line-path')
        .attr('fill', 'none')
        .attr('stroke', '#ef4d4b')
        .attr('opacity', '0.7')
        .attr('stroke-width', 2)
        .attr('d', line)


    group.append('path')
        .datum(data22)
        .attr('class', 'line-path')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('opacity', '0.7')
        .attr('stroke-width', 2)
        .attr('d', line)


    group.append('path')
        .datum(data33)
        .attr('class', 'line-path')
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('opacity', '0.7')
        .attr('stroke-width', 2)
        .attr('d', line)
        

    // Circle 点和 tooltip
    const tooltip = d3.select(chartWrapper.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

    group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
        .attr('cy', d => yScale(d.value))
        .attr('r', 4)
        .attr('fill', 'steelblue')
        .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip.html(`${d.name}<br/>值: ${d.value}`)
                .style('left', `${event.offsetX + 10}px`)
                .style('top', `${event.offsetY - 28}px`)

            // 修改，修改，修改
            // 鼠标悬停时扩大半径
            d3.select(event.target)
                .transition()
                .duration(200) // 动画过渡时间
                .attr('r', 6); // 半径扩大到原来的 1.5 倍（假设初始半径为4）

        })
        .on('mouseout', (event, d) => {
            tooltip.transition().duration(500).style('opacity', 0)

            // 修改，修改，修改
            // 鼠标悬停时扩大半径
            d3.select(event.target)
                .transition()
                .duration(200) // 动画过渡时间
                .attr('r', 4); // 半径扩大到原来的 1.5 倍（ 假设初始半径为4 ）

        })
        
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

        :deep(text) {
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


        // :deep(circle){
        //     position: absolute;
        //     &:hover{
        //         transform: scale(1.5);
        //     }
        // }


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