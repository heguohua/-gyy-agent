<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 11:20:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/slider/ala-slider.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-slider-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
            </template>
            <el-slider :model-value="model" :min="min" :max="max" :step="step" :disabled="isDisabled" :range="range"
                @update:model-value="handleChange" :id="fieldName" />

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
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
    step: {
        type: Number,
        default: 1,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    range: {
        type: Boolean,
        default: false,
    },
    fieldName: {
        type: String,
        default: ''
    },
    help: {
        type: String,
    },
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    },
    alaComponent: { // 当前被渲染组件 block
        type: String,
        default: ''
    }
})

type NumberOrNumberArray = number | number[];

const model = defineModel<NumberOrNumberArray>()

const handleChange = (value: Array<number>) => {
    model.value = value
}


const isDisabled = computed(() => {
    const idd = false

    if(props.disabled){
        return true
    }

    if (props.noEditable) {
        return true
    }
    return idd
})

// Methods


</script>

<style scoped lang="scss">
.ala-slider-wrapper {
    // box-shadow: 0 0 0 1px var(--el-border-color) inset;

    :deep(.el-form-item__content) {
        padding-left: 8px;
    }
}
</style>