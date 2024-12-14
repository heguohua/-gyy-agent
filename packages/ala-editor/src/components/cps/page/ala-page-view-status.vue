<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-14 17:02:56
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-14 17:42:56
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/page/ala-page-view-status.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <el-tag type="success" :title="value" v-if="isValid">
        {{ u.parseI18n(validName, t) }}
    </el-tag>
    <el-tag type="warning" :title="value" v-else>
        {{ u.parseI18n(inValidName, t) }}
    </el-tag>

</template>

<script setup lang="ts">
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
const props = defineProps({
    validName: {
        type: String,
        default: "有效"
    },
    inValidName: {
        type: String,
        default: "无效"
    },
    isValid: {
        type: Boolean,
    },
    value: null
})

// Methods
// 
</script>

<style scoped lang="scss"></style>