<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-08 20:04:10
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/rating/ala-rating.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-rating-wrapper" :style="styles">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <el-rate :model-value="model" :allow-half="allowHalf" :max="max" @change="handleChange" :id="fieldName" />
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
    max: {
        type: Number,
        default: 0,
    },
    allowHalf: {
        type: Boolean,
        default: false,
    },
    fieldName: {
        type: String,
        default: ''
    }
})

const model = defineModel({
    type: Number,
    default: 0
})

const handleChange = (value: number) => {
    model.value = value
}

const styles = computed(() => {
    if (!props.label) {
        return { border: '1px dashed var(--el-border-color)' }
    } else {
        return {}
    }
})

// Methods


</script>

<style scoped lang="scss">
.ala-rating-wrapper {
    min-width: 240px;
}
</style>