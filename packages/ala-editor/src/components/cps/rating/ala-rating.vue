<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 17:17:40
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/rating/ala-rating.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-slider-wrapper">
        <el-form-item :label="label" :label-position="position">
            <el-rate :model-value="model" allow-half @change="handleChange"/>
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
    starCount: {
        type: Number,
        default: 0,
    }
})

const model = defineModel({
    type: Number,
    default: 0
})

const handleChange = (value: number) => {
    model.value = value
}


// Methods

</script>

<style scoped lang="scss">

</style>