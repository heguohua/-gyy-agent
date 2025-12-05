<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-15 15:31:25
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/bar-chart/ala-bar-chart.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-bar-chart-wrapper" :style="divStyles" ref="chartWrapper">
        <div v-if="formData.freeTitle?.desktop" class="title" :style="titleStyles">
            <VIcon v-if="formData.freeTitleIcon?.desktop" :image="'/bi/' + formData.freeTitleIcon?.desktop"
                :width="formData.text_fontSize?.desktop + 'px'" :height="formData.text_fontSize?.desktop + 'px'" />
            {{ formData.mainTitleText?.desktop }}
        </div>
        <svg class="ala-bar-chart-svg" ref="chart" :width="dWidth" :height="dHeight" :style="svgStyle"></svg>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import * as d3 from 'd3';
import DataPoint, * as ad3 from '@/components/charts/utils/dChart';
import u from '@/utils/u';
import { alaPost } from '@/utils/req';
import colors from '@/utils/colors';

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
logger.info(`bType[ ${props.bType} ]，动态渲染 ala-bar-chart 组件，props：`, props);

// 示例数据
const data = ref<DataPoint[]>([]);
const demoData = [{ name: '一月', value: 300, category: '服装鞋帽' }, { name: '三月', value: 210, category: '服装鞋帽' }, { name: '五月', value: 569, category: '服装鞋帽' }, { name: '七月', value: 183, category: '服装鞋帽' }, { name: '九月', value: 235, category: '服装鞋帽' }, { name: '十一月', value: 478, category: '服装鞋帽' }]

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


    if (svg.empty()) {
        logger.error('svg为空')
        return
    }
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
        xScale = ad3.drawScaleOrdinal(formData, data.value, width, height, group); //  设置 标签 旋转角度
    }

    // 8、添加 Y 坐标轴
    const yName = formData.yName?.desktop
    const scaleYType = formData.scaleYType?.desktop || 'scaleLinear'

    // 组装多组 y 轴数据
    // const yDecimalNum = formData.yDecimalNum?.desktop;
    let yData: any[] = Array.from(new Set(data.value.map((d: any) => d[yName])));
    // let yData: any[] = [];
    // const maxValue = d3.max(data.value, (d: any) => d[yName])
    // const minValue = d3.min(data.value, (d: any) => d[yName])

    // yData.push(minValue)
    // yData.push(maxValue)
    // const yDecimalNum = formData.yDecimalNum?.desktop;

    // const num = 5
    // const levelNum = num - 2
    // const v = (maxValue - minValue) / levelNum
    // for (let i = 1; i <= levelNum; i++) {
    //     yData.push(minValue + v * i)
    // }




    let yScale: any = undefined
    if ('scaleLinear' === scaleYType) {
        yScale = ad3.drawScaleLinear(formData, yData, height, width, group)

    } else if ('scaleOrdinal' === scaleYType) {

    }


    const fillColor = formData.bar_color?.desktop || 'red';
    ad3.drawBar(formData, group, height, data.value, fillColor, xScale!, yScale, chartWrapper, chart.value);



    // // 9、创建 折线 生成器
    // const line = d3.line<DataPoint>()
    //     .x((d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
    //     .y((d: any) => yScale(d[yName]));
    // const line_curve_style = formData.line_curve_style?.desktop || 'curveLinear'
    // // 设定曲线样式
    // ad3.curveStyle(line, line_curve_style)

    // // 10、绘制折线
    // ad3.drawLine(formData, group, data.value, line, line_color);

    // // 11、添加区域图生成器
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
    //     ad3.drawArea(group, data.value, areaColor, area);
    // }

    // 12、设置端点样式，Circle 点和 tooltip
    // ad3.drawLineCircle(formData, group, data.value, xScale!, yScale, chartWrapper.value);

    // 绘制数据标签文本
    const addLineLabel = formData.addLineLabel?.desktop || false;
    if (addLineLabel) {
        // ad3.drawLineCircle(formData, group, data.value, xScale!, yScale, chartWrapper.value);
        ad3.drawLineLabel(formData, group, data.value, xScale!, yScale, chartWrapper.value);
    }

}


const query = () => {
    // Methods
    const url = '/b/datasetTable/query'

    let dataSetId = props.formData.dataSetId?.desktop || {}
    let data_reversed = props.formData.data_reversed?.desktop || false
    let params = { id: dataSetId }


    logger.info(`从 api 图标数据，url【 ${url} 】，查询参数：`, params);

    alaPost(u.url(url), params, false, '').then((response: any) => {

        let d = response.data?.data
        const yName = props.formData.yName.desktop

        if (d) {
            if (data_reversed) {
                d = u.reverseInPlace(d)
            }
            const yDecimalNum = props.formData.yDecimalNum?.desktop || 0
            const dd = u.convertPropertyToNumber(d, yName, yDecimalNum)
            data.value = dd as any
            drawChart()

        }


    });
}

let timerId: number
// 开启数据请求
onMounted(() => {

    // 第一次加载数据
    queryDataAndDrawChart()

    // 定时刷新数据
    const intervals = props.formData.data_time.desktop || 5000

    timerId = window.setInterval(() => {
        queryDataAndDrawChart()
    }, intervals);

})

onUnmounted(() => {
    if (timerId) {
        logger.info(`即将清除id为【 ${timerId} 】的定时器`)
        clearInterval(timerId);
    }
})

const queryDataAndDrawChart = () => {

    const data_request_enabled = props.formData.data_request_enabled.desktop || false

    if (data_request_enabled) {
        // 调用 api 接口加载数据
        data.value = []
        query()

    } else {
        // 使用模拟数据
        const yDecimalNum = props.formData.yDecimalNum?.desktop || 0
        let newData: Array<any> = u.randomizeProperty(demoData, 'value', yDecimalNum)
        const xName = props.formData.xName.desktop
        const yName = props.formData.yName.desktop
        if (xName != 'name') {
            newData = u.renameKeyInArray(newData, 'name', xName)
        }
        if (yName != 'value') {
            newData = u.renameKeyInArray(newData, 'value', yName)
        }
        data.value = newData


        drawChart()
    }

}

</script>

<style scoped lang="scss">
.ala-bar-chart-wrapper {

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