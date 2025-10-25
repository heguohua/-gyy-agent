<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-10-25 08:25:16
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailTimelineColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <el-timeline>

        <template v-for="(item, index) in value" :key="index">
            <DetailTimelineItem :title="item.title" :content="item.content" :timestamp="item.timestamp"
                v-bind="item.properties" />
        </template>

    </el-timeline>

</template>

<script setup lang="ts">

interface Item {
    title: string,
    content: string,
    timestamp: any,
    properties: any,
}

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
        type: Array<Item>,
        default: []
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
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

</script>

<style scoped lang="scss">
:deep(.el-card__body) {
    padding: 14px 20px;
}
</style>
