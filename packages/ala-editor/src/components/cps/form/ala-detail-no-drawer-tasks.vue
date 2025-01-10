<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-10 18:26:01
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/form/ala-detail-no-drawer-tasks.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-timeline">

        <!-- <template class="" v-for="(form, index) in fds" :key="index">


            

        </template> -->

        <DetailTimelineColumn :value="timelines" />
    </div>

</template>

<script setup lang="ts">
import { alaDetailBuild } from '@/config/alaDetailBuilder';
import { date } from '@/utils/date';
import { logger } from '@/utils/logger';
import { alaPost, get } from '@/utils/req';
import u from '@/utils/u';
import { PropType, ref } from 'vue'

// State
interface Form {
    id: number,
    tableName: string,
}
const props = defineProps({
    tipTitle: {
        type: String,
        default: '温馨提示：'
    },
    moduleName: {
        type: String,
        default: ''
    },
    formAttr: {
        type: Object,
        default: () => ref({
            formWidth: 400,
            columnNum: 1,
            labelWidth: 100,
            labelPosition: 'left',
            useFormTitle: false,
        })
    },
    previewParams: {
        type: Object as any
    }
})


const isHidden = (item: { componentName: string, other?: any }) => {

    if (item.componentName === 'AlaHidden') {
        return 'ala-detail-item-hidden'
    } else if (item.other && item.other.fullWidth) {
        return 'ala-detail-item-full-width'
    } else {
        return 'ala-detail-item'
    }
}

const showDrawer = defineModel({
    type: Boolean,
    default: false
})


// Methods
// ##########################  以下是公共方法，不需要修改  #########################################

const columnWidth = (item: any) => {
    let formWidth = props.formAttr.formWidth
    let labelWidth = props.formAttr.labelWidth
    // let columnNum = 3
    let columnNum = props.formAttr.columnNum

    const paddingWidth = 80

    // 假设每个组件都占用 1列，则计算 列平均宽度
    // (总宽度 - paddingWidth)/columnNum
    let columnWidth = Math.floor((formWidth - paddingWidth) / columnNum)

    let occupiedColumnNum = item.formItem.formData.columnNum.desktop || 1

    if (occupiedColumnNum > columnNum) {
        occupiedColumnNum = columnNum
    }

    columnWidth = columnWidth * occupiedColumnNum

    logger.info(`重新计算动态form渲染区域组件宽度，form width[ ${formWidth} ]，form labelWidth[ ${labelWidth} ]，form columnNum[ ${columnNum} ]，form paddingWidth[ ${paddingWidth} ]，当前组件[ ${item.formItem.code} ]，当前组件列数[ ${occupiedColumnNum} ]`);

    const style = { width: columnWidth + 'px' }
    // logger.info(`计算 动态表单 区域 单个组件 宽度，style`, style);
    return style

}

const getComponent = ((code: string) => {
    const component = 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column'
    return component
})

const labelWidth = () => {
    return props.formAttr?.labelWidth + 'px' || '120px'
}

interface FormData {
    data: { [key: string]: any },
    fields: Array<any>
}

const fds = reactive<Array<FormData>>([])


const timelines = ref<any>([])
const properties = alaDetailBuild("timelines", "time", "label", 1, false, {})

timelines.value.push({
    title: '总经理审批',
    content: '处理中...',
    timestamp: 0,
    properties: alaDetailBuild("timelines", "time", "label", 1, false, { type: { desktop: 'danger' }, hollow: { desktop: true }, center: { desktop: true } })
}, {
    title: '总经理审批',
    content: '同意',
    timestamp: new Date().getTime(),
    properties
})

const taskUrl = '/p/task/list'
watch(() => props.previewParams.instanceId, (newValue) => {
    console.log('newValue:', newValue);
    // 加载当前流程实例的所有任务

    // 如果当前流程实例处于 donging 状态，则第一个节点显示为空心、颜色为danger、居中

    alaPost(u.url(taskUrl || ''), {}, false, '').then((response: any) => {
        
    })

}, { deep: true, immediate: true })


</script>
<style scoped lang="scss">
.ala-detail-timeline {}
</style>
