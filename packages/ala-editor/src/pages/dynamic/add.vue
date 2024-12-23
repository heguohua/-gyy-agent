<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-23 21:23:27
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/dynamic/add.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @refresh="refresh" v-bind="props" :basicFields="basicFields" :formData="formData"
        :moduleName="moduleName" :url="url" :updateUrl="updateUrl" :tipTitle="$t('pop.warm_title')" :formAttr="formAttr"
        :beforeSave="beforeSave" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    baseInfo: {
        type: Object,
        default: {
            id: null,
            moduleName: "模块名称不存在",
            item: {}
        }
    },
    basicFields: {
        type: Array<any>,
    },
    formAttr: {
        type: Object
    },
    className: {
        type: String
    }
})

// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################
const url = '/l/dynamic/add'
const updateUrl = '/l/dynamic/update'
// 表单数据保存对象
const formData = reactive({
})

const beforeSave = (data: any) => {
    const dynamicFormData = { tableName: props.className, columns: data }
    return dynamicFormData
}

watch(() => props.baseInfo.item, (item) => {
    logger.info(`观察到 baseInfo 中的 item 发生了变化`, item);
    if (!item.id) {
        u.clear(formData)
    }
    Object.assign(formData, item)
    logger.info(`formData数据更新后`, formData);
}, {
    deep: true
})

// // 基础表单字段
// const basicFields = [
//     alaBuildHidden('pId'),
//     alaBuildRawInput('AlaCustomerizationComponentDemo', '自定义文本框', [alaRequired()], '请输入内容'),
//     alaBuildInput("username", "用户名", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
//     alaBuildPassword("password", "密码", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
//     alaBuildNumber("age", "年龄", [alaRequired(), alaNumber(), alaNumberRange(18, 99)]),
//     alaBuildRadio('gender', "性别", [{ '男': 'man' }, { '女': 'men' }, { '未知': 'unknown' }], [alaRequired()]),
//     alaBuildCheckbox('color', "偏好色系", [{ '红色': 'red' }, { '绿色': 'green' }, { '黄色': 'yellow' }], [alaRequired()]),
//     alaBuildSelect('channel', "购票渠道", [{ '拼多多': 'pin' }, { '美团': 'mei' }, { '淘票票': 'yellow' }], [alaRequired()]),
//     alaBuildSwitch('status', "账号状态", '正常', '禁用', [alaRequired()]),
//     alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
//     alaBuildDate('registerTime', "认证时间", 'datetime', "YYYY-MM-DD HH:mm:ss", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
//     alaBuildSlider('weight', "大概体重", 40, 200, 5, [alaRequired()]),
//     alaBuildRating('score', "整体评分", 10, [alaRequired()], true),
// ]


// ##########################  以下是公共方法，不需要修改 start #########################################


// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

// 监听表单回调事件
const emit = defineEmits(["refresh"])
const refresh = (data: any) => {
    logger.warn("新增页面 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 接收到回调数据，当前formData数据为", formData);
    emit("refresh", data)
}

const moduleName = computed(() => {
    return props.baseInfo.moduleName
})


// ##########################  以上是公共方法，不需要修改 end #########################################


</script>

<style scoped lang="scss"></style>