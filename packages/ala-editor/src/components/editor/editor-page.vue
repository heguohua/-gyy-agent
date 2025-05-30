<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-30 19:06:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-30 19:07:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-page.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-page">
        <template class="" v-for="(item, index) in blockList" :key="item.id" :class="">
            <slot :item="item" :index="index"></slot>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const props = defineProps({
    blockList: {
        type: Array,
        required: true,
        default: () => []
    },
})

// Methods

</script>

<style scoped lang="scss"></style>