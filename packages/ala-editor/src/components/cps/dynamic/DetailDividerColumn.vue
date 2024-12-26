<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 19:59:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailDividerColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-divider-wrapper">
        <el-divider :content-position="position" :style="styles">{{ label }}</el-divider>
    </div>
</template>

<script setup lang="ts">

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
        type: String,
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
    }
})

// Methods

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

// Methods
const position = computed(() => {
    return props.formItem.formData.position.desktop
})
const lineStyle = computed(() => {
    return props.formItem.formData.lineStyle.desktop
})

const borderWidth = computed(() => {
    return props.formItem.formData.height.desktop
})

const styles = computed(() => {
    const style = { borderWidth: borderWidth.value + 'px', borderStyle: lineStyle.value }
    return style
})
</script>

<style scoped lang="scss">
.ala-divider-wrapper {
    min-width: 100%;

    :deep(.el-divider__text) {
        background-color: var(--el-bg-color);
        color: var(--el-table-header-text-color);
        padding: 0 4px;
        top: -1px;
    }

    :deep(.is-left) {
        left: 10px;
    }

    :deep(.is-right) {
        right: 10px;
    }

    :deep(.el-divider--horizontal) {
        border-top: none;
        border-color: var(--el-border-color);
    }

}
</style>
