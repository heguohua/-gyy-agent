<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 22:21:36
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/number/ala-number.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-input-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <el-input type="number" :model-value="model" @input="handleChange" :placeholder="placeholder"
                :id="fieldName"></el-input>
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
    }
})

const model = defineModel({
    type: Number
})

const emit = defineEmits(['callback'])

const handleChange = (value: string) => {
    model.value = Number(value)
}

// Methods

</script>

<style scoped lang="scss"></style>