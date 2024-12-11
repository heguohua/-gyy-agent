<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-11 22:35:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/switch/ala-switch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-switch-wrapper">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-switch :model-value="model" :active-color="activeColor" :inactive-color="inActiveColor"
                :active-text="activeText" :inactive-text="inActiveText" :active-value="activeValue"
                :inactive-value="inActiveValue" @change="handleChange" :id="fieldName">
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
    activeValue: {
        type: [Boolean, String, Number],
        default: 1
    },
    inActiveValue: {
        type: [Boolean, String, Number],
        default: 2
    },
    fieldName: {
        type: String,
        default: ''
    },
    help: {
        type: String,
    }
})

const model = defineModel({
    type: [Number, String, Boolean] as PropType<number | string | boolean>,
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

    :deep(.el-form-item__label) {
        text-align: right;
    }

}
</style>