<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-25 17:52:19
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/d_d3基础示例.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <svg ref="barChart" width="600" height="400"></svg>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as d3 from 'd3';

const barChart = ref()

onMounted(() => {

    // State
    const data: any[] = [10, 20, 30, 40, 50]; // 示例数据

    const svg = d3.select(barChart.value);

    console.log('svg.attr(width):', svg.attr('width') + '1');


    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);
    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    x.domain(data.map((d, i) => i + '')); // 设置x轴的域为数据索引，你也可以使用其他方式定义域，如日期等。
    y.domain([0, d3.max(data)]); // 设置y轴的域为数据最大值。

    g.append("g") // 添加x轴的SVG组元素。
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`) // 平移以放置x轴在底部。
        .call(d3.axisBottom(x)); // 使用d3的axisBottom来创建x轴。

    g.append("g") // 添加y轴的SVG组元素。
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y)); // 使用d3的axisLeft来创建y轴。

    g.selectAll(".bar") // 选择所有条形元素。如果不存在则创建新的。
        .data(data) // 设置数据集。
        .enter().append("rect") // 对于每个数据点，添加一个矩形元素。
        .attr("class", "bar") // 设置条形的类名。
        .attr("x", (d, i) => x(i + '') + '') // 设置x位置。
        .attr("width", x.bandwidth()) // 设置条形的宽度。
        .attr("y", d => y(d)) // 设置y位置。
        .attr("height", d => height - y(d)); // 设置条形的高度。

})

// Methods

</script>

<style lang="scss">
svg {
    border: 1px solid #ccc;
    /* 为SVG添加边框 */

    .bar {
        /* 条形样式 */
        fill: rgb(239, 77, 75);
        /* 条形颜色 */
    }

    .axis {
        /* 轴样式 */
        font: 10px sans-serif;
        /* 字体大小和类型 */
    }

}
</style>