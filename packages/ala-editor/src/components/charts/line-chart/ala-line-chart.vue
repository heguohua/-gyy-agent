<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-31 20:23:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/line-chart/ala-line-chart.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- <div class="ala-line-chart-wrapper" :style="{ width: width, height: height }" ref="chartWrapper"> -->
    <div class="ala-line-chart-wrapper"
        :style="{ width: '100%', height: '100%', borderRadius: formData.radius?.desktop, }" ref="chartWrapper">
        <!-- <e-charts class="chart" :option="option" ref="chart" /> -->
        <svg class="ala-line-chart-svg" ref="chart" :width="dWidth" :height="dHeight"></svg>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { useEditorStore } from '@/store/useEditorStore';
const editorStore = useEditorStore()

interface Title {
    mainTitle: string,
}
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



// 创建一个 ResizeObserver 实例
// const resizeObserver = new ResizeObserver((entries) => {
//     for (let entry of entries) {
//         const { width: newWidth, height: newHeight } = entry.contentRect;
//         lWidth.value = newWidth; // 更新宽度
//         lHeight.value = newHeight; // 更新高度
//         console.log(`宽度: ${newWidth}, 高度: ${newHeight}`);
//         chart.value.resize()
//     }
// });


const model = defineModel({
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback', "init"])

const handleChange = (value: string) => {
    model.value = value
}

// Methods

logger.info(`bType[ ${props.bType} ]，动态渲染 ala-line-chart 组件，props：`, props);



const dWidth = ref()
const dHeight = ref()
watch(() => props.formData, (v) => {
    nextTick(() => {
        dWidth.value = +(chartWrapper.value.offsetWidth)
        dHeight.value = +(chartWrapper.value.offsetHeight)
        console.log('dWidth.value ----> :', dWidth.value);
        console.log('dHeight.value ----> :', dHeight.value);
        nextTick(()=>{
            drawChart()
        })
    })

}, { immediate: true, deep: true })

// watch(() => props.formData.height.desktop, (v) => {
//     nextTick(() => {
//         dHeight.value = +(chartWrapper.value.offsetHeight)
//         console.log('dHeight.value ----> :', dHeight.value);
//         drawChart()
//     })
// }, { immediate: true, deep: true })

// const option = computed(() => {
// const op = {
//     title: {
//         text: props.text_text ? props.text_text : '',
//         text_link: props.text_link ? props.text_link : '',
//         subtext: props.text_subtext ? props.text_subtext : '',
//         left: props.text_left ? props.text_left : '',
//         top: props.text_top ? props.text_top : '',
//         itemGap: props.text_itemGap ? props.text_itemGap : '',
//         padding: props.text_padding ? props.text_padding : '',
//         backgroundColor: props.text_backgroundColor ? props.text_backgroundColor : '',
//         borderRadius: props.text_borderRadius ? props.text_borderRadius : '',
//         textStyle: {
//             color: props.text_color ? props.text_color : '',
//             fontStyle: props.text_fontStyle ? props.text_fontStyle : '',
//             text_fontWeight: props.text_fontWeight ? props.text_fontWeight : '',
//             fontSize: props.text_fontSize ? props.text_fontSize : '',
//             lineHeight: props.text_lineHeight ? props.text_lineHeight : '',
//             textAlign: 'center',
//             textVerticalAlign: props.text_textVerticalAlign ? props.text_textVerticalAlign : '',
//             width: props.text_width ? props.text_width : '',
//             height: props.text_height ? props.text_height : '',
//             overflow: props.text_overflow ? props.text_overflow : '',
//         },
//         subtextStyle: {
//             color: props.sub_text_color ? props.sub_text_color : '',
//             fontStyle: props.sub_text_fontStyle ? props.sub_text_fontStyle : '',
//             fontWeight: props.sub_text_fontWeight ? props.sub_text_fontWeight : '',
//             fontSize: props.sub_text_fontSize ? props.sub_text_fontSize : '',
//             lineHeight: props.sub_text_lineHeight ? props.sub_text_lineHeight : '',
//             textAlign: props.sub_text_textAlign ? props.sub_text_textAlign : '',
//             verticalAlign: props.sub_verticalAlign ? props.sub_verticalAlign : '',
//             width: props.sub_text_width ? props.sub_text_width : '',
//             height: props.sub_text_height ? props.sub_text_height : '',
//             overflow: props.sub_text_overflow ? props.sub_text_overflow : '',
//         }
//     },
//     xAxis: {
//         type: 'category',
//         data: props.xAxisData,
//     },
//     yAxis: {
//         type: 'value',
//     },
//     series: [
//         {
//             data: props.seriesData,
//             type: 'line',
//             lineStyle: {
//                 color: "blue",
//                 width: 6,
//                 type: 'dashed',
//                 cap: 'round',
//                 opacity: 0.2
//             },
//             itemStyle: {
//                 color: props.itemStyle_color ? props.itemStyle_color : '',
//                 borderType: props.itemStyle_borderType ? props.itemStyle_borderType : '',
//                 borderCap: props.itemStyle_borderCap ? props.itemStyle_borderCap : '',
//                 opacity: props.itemStyle_opacity ? props.itemStyle_opacity : '',
//             },
//             label: {
//                 show: true,
//                 position: 'bottom',
//                 distance: 20,
//                 rotate: 20,
//                 textStyle: {
//                     fontSize: 20,
//                     color: 'red',
//                     fontWeight: '100'

//                 }
//             }
//         },
//     ],
// }
//     return op;
// });
// console.log('option', option.value);

// 图标外层对象div实例
const chartWrapper = ref()

// 图标 echarts 实例
// const chart = ref<any>()

// 在组件挂载时添加观察器
onMounted(() => {
    // if (chartWrapper.value) {
    //     resizeObserver.observe(chartWrapper.value);
    // }
});

// 在组件卸载时移除观察器
onUnmounted(() => {
    // if (chartWrapper.value) {
    //     resizeObserver.unobserve(chartWrapper.value);
    // }
    // if (chart.value) {
    //     chart.value.dispose()
    // }
});
// watch(() => editorStore.pageConfig[props.bType].formData?.width, (newValue) => {
//     console.log('newValue:', newValue);

//     // chart.value.resize()
// }, {
//     immediate: true,
//     deep: true
// })

// // 发送组件初始化消息
// if (props.bType === 'page') {


// 组件挂载后再发送初始化消息
// watch(() => props.currentId, () => {
//     logger.info(`向 editor-render-drag-form 组件【 发送初始化消息 】，当前组件 id[ ${props.currentId} ]`);

//     emit('init', {
//         pid: null,
//         block: props.block,
//     })
// }, {
//     immediate: true
// })
// }


// watch(
//     () => [props.xAxisData, props.seriesData],
//     () => {
//         initChart();
//     },
//     { deep: true }
// );


import * as d3 from 'd3';
import * as ad3 from '@/components/charts/utils/dChart';

const chart = ref<HTMLDivElement | null>(null)

interface DataPoint {
    name: string
    value: number
}

// onMounted(() => {
//     drawChart()
// })

const drawChart = () => {
    const svg = d3.select(chart.value);
    // 清除原有的图形元素，例如路径、圆、文本等
    svg.selectAll("*").remove();

    // console.log('width ---> :', width.v);
    console.log('svg.attr("width") ---> :', svg.attr("width"));
    console.log('svg.attr("height") ---> :', svg.attr("height"));


    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    // const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


    // 示例数据
    const data: DataPoint[] = [{ name: '一月', value: 300 }, { name: '三月', value: 210 }, { name: '五月', value: 567 }, { name: '七月', value: 183 }, { name: '九月', value: 235 }, { name: '十一月', value: 478 }];


    const aTitleAttrs = ad3.aTitleAttrs(width)
    aTitleAttrs.set('y', 30)
    const title = ad3.aText(group, "基础折线图", aTitleAttrs)
    // 添加文本后再次修改文本样式
    // title.attr("fill", '#ef4d4b')

    const xScale = ad3.aScaleBand(data, 'name', [0, width])

    const ticks = ad3.aTick(xScale, 'bottom')

    const xAxisAttrs = new Map<string, any>()
    xAxisAttrs.set("class", "ala-axis")
    xAxisAttrs.set("transform", `translate(0,${height})`)

    const xAxis = ad3.aAxis(group, ticks, xAxisAttrs)


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
        .x(d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
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

    .ala-line-chart-svg {

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