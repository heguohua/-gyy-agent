<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 19:17:51
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailChapterColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-chapter-wrapper">
        <div class="ala-chapter" :style="styles">
            <p class="ala-chapter-icon" />
            <AlaFormLabel :label="label" />
        </div>
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
const icon = computed(() => {
    return props.formItem.formData.icon.desktop
})
const width = computed(() => {
    return props.formItem.formData.iconWidth.desktop
})
const height = computed(() => {
    return props.formItem.formData.iconHeight.desktop
})

const styles = computed(() => {
    const style = { minWidth: width + 'px', }
    return style
})

</script>

<style scoped lang="scss">
.ala-chapter-wrapper {
    .ala-chapter {
        min-width: 100px;
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        justify-content: left;
        align-items: center;
        background: var(--al-title-color);
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 12px;
        box-shadow: 8px 0 0 0 var(--al-title-color), -8px 0 0 0 var(--al-title-color);

        .ala-chapter-icon {
            display: inline-block;
            width: 6px;
            border-radius: 1px;
            background: var(--el-color-primary);
            height: 20px;
            margin-right: 8px;
        }

    }

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
