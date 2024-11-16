<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-16 11:14:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/hidden/ala-hidden.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-hidden-wrapper">
        <el-form-item>
            <el-input :model-value="model" type="hidden" :id="fieldName"></el-input>
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
    type: Number,
    default: null
})


// Methods

</script>

<style scoped lang="scss"></style>