<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 10:58:06
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailDateRangeColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    {{ showValue }}
</template>

<script setup lang="ts">
import { date } from '@/utils/date';


// State
const props = defineProps({
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Object,
        default: {}
    }
})

// Methods
const showValue = computed(() => {
    const start = props.value.start
    const end = props.value.end
    const format = props.formItem.formData.format.desktop
    return date.formatDateTime(start, format) + ' ~ ' + date.formatDateTime(end, format)
})


</script>

<style scoped lang="scss"></style>
