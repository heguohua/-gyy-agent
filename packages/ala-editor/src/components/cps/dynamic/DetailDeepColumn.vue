<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-06 18:16:02
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailDeepColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <template v-if="isDetailColumn">
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <p class="detail-link value" @click="showDetail">{{ showValue }}</p>
    </template>
    <template v-else>
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
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
    }
})

// Methods

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

const emit = defineEmits(['showDetail'])
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
    const path = props.formItem.formData.innerColumnName?.desktop
    return u.deepValue(value, path)
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
