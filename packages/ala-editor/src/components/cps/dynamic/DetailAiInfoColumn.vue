<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-20 16:19:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailAiInfoColumn.vue
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
        <p class="value"><v-icon v-if="icon && !isDetailColumn" class="image" :icon="icon" :width="width"
                :height="height" />{{
                    showValue }}
        </p>
    </template>

</template>

<script setup lang="ts">
import u from '@/utils/u'


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
        type: [String, Number, Object] as PropType<number | string | object>,
        default: ''
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
    deepColumnName: {
        type: String,
        default: ''
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

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

const emit = defineEmits(['showDetail', 'refresh'])
const showDetail = () => {
    emit('showDetail', props.data)
}

// Methods
const icon = computed(() => {
    return props.formItem.formData.icon?.desktop || ''
})
const width = computed(() => {
    return props.formItem.formData.iconWidth?.desktop || ''
})
const height = computed(() => {
    return props.formItem.formData.iconHeight?.desktop || ''
})

const showValue = computed(() => {


    
    const value = props.value
    let tmp: any = ''

    if (value) {
        const deepColumnName = props.formItem.formData.deepColumnName?.desktop
        if (deepColumnName) {
            tmp = u.deepValue(value as object, deepColumnName)
        } else {
            tmp = value
        }
    }
    return tmp
})


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
