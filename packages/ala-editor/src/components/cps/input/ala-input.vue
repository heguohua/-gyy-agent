<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 22:58:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/input/ala-input.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-form-item :label="label">
        <el-input :model-value="model" @input="handleChange"></el-input>
    </el-form-item>
</template>

<script setup lang="ts">

// State
defineProps({
    label: {
        type: String,
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const handleChange = (a, b, c, d) => {
    console.log(a, b, c, d)
    model.value = a
}

// Methods

</script>

<style scoped lang="scss"></style>