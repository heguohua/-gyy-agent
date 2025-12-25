<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 10:47:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailDateColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <template v-if="isDetailColumn">
        <p class="title" :style="{ minWidth: labelWidth }">
            <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" :alaComponent="formItem.code"
                    :alaFieldName="formItem.formData.fieldName.desktop" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <p class="detail-link value" @click="showDetail">{{ showValue }}</p>
    </template>
    <template v-else>
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



const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})



const emit = defineEmits(['showDetail', 'refresh'])

const showDetail = () => {
    emit('showDetail', props.data)
}

</script>

<style scoped lang="scss">
.detail-link {
    color: var(--el-menu-active-color);

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        font-weight: 500;
    }
}
</style>
