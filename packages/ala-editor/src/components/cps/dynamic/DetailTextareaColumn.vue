<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-26 15:58:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailTextareaColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <p class="title" :style="{ width: labelWidth }">{{ label }}</p>
    <p class="value">
    <div class="omit">
        <el-tooltip effect="light" :content="value" :hide-after="0" v-if="!isDetailPage">
            {{ showValue }}
        </el-tooltip>
        <template v-else>
            {{ showValue }}
        </template>
    </div>
    </p>
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
        type: String,
        default: ''
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
    if (props.isDetailPage) {
        return props.value
    }
    const maxlength = props.formItem.formData.pageMax.desktop || 6
    let value = props.value
    if (value && value.length > maxlength) {
        value = value.slice(0, maxlength) + '...'
    }
    return value
})

</script>

<style scoped lang="scss">
.omit {
    background: rgb(220 223 230 / 10%);
    border-radius: 4px;
    padding: 4px;
}
</style>
