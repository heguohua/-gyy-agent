<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-31 09:42:19
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-31 10:08:11
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/full-screen/ala-full-screen.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-dialog v-model="showDialog" :title="title" :fullscreen="fullscreen" :width="width" class="ala-dialog" :show-close="showClose">
        <slot name="header"></slot>
        <slot name="middle"></slot>
        <slot name="bottom"></slot>
    </el-dialog>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'

// State
const props = defineProps({
    title: {
        type: String,
    },
    fullscreen: {
        type: Boolean,
        default: false
    },
    showClose: {
        type: Boolean,
        default: true
    },
    width: {
        type: [Number, String] as PropType<number | string>,
        default: '50%'
    },
})

const showDialog = defineModel({
    type: Boolean,
    default: false
})

// Methods

</script>

<style lang="scss">
.ala-dialog {
    padding: 0px!important;
    overflow: hidden!important;
}
</style>