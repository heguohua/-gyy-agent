<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-13 15:48:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/line-chart/ala-line-chart.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-line-chart-wrapper" :style="{ width: '100%', height: '200px' }">
        <e-charts class="chart" :option="option" />
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';

interface Title {
    mainTitle: string,
}
// State
const props = defineProps({
    // 主标题
    text_text: {
        type: String,
        default: ''
    },
    text_link: {
        type: String,
        default: ''
    },
    text_color: {
        type: String,
        default: ''
    },
    text_fontStyle: {
        type: String,
        default: ''
    },
    text_fontWeight: {
        type: String,
        default: ''
    },
    text_fontSize: {
        type: Number,
        default: 10
    },
    text_left: {
        type: Number,
        default: 10
    },
    text_top: {
        type: Number,
        default: 10
    },
    text_padding: {
        type: Number,
        default: 10
    },
    text_borderRadius: {
        type: Number,
        default: 0
    },
    text_width: {
        type: Number,
        default: 10
    },
    text_height: {
        type: Number,
        default: 10
    },
    text_overflow: {
        type: String,
        default: ''
    },
    text_backgroundColor: {
        type: String,
        default: ''
    },
    text_lineHeight: {
        type: Number,
        default: 10
    },
    text_textAlign: {
        type: String,
        default: ''
    },
    text_textVerticalAlign: {
        type: String,
        default: ''
    },
    text_itemGap: {
        type: Number,
        default: 0
    },
    // 副标题
    text_subtext: {
        type: String,
        default: ''
    },
    sub_text_color: {
        type: String,
        default: ''
    },
    sub_text_fontStyle: {
        type: String,
        default: ''
    },
    sub_text_fontWeight: {
        type: String,
        default: ''
    },
    sub_text_fontSize: {
        type: Number,
        default: 10
    },
    sub_text_width: {
        type: Number,
        default: 10
    },
    sub_text_height: {
        type: Number,
        default: 10
    },
    sub_text_overflow: {
        type: String,
        default: ''
    },
    sub_text_lineHeight: {
        type: Number,
        default: 10
    },
    sub_text_textAlign: {
        type: String,
        default: ''
    },
    sub_verticalAlign: {
        type: String,
        default: ''
    },
    sub_text_left: {
        type: Number,
        default: 10
    },
    sub_text_top: {
        type: Number,
        default: 10
    },
    sub_text_padding: {
        type: Number,
        default: 10
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    currentId: { // 当前被渲染组件ID
        type: String,
    },
    block: { // 当前被渲染组件 block
        type: Object,
    },
    bType: {
        type: String,
        default: 'page'
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    },
    xAxisData: {
        type: Array<string>,
        default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    seriesData: {
        type: Array<number>,
        default: [820, 932, 901, 934, 1290, 1330, 1320]
    },

})

const model = defineModel({
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback', "init"])

const handleChange = (value: string) => {
    model.value = value
}

// Methods

logger.info(`bType[ ${props.bType} ]，动态渲染 ala-line-chart 组件，props：`, props);




const option = computed(() => {
    const op = {
        title: {
            text: props.text_text ? props.text_text : '',
            text_link: props.text_link ? props.text_link : '',
            subtext: props.text_subtext ? props.text_subtext : '',
            left: props.text_left ? props.text_left : '',
            top: props.text_top ? props.text_top : '',
            itemGap: props.text_itemGap ? props.text_itemGap : '',
            padding: props.text_padding ? props.text_padding : '',
            backgroundColor: props.text_backgroundColor ? props.text_backgroundColor : '',
            borderRadius: props.text_borderRadius ? props.text_borderRadius : '',
            textStyle: {
                color: props.text_color ? props.text_color : '',
                fontStyle: props.text_fontStyle ? props.text_fontStyle : '',
                text_fontWeight: props.text_fontWeight ? props.text_fontWeight : '',
                fontSize: props.text_fontSize ? props.text_fontSize : '',
                lineHeight: props.text_lineHeight ? props.text_lineHeight : '',
                textAlign: 'center',
                textVerticalAlign: props.text_textVerticalAlign ? props.text_textVerticalAlign : '',
                width: props.text_width ? props.text_width : '',
                height: props.text_height ? props.text_height : '',
                overflow: props.text_overflow ? props.text_overflow : '',
            },
            subtextStyle: {
                color: props.sub_text_color ? props.sub_text_color : '',
                fontStyle: props.sub_text_fontStyle ? props.sub_text_fontStyle : '',
                fontWeight: props.sub_text_fontWeight ? props.sub_text_fontWeight : '',
                fontSize: props.sub_text_fontSize ? props.sub_text_fontSize : '',
                lineHeight: props.sub_text_lineHeight ? props.sub_text_lineHeight : '',
                textAlign: props.sub_text_textAlign ? props.sub_text_textAlign : '',
                verticalAlign: props.sub_verticalAlign ? props.sub_verticalAlign : '',
                width: props.sub_text_width ? props.sub_text_width : '',
                height: props.sub_text_height ? props.sub_text_height : '',
                overflow: props.sub_text_overflow ? props.sub_text_overflow : '',
            }
        },
        xAxis: {
            type: 'category',
            data: props.xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: props.seriesData,
                type: 'line',
            },
        ],
    }
    return op;
});
console.log('option', option.value);




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
</script>

<style scoped lang="scss">
// :deep(.el-input__wrapper){
//     padding-left: 4px;
// }
// :deep(.el-input__prefix-inner>:last-child){
//     margin-right: 4px;
// }</style>