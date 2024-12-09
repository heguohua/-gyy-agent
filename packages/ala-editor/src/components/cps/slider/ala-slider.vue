<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-09 17:52:43
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/slider/ala-slider.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-slider-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">

            <el-slider :model-value="model" :min="min" :max="max" :step="step" :disabled="disabled" :range="range"
                @update:model-value="handleChange" :id="fieldName" />

        </el-form-item>

    </div>
</template>

<script setup lang="ts">
import { Arrayable } from 'element-plus/es/utils';



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
    }
})

type NumberOrNumberArray = number | number[];

const model = defineModel<NumberOrNumberArray>()

const handleChange = (value: Arrayable<number>) => {
    model.value = value
}


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