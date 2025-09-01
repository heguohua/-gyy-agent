<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-30 17:21:57
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/password/ala-password.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-password-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-input type="password" :model-value="model" @input="handleChange" :placeholder="placeholder"
                :disabled="isDisabled"></el-input>
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
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const handleChange = (value: string) => {
    model.value = value
}

const isDisabled = computed(() => {
    const idd = false

    if (props.data?.id && props.noEditable) {
        return true
    }
    return idd
})

// Methods

</script>

<style scoped lang="scss"></style>