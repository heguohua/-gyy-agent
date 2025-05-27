<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-25 17:11:18
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-26 19:55:07
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/point/d_12_d3坐标轴_双Y轴坐标.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="chart-wrapper">
        <svg class="svg" ref="chart" width="350" height="250"></svg>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as d3 from 'd3';
import * as ad3 from '@/components/charts/utils/dChart';

const chart = ref<HTMLDivElement | null>(null)
const chart2 = ref()

onMounted(() => {

    const svg = d3.select(chart.value);

    const margin = { top: 20, right: 40, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


    // 示例数据
    const data: any[] = [{ name: '大象' }, { name: '狮子' }, { name: '老虎' }, { name: '羚羊' }, { name: '长颈鹿' }];


    const aTitleAttrs = ad3.aTitleAttrs(width)
    aTitleAttrs.set('y', 30)
    const title = ad3.aText(group, "双Y轴坐标", aTitleAttrs)
    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    const xScale = ad3.aScaleBand(data, 'name', [0, width])

    const ticks = ad3.aTick(xScale, 'bottom')

    const xAxisAttrs = new Map<string, any>()
    xAxisAttrs.set("class", "ala-axis")
    xAxisAttrs.set("transform", `translate(0,${height})`)

    const xAxis = ad3.aAxis(group, ticks, xAxisAttrs)


    // 左 Y 轴
    const yData: any[] = [0, 30, 40, 50, 10, 20];


    const yScale = ad3.aScaleLinear(yData, [0, height], true)

    // 修改，修改，修改：只需要修改这里
    const yTicks = ad3.aTick(yScale, 'left', undefined, 2, 6, -width, 0)

    const yAxisAttrs = new Map<string, any>()
    yAxisAttrs.set("class", "ala-axis-y")
    yAxisAttrs.set("transform", `translate(0,0)`)

    const yAxis = ad3.aAxis(group, yTicks, yAxisAttrs)


    // 右 Y 轴
    const y2Data: any[] = [300, 340, 750, 180, 20, 0];


    const y2Scale = ad3.aScaleLinear(y2Data, [0, height], true)

    // 修改，修改，修改：只需要修改这里
    const y2Ticks = ad3.aTick(y2Scale, 'right', undefined, 2, 6, 0, 0)

    const y2AxisAttrs = new Map<string, any>()
    y2AxisAttrs.set("class", "ala-axis-y-right")
    y2AxisAttrs.set("transform", `translate(${width},0)`)

    const y2Axis = ad3.aAxis(group, y2Ticks, y2AxisAttrs)


})

// Methods

</script>

<style scoped lang="scss">
.chart-wrapper {
    display: inline-flex;

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

        :deep(.ala-axis-y-right) {
            float: right;

            path {
                stroke: none;
            }

            line {
                stroke-opacity: 0.4;
                stroke-width: 0.06em;
                stroke-dasharray: 16, 16;
            }
        }

    }
}
</style>