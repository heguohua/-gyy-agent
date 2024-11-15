<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 21:47:06
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/menuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props" :basicFields="basicFields" :formData="formData"
        :columnWidth="300" :columnNum="1" labelPosition="top" :moduleName="moduleName" :url="url" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildSlider, alaBuildSwitch } from '@/config/alaBuilders';
import { date } from '@/utils/date';

const props = defineProps({
    moduleName: {
        type: String,
        default: ''
    },
    id: {
        type: Number,
        default: 0
    },
    baseInfo: {
        type: Object,
        default: {}
    },
})


// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################
const url = '/u/menu/add'
const formData = reactive({
    pid: computed(() => props.id),// 固定格式
})


// 基础表单字段
const basicFields = [
    alaBuildHidden('pid'),// 固定格式
    alaBuildSwitch('value', "菜单分类", '页面URL', '菜单', 2, 1, [alaRequired()]),
    alaBuildInput("name", "菜单名", [alaRequired()]),
    alaBuildInput("url", "路由URL", [alaRequired()]),
    alaBuildSwitch('delFlag', "启用标志", '启用', '禁用', 2, 1, [alaRequired()]),
    alaBuildInput("icon", "图标", [alaRequired()]),
    alaBuildNumber("width", "图标宽度", [alaRequired()]),
    alaBuildNumber("height", "图标高度", [alaRequired()]),
    alaBuildNumber("sort", "排序值"),
]

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
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 confirm 接收到回调数据，当前formData数据为", formData);
    emit('refresh', data)
}



// ##########################  以上是公共方法，不需要修改 end #########################################


</script>

<style scoped lang="scss"></style>