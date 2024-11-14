<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-14 13:33:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/switch/ala-switch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-switch-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <el-switch :model-value="model" :active-color="activeColor" :inactive-color="inActiveColor"
                :active-text="activeText" :inactive-text="inActiveText" @change="handleChange" :id="fieldName">
            </el-switch>
        </el-form-item>
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
    },
    activeColor: {
        type: String,
        default: '#13ce66'
    },
    inActiveColor: {
        type: String,
        default: '#ff4949'
    },
    fieldName: {
        type: String,
        default: ''
    }
})

const model = defineModel({
    type: Boolean
})

const handleChange = (value: any) => {
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

    .label-left {
        display: inline-block;
    }

    .label-top {
        display: block;
    }
}
</style>