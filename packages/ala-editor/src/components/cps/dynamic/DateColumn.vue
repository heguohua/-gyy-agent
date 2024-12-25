<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-25 21:10:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DateColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    {{ date.formatDateTime(value, formItem.formData.format.desktop) }}
</template>

<script setup lang="ts">
import { date } from '@/utils/date';


// State
defineProps({
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Number,
        default: 0
    }
})

// Methods

</script>

<style scoped lang="scss"></style>
