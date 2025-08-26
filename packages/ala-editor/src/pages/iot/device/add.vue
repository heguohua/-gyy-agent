<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-28 22:25:34
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/iot/device/add.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :formData="formData"
        labelPosition="top" :moduleName="moduleName" :url="url" :updateUrl="updateUrl" :tipTitle="$t('pop.warm_title')"
        :formAttr="formAttr" :beforeSave="beforeSave" ref="alaBaseForm">

    </AlaBaseForm>

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword, alaLinuxPort } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildDivider, alaBuildSlider, alaBuildSwitch, alaBuildCascader, alaBuildTextarea, alaBuildChapter, alaBuildSelectTable } from '@/config/alaBuilders';
import u from '@/utils/u';
import { date } from '@/utils/date';
import { useI18n } from 'vue-i18n';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
import { device } from '@/config/formConfigs/device';
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

const baseInfo = inject('baseInfo') as { [key: string]: any };

// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################
const url = '/iot/device/add'
const updateUrl = '/iot/device/update'
// 表单数据保存对象
const formData = reactive<{ [key: string]: any }>({
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
    return device.formFields
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

// ##########################  以上是公共方法，不需要修改 end #########################################
const formAttr = ref({
    formWidth: 500,
    columnNum: 1,
    labelWidth: 200,
    labelPosition: 'top',
    useFormTitle: false,
})


const beforeSave = async (data: { [key: string]: any }) => {

    const d = await alaBaseForm.value.getFormData()

    // 添加 pid
    if (baseInfo?.folder?.id) {
        d['groupId'] = baseInfo?.folder?.id
    } else {
        logger.error(`baseInfo.folder.id【 不存在 ！！！ 】`);
    }

    // 转换 profileId
    if (data.profileId && data.profileId.length > 0) {
        d.profileId = data.profileId[0].id
    }

    // 对 configuration 字段进行 base64加密
    // delete d['configuration']
    logger.info(`格式化数据后，data参数`, d);

    return d
}

const alaBaseForm = ref()


</script>

<style scoped lang="scss"></style>