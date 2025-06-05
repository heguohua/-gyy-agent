<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-05 10:29:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/line-chart/ala-multi-line-chart.vue
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
import u from '@/utils/u';

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

// 示例数据
const data = ref<Array<DataPoint[]>>([]);

// 图标外层对象div实例
const chartWrapper = ref()
// svg图形
const chart = ref<HTMLDivElement | null>(null)

// 0、宽度、高度变化时更新图表
const dWidth = ref()
const dHeight = ref()
watch(() => props.formData, (v) => {
    nextTick(() => {
        const formData = props.formData
        // 计算svg整体宽度
        dWidth.value = +(chartWrapper.value.offsetWidth)
        // 计算svg整体高度
        // 外层div高度 - 外标题高度
        let height = +(chartWrapper.value.offsetHeight);
        height = ad3.calculateSVGHeight(height, formData);
        dHeight.value = height
        nextTick(() => {
            drawChart()
        })
    })

}, { immediate: true, deep: true })


// 1、动态设置svg图形 外部div 样式
const divStyles = computed(() => {
    const style: { [key: string]: any } = { width: '100%', height: '100%', borderRadius: props.formData.radius?.desktop }
    return style
})

// 2、动态设置 svg 图形样式
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

    // const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // 5、设置 svg 内部顶层 group 的坐标原点
    const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // 6、添加图形标题
    const mainTitleText = formData.mainTitleText?.desktop
    const freeTitle = formData.freeTitle?.desktop
    if (mainTitleText && !freeTitle) {
        // 说明用户配置了主标题
        ad3.drawMainTitle(formData, width, height, group);
    }

    // 7、添加 X 坐标轴
    const xName = formData.xName?.desktop
    const scaleXType = formData.scaleXType?.desktop || 'scaleLinear'

    let xScale = undefined
    if ('scaleLinear' === scaleXType) {

    } else if ('scaleOrdinal' === scaleXType) {
        // 以下不需要修改
        xScale = ad3.drawScaleOrdinal(formData, data.value[0], width, height, group); //  设置 标签 旋转角度
    }

    // 8、添加 Y 坐标轴
    const yName = formData.yName?.desktop
    const scaleYType = formData.scaleYType?.desktop || 'scaleLinear'

    // 组装多组 y 轴数据
    // let yData: any[] = Array.from(new Set(data.value[0].map((d: any) => d[yName])));
    const yd = new Set()
    data.value.forEach(one => {
        one.map((d: any) => d[yName]).forEach(d => yd.add(d))
    })

    let yData: any[] = Array.from(yd)


    let yScale: any = undefined
    if ('scaleLinear' === scaleYType) {
        yScale = ad3.drawScaleLinear(formData, yData, height, width, group)
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

    data.value.forEach((one, index) => {
        const line_color = formData.line_color?.desktop;
        ad3.drawLine(formData, group, one, line, line_color[index]);
    })



    // 11、添加区域图生成器
    // const addArea = formData.addArea?.desktop || false
    // const areaColor = formData.areaColor?.desktop || 'red'
    // if (addArea) {
    //     const area = d3.area<DataPoint>()
    //         .x((d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
    //         .y0(height)
    //         .y1((d: any) => yScale(d[yName]))
    //     // 设定曲线样式 
    //     ad3.curveStyle(area, line_curve_style)
    //     // 绘制面积
    //     ad3.drawArea(group, data.value[0], areaColor, area);
    // }

    // 12、设置端点样式，Circle 点和 tooltip
    // data.value.forEach(one => {
    //     ad3.drawLineCircle(formData, group,one, xScale!, yScale, chartWrapper.value);
    // })
    ad3.drawLineCircles(formData, group, data.value, xScale!, yScale, chartWrapper.value);
    // ad3.drawLineCircle(formData, group,data.value[1], xScale!, yScale, chartWrapper.value);
    // ad3.drawLineCircle(formData, group,data.value[2], xScale!, yScale, chartWrapper.value);


}

onMounted(() => {
    setInterval(() => {


        data.value = [[{ name: '一月', value: 300 }, { name: '三月', value: 210 }, { name: '五月', value: 569 }, { name: '七月', value: 183 }, { name: '九月', value: 235 }, { name: '十一月', value: 478 }]]

        data.value.push(u.randomizeProperty(data.value[0], 'value'))
        data.value.push(u.randomizeProperty(data.value[0], 'value'))
        data.value.push(u.randomizeProperty(data.value[0], 'value'))
        data.value.push(u.randomizeProperty(data.value[0], 'value'))


        drawChart()
    }, 3000);
})

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

    :deep(.ala-chart-tooltip) {
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