<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-29 10:08:46
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/designAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :formData="formData"
        :columnNum="1" labelPosition="top" :moduleName="moduleName" :url="url" :updateUrl="updateUrl"
        :tipTitle="$t('pop.warm_title')" :formAttr="{ value: { labelWidth: 90, columnNum: 1, formWidth: 500 } }" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildDivider, alaBuildSlider, alaBuildSwitch, alaBuildSelectDict, alaBuildTextarea } from '@/config/alaBuilders';
import u from '@/utils/u';
import { date } from '@/utils/date';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
const url = '/p/design/add'
const updateUrl = '/p/design/update'
// 表单数据保存对象
const formData = reactive({
})

watch(() => props.baseInfo.item, (item) => {
    logger.info(`观察到 baseInfo 中的 item 发生了变化`, item);
    // u.merged(formData, item)
    if (!item.id) {
        u.clear(formData)
    }
    Object.assign(formData, item)
    logger.info(`formData数据更新后`, formData);
}, {
    deep: true
})

// 基础表单字段
const basicFields = computed(() => {
    return [
        alaBuildHidden('id'),// 固定格式
        alaBuildInput("name", '唯一编码', [alaRequired()]),
        alaBuildInput("displayName", '显示名称', [alaRequired()]),
        alaBuildSelectDict("typeEntrys", "流程分类", { "dictValue": "leaveType" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [alaRequired()], "请选择流程分类", { clearable: true }),
        alaBuildInput("icon", '图标', [alaRequired()]),
        alaBuildSwitch('isDeployed', t('common.enable'), t('buttons.enable'), t('buttons.disable'), 1, 2, []),
        alaBuildTextarea("remark", "备注", [], "请输入流程说明"),
    ]
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
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 confirm 接收到回调数据，当前formData数据为", formData);
    emit('refresh', data)
}

const moduleName = computed(() => {
    return props.baseInfo.moduleName
})


// ##########################  以上是公共方法，不需要修改 end #########################################


</script>

<style scoped lang="scss"></style>