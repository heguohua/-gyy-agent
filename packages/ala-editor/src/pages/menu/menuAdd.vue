<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 14:35:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/menu/menuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <AlaAddForm v-model="showDrawer" @callback="callback" />
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ref } from 'vue'

// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

// Methods
const emit = defineEmits(["callback"])

const callback = (data: any) => {
    logger.warn("新增页面接收到回调数据，即将回调list页面", data);
    emit('callback', data)
}


</script>

<style scoped lang="scss"></style>