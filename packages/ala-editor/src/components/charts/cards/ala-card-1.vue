<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-01 16:37:50
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/cards/ala-card-1.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-card-chart-wrapper" :style="divStyles" ref="chartWrapper">

        <div class="icon" :style="iconStyles">
            <VIcon v-if="formData.icon?.desktop" :image="'/bi/' + formData.icon?.desktop"
                :width="formData.icon_width?.desktop + 'px'" :height="formData.icon_height?.desktop + 'px'" />
        </div>

        <div class="quota">

            <div class="title" :style="titleStyles">
                {{ formData.mainTitleText?.desktop }}（{{ props.formData.unit?.desktop }}）
            </div>

            <div class="value" :style="valueStyles">
                {{ value }}
            </div>

        </div>

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
logger.info(`bType[ ${props.bType} ]，动态渲染 ala-card-chart 组件，props：`, props);

// 示例数据
const data = ref<DataPoint[]>([]);
const value = ref(0)
const demoData = [{ name: '一月', value: 300 }, { name: '三月', value: 210 }, { name: '五月', value: 569 }, { name: '七月', value: 183 }, { name: '九月', value: 235 }, { name: '十一月', value: 478 }]

// 图标外层对象div实例
const chartWrapper = ref()
// svg图形

// 0、宽度、高度变化时更新图表
const dWidth = ref()
const dHeight = ref()
watch(() => props.formData, (v) => {
    nextTick(() => {
        drawChart()
    })

}, { immediate: true, deep: true })


// 1、动态设置svg图形 外部div 样式
const divStyles = computed(() => {
    const background = props.formData.backgroundColor?.desktop || '#fff'
    const style: { [key: string]: any } = { width: '100%', height: '100%', borderRadius: props.formData.radius?.desktop, background }
    const position = props.formData.icon_position?.desktop || 'left'
    if (position === 'right') {
        style.flexDirection = 'row-reverse';
    } else if (position === 'top') {
        style.flexDirection = 'column'
    }

    return style
})

const iconStyles = computed(() => {
    const background = props.formData.icon_background?.desktop || '#fff'
    const background_radius = props.formData.icon_background_radius?.desktop || 0

    const style: { [key: string]: any } = { borderRadius: background_radius + '%', background, boxShadow: background + ' 0px 0px 10px 5px' }

    return style
})


// 3、计算外部标题的样式
const titleStyles = computed(() => {

    const formData = props.formData

    let color = formData.text_color?.desktop || colors.alaRed
    let fontSize = (formData.text_fontSize?.desktop || 32) + 'px'
    let fontWeight = formData.text_fontWeight?.desktop || 400
    let marginTop = formData.text_top?.desktop || '0px'
    let marginLeft = formData.text_left?.desktop || '0px'

    let style: { [key: string]: any } = {
        color,
        fontSize: fontSize,
        fontWeight,
        marginTop,
        marginLeft,
        lineHeight: fontSize
    }
    return style
})
const valueStyles = computed(() => {

    const formData = props.formData

    let color = formData.value_color?.desktop || colors.alaRed
    let fontSize = (formData.value_fontSize?.desktop || 32) + 'px'
    let fontWeight = formData.value_fontWeight?.desktop || 400
    let marginTop = formData.value_top?.desktop || '0px'
    let marginLeft = formData.value_left?.desktop || '0px'

    let style: { [key: string]: any } = {
        color,
        fontSize: fontSize,
        marginTop,
        marginLeft,
        fontWeight,
        lineHeight: fontSize
    }


    return style
})

// 4、绘制图形
const drawChart = () => {


    const formData = props.formData

    // 1、查找 svg 图形组件

    // 2、清除原有的图形元素，例如路径、圆、文本等

    // 3、计算 svg 图形内边距信息
    const margin = {
        top: formData.top?.desktop,
        bottom: formData.bottom?.desktop,
        left: formData.left?.desktop,
        right: formData.right?.desktop,
    };


}


const query = () => {
    // Methods
    const url = '/b/datasetTable/query'

    let dataSetId = props.formData.dataSetId?.desktop || {}
    let params = { id: dataSetId }


    logger.info(`从 api 图标数据，url【 ${url} 】，查询参数：`, params);

    alaPost(u.url(url), params, false, '').then((response: any) => {

        const d = response.data?.data
        const yName = props.formData.yName.desktop

        if (d) {
            const yDecimalNum = props.formData.yDecimalNum?.desktop || 0
            const dd = u.convertPropertyToNumber(d, yName, yDecimalNum)
            data.value = dd as any
            u.animateNumber({
                from: 0,
                to: dd[0][yName],
                onUpdate: val => {
                    // 把 val 直接写到页面
                    value.value = Number(val)
                },
                duration: 1000
            })
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
        let newData: Array<any> = u.randomizeProperty(demoData, 'value')
        // const yName = props.formData.yName.desktop
        // if (xName != 'name') {
        //     newData = u.renameKeyInArray(newData, 'name', xName)
        // }
        // if (yName != 'value') {
        //     newData = u.renameKeyInArray(newData, 'value', yName)
        // }
        data.value = newData
        drawChart()
    }

}




</script>

<style scoped lang="scss">
.ala-card-chart-wrapper {

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        order: 1;
    }

    .quota {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 60%;
        padding-left: 10px;
        order: 2;

        .title,
        .value {
            width: 100%;
            text-align: left;
            ;
        }


    }


}
</style>