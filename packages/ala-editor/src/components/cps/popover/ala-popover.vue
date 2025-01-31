<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-31 19:05:16
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-31 20:26:35
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/popover/ala-popover.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-popover placement="right" trigger="hover" @show="show">
        <template #reference>
            <img v-if="src" :src="src" :style="{ width: imageWidth, height: imageHeight }" />
            <p v-if="text">{{ text }}</p>
        </template>
        <slot></slot>
    </el-popover>
</template>

<script setup lang="ts">

// State
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    imageWidth: {
        type: String,
        default: '16px'
    },
    imageHeight: {
        type: String,
        default: '16px'
    }
})

const emits = defineEmits(["onShow"])
// Methods
const show = () => {
    emits('onShow')
}

</script>

<style scoped lang="scss"></style>