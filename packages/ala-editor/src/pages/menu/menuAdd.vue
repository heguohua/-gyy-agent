<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 15:35:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/menuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props" :basicFields="basicFields" :formData="formData"
        :columnWidth="300" :columnNum="3" labelPosition="top" :moduleName="moduleName" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildSlider, alaBuildSwitch } from '@/config/alaBuilders';
import { date } from '@/utils/date';

// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################

const formData = reactive({
    bornDate: '2023-11-11',
    registerTime: '',
})

// 基础表单字段
const basicFields = [
    alaBuildRawInput('AlaCustomerizationComponentDemo', '自定义文本框', [alaRequired()], '请输入内容'),
    alaBuildInput("username", "用户名", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
    alaBuildPassword("password", "密码", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
    alaBuildNumber("age", "年龄", [alaRequired(), alaNumber(), alaNumberRange(18, 99)]),
    alaBuildRadio('gender', "性别", [{ '男': 'man' }, { '女': 'men' }, { '未知': 'unknown' }], [alaRequired()]),
    alaBuildCheckbox('color', "偏好色系", [{ '红色': 'red' }, { '绿色': 'green' }, { '黄色': 'yellow' }], [alaRequired()]),
    alaBuildSelect('channel', "购票渠道", [{ '拼多多': 'pin' }, { '美团': 'mei' }, { '淘票票': 'yellow' }], [alaRequired()]),
    alaBuildSwitch('status', "账号状态", '正常', '禁用', [alaRequired()]),
    alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
    alaBuildDate('registerTime', "认证时间", 'datetime', "YYYY-MM-DD HH:mm:ss", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
    alaBuildSlider('weight', "大概体重", 40, 200, 5, [alaRequired()]),
    alaBuildRating('score', "整体评分", 10, [alaRequired()], true),
]


// ##########################  以下是公共方法，不需要修改 start #########################################

const props = defineProps({
    moduleName: {
        type: String,
        default: ''
    },
    id: {
        type: Number,
        default: 0
    },
})

// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

// 监听表单回调事件
const emit = defineEmits(["confirm"])
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 confirm 接收到回调数据，当前formData数据为", formData);
    emit('confirm', data)
}



// ##########################  以上是公共方法，不需要修改 end #########################################


</script>

<style scoped lang="scss"></style>