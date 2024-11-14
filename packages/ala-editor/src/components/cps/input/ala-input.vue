<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 13:31:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/input/ala-input.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-input-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <el-input :model-value="model" @input="handleChange" :placeholder="placeholder" :id="fieldName"></el-input>
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
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback'])

const handleChange = (value: string) => {    
    model.value = value
}

// Methods

</script>

<style scoped lang="scss"></style>