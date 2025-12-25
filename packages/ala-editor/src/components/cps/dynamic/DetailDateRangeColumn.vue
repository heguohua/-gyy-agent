<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-20 16:20:58
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailDateRangeColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ minWidth: labelWidth }">
        <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" :alaComponent="formItem.code"
                    :alaFieldName="formItem.formData.fieldName.desktop" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
    </p>
    <p class="value">{{ showValue }}</p>
</template>

<script setup lang="ts">
import { date } from '@/utils/date';


// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Object,
        default: {}
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})

// Methods
const showValue = computed(() => {
    const start = props.value.start
    const end = props.value.end
    const format = props.formItem.formData.format.desktop
    return date.formatDateTime(start, format) + ' ~ ' + date.formatDateTime(end, format)
})

defineEmits(['refresh'])
</script>

<style scoped lang="scss"></style>
