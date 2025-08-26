<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-26 10:34:25
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/cloud/physicalServersDisks/add.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props"
        :fields="formConfigs.physicalServersDisks.formFields" :formData="formData" :columnNum="1" labelPosition="top"
        :moduleName="moduleName" :url="url" :updateUrl="updateUrl" :tipTitle="$t('pop.warm_title')"
        :formAttr="formConfigs.physicalServersDisks.formAttr" :beforeSave="beforeSave" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import formConfigs from '@/config/formConfigs';

const props = defineProps({
    baseInfo: {
        type: Object,
        default: {
            id: null,
            pid: 0,
            moduleName: "模块名称不存在",
            item: {}
        }
    },
})


// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################
const url = '/c/physicalServersDisks/add'
const updateUrl = '/c/physicalServersDisks/update'
// 表单数据保存对象
const formData = reactive({
})

watch(() => props.baseInfo.item, (item) => {
    logger.info(`观察到 baseInfo 中的 item 发生了变化`, item);
    // u.merged(formData, item)
    // if (!item.id) {
    //     u.clear(formData)
    // }
    u.clear(formData)
    Object.assign(formData, item)
    logger.info(`formData数据更新后`, formData);
}, {
    deep: true,
    immediate: true
})

// 基础表单字段
const basicFields = computed(() => {
    return formConfigs.physicalServersDisks.formFields
})


// ##########################  以下是公共方法，不需要修改 start #########################################


// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

// 监听表单回调事件
const emit = defineEmits(["refresh"])
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 confirm 接收到回调数据，当前formData数据为", formData);
    emit('refresh', data)
}

const moduleName = computed(() => {
    return props.baseInfo.moduleName
})

const beforeSave = (item: any) => {
    // 转换
    return item
}
// ##########################  以上是公共方法，不需要修改 end #########################################
// { value: { labelWidth: 90, columnNum: 1, formWidth: 500 } }


</script>

<style scoped lang="scss"></style>