<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-26 21:13:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/number/ala-number.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-input-wrapper">
        <el-form-item :label="label" :labelWidth="labelWidth" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-input type="number" :model-value="model" @input="handleChange" :placeholder="placeholder"
                :id="fieldName">
                <template #prefix v-if="icon">
                    <v-icon class="image" :icon="icon" :width="iconWidth" :height="iconHeight" />
                </template>

            </el-input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">

// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    },
    initValue: {
        type: Number,
        default: 0
    },
    labelWidth: {
        type: Number,
    }
})

const model = defineModel({
    type: Number
})

const emit = defineEmits(['callback'])

const handleChange = (value: string) => {
    model.value = Number(value)
}

if (!model.value) {
    model.value = props.initValue
}
// Methods

</script>

<style scoped lang="scss">
// :deep(.el-input__wrapper) {
//     padding-left: 4px;
// }

// :deep(.el-input__prefix-inner>:last-child) {
//     margin-right: 4px;
// }</style>