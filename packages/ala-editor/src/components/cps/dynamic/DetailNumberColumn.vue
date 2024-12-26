<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 16:35:11
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailNumberColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    
    <p class="title" :style="{ width: labelWidth }">{{ label }}</p>
    <p class="value"><v-icon v-if="icon" class="image" :icon="icon" :width="width" :height="height" />{{ value }}</p>

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
        type: Number,
        default: 0
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
