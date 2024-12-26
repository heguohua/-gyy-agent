<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 10:48:46
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailNumberColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <v-icon v-if="icon" class="image" :icon="icon" :width="width" :height="height" />{{ value }}
    
</template>

<script setup lang="ts">

// State
const props = defineProps({
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
const icon = computed(() => {
    return props.formItem.formData.icon.desktop
})
const width = computed(() => {
    return props.formItem.formData.iconWidth.desktop
})
const height = computed(() => {
    return props.formItem.formData.iconHeight.desktop
})
</script>

<style scoped lang="scss"></style>
