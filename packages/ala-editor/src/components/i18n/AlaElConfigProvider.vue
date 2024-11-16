<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-16 14:54:29
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-16 15:30:14
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/i18n/AlaElConfigProvider.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <ElConfigProvider :locale="currentLocale.elLocale" :message="{ max: 1 }" :size="size">
        <slot></slot>
    </ElConfigProvider>
</template>

<script setup lang="ts">

// State
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/store/locale'
import { logger } from '@/utils/logger';

const localeStore = useLocaleStore()

const currentLocale = computed(() => {

    const cl = localeStore.currentLocale
    logger.error("当前国际化环境配置为：", cl);

    return cl
})

// 设置主题为暗色
// const theme = ref('dark')
// 设置组件大小为小号

const size = ref<"" | "default" | "small" | "large">('default')


// Methods

</script>

<style scoped lang="scss"></style>