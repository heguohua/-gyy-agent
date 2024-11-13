<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 15:11:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/menuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <AlaAddForm v-model="showDrawer" @callback="callback" v-bind="props" />
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';

// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const props = defineProps({
    closeTitle: {
        type: String,
        default: '温馨提示：'
    },
    closeContent: {
        type: String,
        default: '您确定要关闭新增页面吗？'
    },
})

// Methods
const emit = defineEmits(["callback"])

const callback = (data: any) => {
    logger.warn("新增页面接收到回调数据，即将回调list页面", data);

    ElMessageBox.confirm(
        '您确定要保存【】吗？',
        props.closeTitle,
        {
            confirmButtonText: '确认保存',
            cancelButtonText: '继续编辑',
            type: 'warning',
        })
        .then(() => {
            showDrawer.value = false
            emit('callback', data)
        })
        .catch(() => {
            logger.info("点击【确认保存】按钮，弹出取消提示信息框，用户选择【取消关闭】");
        })

}


</script>

<style scoped lang="scss"></style>