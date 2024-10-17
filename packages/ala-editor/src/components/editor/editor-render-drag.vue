<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 18:00:58
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-render-drag.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <draggable :list="list" :group="group" :sort="sort" animation="200" item-key="id" ghost-class="ghost-class"
        class="edit-block-drag" :clone="clone" :move="move">
        <template #item="{ element }">

        </template>
    </draggable>

</template>

<script setup lang="ts">
import { ref } from 'vue'

import { move, clone } from "@/components/editor/nested"

defineOptions({
    name: 'edit-block-drag'
})

defineProps({
    list: {
        type: Array,
        required: true,
        default: () => []
    },
    group: {
        type: [String, Object],
        default: 'group'
    },
    sort: {
        type: Boolean,
        default: true,
    },
    level: {
        type: Number,
        default: 1,
    },
})



// State

// Methods

</script>

<style scoped lang="scss"></style>