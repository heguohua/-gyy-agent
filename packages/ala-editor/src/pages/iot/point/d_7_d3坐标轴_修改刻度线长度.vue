<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-26 18:40:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/d_7_d3坐标轴_修改刻度线长度.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <svg class="svg" ref="chart" width="350" height="250"></svg>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as d3 from 'd3';
import * as ad3 from '@/components/charts/utils/dChart';

const chart = ref()

onMounted(() => {

    const svg = d3.select(chart.value);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


    // 示例数据
    const data: any[] = [0, 30, 40, 50, 10, 20];


    const aTitleAttrs = ad3.aTitleAttrs(width)
    aTitleAttrs.set('y', 30)
    const title = ad3.aText(group, "修改刻度线长度、内外间距", aTitleAttrs)
    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    const xScale = ad3.aScaleLinear(data, [0, width])

    // 修改，修改，修改： 这里添加 最后一个 参数
    const ticks = ad3.aTick(xScale, 'bottom', undefined, 18, 10, 8, 30)

    console.log('ticks:',ticks.tickSize());
    console.log('ticks:',ticks.tickPadding());
    


    const xAxisAttrs = new Map<string, any>()
    xAxisAttrs.set("class", "ala-axis")
    xAxisAttrs.set("transform", `translate(0,${height})`)

    const xAxis = ad3.aAxis(group, ticks, xAxisAttrs)






})

// Methods

</script>

<style scoped lang="scss">
.svg {

    margin-right: 6px;
    background: #fff;
    border-radius: 4px;


}
</style>