<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-12 14:06:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/radio/ala-radio.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-radio-wrapper">
        <el-form-item :label="label" :label-position="position">
            <!-- <span :class="clasz">{{ label }}</span> -->
            <el-radio-group @change="handleChange" :model-value="model" class="ala-radio-group">
                <div class="ala-radio-item" v-for="(item, index) in items" :key="item.value">
                    <el-radio :value="item.value">{{ item.name }}</el-radio>
                </div>
            </el-radio-group>
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
    items: {
        type: Array<Item>,
        default: []
    }
})

const model = defineModel({
    type: String || Number || Boolean || undefined
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
.ala-radio-wrapper {

    .ala-radio-group {

        display: inline-flex;
        gap: 16px;

        :deep .el-radio {
            display: inline-flex;
            align-items: center;
        }
    }

    .label-left {
        display: inline-block;
    }

    .label-top {
        display: block;
    }
}
</style>