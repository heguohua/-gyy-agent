<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-16 14:50:50
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-16 15:41:55
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/i18n/i18n-test.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div>
        <el-button @click="changeLanguage('zh-CN')">中文</el-button>
        <el-button @click="changeLanguage('zh-Tw')">中文-繁体</el-button>
        <el-button @click="changeLanguage('en')">英文</el-button>
    </div>
    <div>
        <!-- 根据当前语言显示不同的类型 此处为 hello 或者 你好 -->
        {{ $t('message.hello') }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
// 引入useLocale
import { useLocale } from '@/hooks/useLocale'
// 使用useLocale
const { changeLocale } = useLocale()
// 切换语言
const changeLanguage = (locale: any) => {
    changeLocale(locale)
}


// Methods

</script>

<style scoped lang="scss"></style>