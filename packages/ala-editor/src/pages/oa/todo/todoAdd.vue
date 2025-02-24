<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-24 11:00:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/oa/todo/todoAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :formData="formData"
        :columnNum="1" labelPosition="top" :moduleName="moduleName" :url="url" :updateUrl="updateUrl"
        :tipTitle="$t('pop.warm_title')" :formAttr="formAttr" :beforeSave="beforeSave" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildDivider, alaBuildSlider, alaBuildSwitch, alaBuildSelectDict, alaBuildTextarea, alaBuildSelectTable } from '@/config/alaBuilders';
import u from '@/utils/u';
import { date } from '@/utils/date';
import { useI18n } from 'vue-i18n';
import AlaTextarea from '@/components/cps/textarea/ala-textarea.vue';
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
const url = '/p/todo/add'
const updateUrl = '/p/todo/update'
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


        // alaDetailBuild(dType.input, 'subject', "待办主题", 1, true),

        // alaDetailDate(dType.date, 'startTime', "开始时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),
        // alaDetailDate(dType.date, 'endTime', "结束时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),

        // // 1-不重复，2-每天，3-每周，4-每半个月，5-每一个月，6-每2个月，7-每3个月，8-每半年，9-每一年，10-每个工作日，11-每2天，12-每3天，14-每4天，15-每5天，16-每10天
        // alaDetailRadio(dType.radio, 'repeatType', "重复类型", [{ '不重复': 1 }, { '每天': 2, 'color': colors.primary }, { '每周': 3, 'color': colors.success }, { '每半个月': 4, 'color': colors.danger }, { '每一个月': 5 }, { '每2个月': 6 }, { '每3个月': 7 }, { '每半年': 8 }, { '每一年': 9 }, { '每个工作日': 10 }, { '每2天': 11 }, { '每3天': 12 }, { '每4天': 14 }, { '每5天': 15 }, { '每10天': 16 }], undefined, undefined, { columnWidth: { desktop: '150' } }),

        // alaDetailBuild(dType.input, 'createdName', "创建人", undefined, undefined, { columnWidth: { desktop: '150' } }),
        // alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', undefined, undefined, { columnWidth: { desktop: '200' } }),

        alaBuildHidden('id'),// 固定格式
        alaBuildInput("subject", '待办主题', [alaRequired()]),
        alaBuildDate("startTime", "开始时间", "datetime", "YYYY-MM-DD HH:mm", [alaRequired()], "", "", "请选择开始时间"),
        alaBuildDate("endTime", "结束时间", "datetime", "YYYY-MM-DD HH:mm", [alaRequired()], "", "", "请选择结束时间"),
        alaBuildRadio('repeatType', "重复类型", [{ '不重复': 1 }, { '每天': 2 }, { '每周': 3 }, { '每半个月': 4 }, { '每一个月': 5 }, { '每2个月': 6 }, { '每3个月': 7 }, { '每半年': 8 }, { '每一年': 9 }, { '每个工作日': 10 }, { '每2天': 11 }, { '每3天': 12 }, { '每4天': 14 }, { '每5天': 15 }, { '每10天': 16 }], [alaRequired()]),
        alaBuildRadio('noticeType', "提醒类型", [{ '开始时': 1 }, { '提前5分钟': 2 }, { '提前10分钟': 3 }, { '提前15分钟': 4 }, { '提前30分钟': 5 }, { '提前1小时': 6 }, { '提前2小时': 7 }, { '提前1天': 8 }, { '提前2天': 9 }, { '提前1周': 10 }, { '提前2周': 11 }], [alaRequired()]),
        alaBuildTextarea("remark", "日程描述", [], "请输入日程描述"),



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

const beforeSave = (item: any) => {
    // 转换
    return item
}
// ##########################  以上是公共方法，不需要修改 end #########################################
// { value: { labelWidth: 90, columnNum: 1, formWidth: 500 } }
const formAttr = ref({
    formWidth: 500,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'right',
    useFormTitle: false,
})


</script>

<style scoped lang="scss"></style>