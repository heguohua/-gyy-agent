<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-11 15:14:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectTreeColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    <p class="value">{{ showValue }}</p>
</template>

<script setup lang="ts">
// 2025-06-11: 变更 ala-select-tree 组件前端-》后端传值为[{propertyName:valueName}]方式，也变更了后端->前端的方式，因此这里做了修改！！！

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

const showValue = computed(() => {
    const value = toRaw(props.value)
    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    if (value && value.length > 0) {
        return value[0]?.[propertyName] ? value[0][propertyName] : "..."
    }
})

</script>

<style scoped lang="scss"></style>
