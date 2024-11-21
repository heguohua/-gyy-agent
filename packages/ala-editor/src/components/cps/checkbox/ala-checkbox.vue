<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 15:06:50
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/checkbox/ala-checkbox.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-checkbox-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <el-checkbox-group @change="handleChange" :model-value="model" class="ala-checkbox-group">
                <div class="ala-checkbox--item" v-for="(item, index) in items" :key="bType + '-' + item.value">
                    <el-checkbox :value="item.value" :id="fieldName + index">{{ item.name }}</el-checkbox>
                </div>
            </el-checkbox-group>
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
    },
    fieldName: {
        type: String,
        default: ''
    },
    bType: {
        type: String,
        default: 'page'
    }
})

// State
const bType = props.bType

const model = defineModel({
    type: Array<string | number>,
    default: []
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
.ala-checkbox-wrapper {

    align-items: center;

    .ala-checkbox-group {
        display: inline-flex;
        gap: 16px;

        :deep .el-checkbox {
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