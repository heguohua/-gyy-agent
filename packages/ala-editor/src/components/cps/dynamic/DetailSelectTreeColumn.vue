<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-03-02 19:03:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectTreeColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value">{{ showValue }}</p>
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
        type: Object,
        default: {}
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
const showValue = computed(() => {
    const value = toRaw(props.value)
    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    if (value) {
        return value[propertyName] ? value[propertyName] : "..."
    }
})

</script>

<style scoped lang="scss"></style>
