<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-25 20:22:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/SliderColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    {{ value }}
</template>

<script setup lang="ts">

// State
defineProps({
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: Number,
        default: 0
    }
})

// Methods

</script>

<style scoped lang="scss"></style>
