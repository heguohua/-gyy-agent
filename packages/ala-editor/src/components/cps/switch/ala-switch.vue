<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 11:54:31
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/switch/ala-switch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-switch-wrapper">
        <span :class="clasz">{{ label }}</span>
        <!-- <el-radio-group @change="handleChange" :model-value="model" class="ala-switch-group">
            <div class="ala-switch-item" v-for="(item, index) in items" :key="item.value">
                <el-radio :value="item.value">{{ item.name }}</el-radio>
            </div>
        </el-radio-group> -->

        <el-switch :model-value="model" active-color="#13ce66" inactive-color="#ff4949" :active-text="activeText"
            :inactive-text="inActiveText" @change="handleChange">
        </el-switch>
    </div>
</template>

<script setup lang="ts">

interface Item {
    name: string,
    value: string
}

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
    activeText: {
        type: String,
        default: '开'
    },
    inActiveText: {
        type: String,
        default: '关'
    }
})

const model = defineModel({
    type: Boolean 
})

const handleChange = (value: any) => {
    console.log('value:',value);
    
    model.value = value
}

const clasz = computed(() => {
    const position = props.position
    let claszName = ''
    if (!position || position === 'left') {
        claszName = 'label-left';
    } else {
        if (position === 'top') {
            claszName = 'label-top';
        }
    }
    console.log('claszName:', claszName);

    return claszName;
})

// Methods

</script>

<style scoped lang="scss">
.ala-switch-wrapper {
    text-align: left;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    align-items: center;


    .label-left {
        display: inline-block;
    }

    .label-top {
        display: block;
    }
}
</style>