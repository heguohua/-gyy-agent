<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 10:24:51
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/radio/ala-radio.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-radio--wrapper">
        <el-radio-group :label="label" :label-position="position" :placeholder="placeholder" @change="handleChange"
            :model-value="model">
            <div class="ala-radio-item" v-for="(item, index) in items" :key="item.value">
                <el-radio :value="item.value">{{ item.name }}</el-radio>
            </div>
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">

interface Item {
    name: string,
    value: string
}

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
    },
    items: {
        type: Array<Item>,
        default: []
    }
})

const model = defineModel({
    type: String || Number || Boolean || undefined
})

const handleChange = (value: any) => {
    console.log('value:', value);

    model.value = value
}

// Methods

</script>

<style scoped lang="scss">
.ala-radio--wrapper {
    text-align: left;
}
</style>