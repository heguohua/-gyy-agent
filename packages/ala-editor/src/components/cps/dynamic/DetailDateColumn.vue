<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-06 20:08:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailDateColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value">{{ showValue }}</p>
</template>

<script setup lang="ts">
import { date } from '@/utils/date';
import u from '@/utils/u';
import { PropType } from 'vue';


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
        type: [Object, Number] as PropType<Object | Number>,
        default: 0
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
    }
})

// Methods

const showValue = computed(() => {
    const value = props.value
    let tmp = '...'
    if (value) {
        const format = props.formItem.formData.format.desktop
        const deepColumnName = props.formItem.formData.deepColumnName?.desktop
        if (deepColumnName) {
            const innerValue = u.deepValue(value, deepColumnName)
            if (innerValue) {
                tmp = date.formatDateTime(Number.parseInt(innerValue), format)
            }
        } else {
            tmp = date.formatDateTime(value as number, format)
        }
    }
    return tmp
})

</script>

<style scoped lang="scss"></style>
