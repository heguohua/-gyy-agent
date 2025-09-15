<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-30 17:21:37
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
            <el-input-number type="number" :model-value="model" @change="handleChange" :placeholder="placeholder"
                :id="fieldName" :min="min" :max="max" :step="step" :precision="precision"
                :controls-position="controlsPosition" :disabled="isDisabled">
                <template #prefix v-if="icon">
                    <v-icon class="image" :icon="icon" :width="iconWidth" :height="iconHeight" />
                </template>

            </el-input-number>
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
    step: {
        type: Number,
        default: () => 1
    },
    precision: {
        type: Number,
        default: () => 2
    },
    min: {
        type: Number,
        default: () => -9007199254740991
    },
    max: {
        type: Number,
        default: () => 9007199254740991
    },
    labelWidth: {
        type: Number,
    },
    right: {
        // type: String as PropType<'' | 'right'>,
        type: Boolean,
        default: () => false
    },
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    },
})

const model = defineModel({
    type: Number
})

const emit = defineEmits(['callback'])


const controlsPosition = computed(() => {
    let p = ''
    if (props.right) {
        p = 'right'
    }
    return p
})

const handleChange = (current: number, pre: number) => {
    model.value = current
}

if (!model.value) {
    model.value = props.initValue
}
// Methods

const isDisabled = computed(() => {
    const idd = false

    if (props.noEditable) {
        return true
    }
    return idd
})

</script>

<style scoped lang="scss">
// :deep(.el-input__wrapper) {
//     padding-left: 4px;
// }

// :deep(.el-input__prefix-inner>:last-child) {
//     margin-right: 4px;

:deep(.el-input-number) {
    width: 100%;
}
</style>