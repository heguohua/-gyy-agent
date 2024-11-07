<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-07 12:01:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 12:01:47
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/time/AlaCurrentDateTime.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div>
        当前时间：{{ currentTime }}
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import { date } from "@/utils/date"

const currentTime = ref<string>('');

const updateDateTime = () => {
    currentTime.value = date.getCurrentDateTime();
};

// 初始更新
updateDateTime();

// 设置定时器，每秒更新时间
const timer = setInterval(updateDateTime, 1000);

onMounted(() => {
    // 组件挂载后，设置定时器
});

onUnmounted(() => {
    // 组件卸载时，清除定时器
    clearInterval(timer);
});
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>