<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-26 18:45:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/d_8_d3坐标轴_坐标轴样式.vue
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
    const data: any[] = [{ name: '大象' }, { name: '狮子' }, { name: '老虎' }, { name: '蚂蚁' }, { name: '长颈鹿' }];


    const aTitleAttrs = ad3.aTitleAttrs(width)
    aTitleAttrs.set('y', 30)
    const title = ad3.aText(group, "带状坐标", aTitleAttrs)
    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    const xScale = ad3.aScaleBand(data, 'name', [0, 300])

    const ticks = ad3.aTick(xScale, 'bottom')

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


    // :deep(path) {
    //     stroke: var(--el-color-primary);
    // }

    // :deep(line) {
    //     stroke: red;
    // }

    :deep(text) {
        color: #ef4d4b;
        font-size: 1.4em;

    }

}
</style>