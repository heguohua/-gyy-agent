<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 14:07:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/password/ala-password.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-password-wrapper">
        <el-form-item :label="label" :label-position="position">
            <el-input type="password" :model-value="model" @input="handleChange" :placeholder="placeholder"></el-input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">

// State
defineProps({
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
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const handleChange = (value: string) => {
    model.value = value
}

// Methods

</script>

<style scoped lang="scss">
.ala-password-wrapper {
}
</style>