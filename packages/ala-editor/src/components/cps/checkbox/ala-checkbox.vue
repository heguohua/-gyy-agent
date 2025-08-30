<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-30 17:20:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/checkbox/ala-checkbox.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-checkbox-wrapper" :style="styles">
        <el-form-item :label="label" :label-position="position" :prop="fieldName">
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-checkbox-group @change="handleChange" :model-value="localValue" class="ala-checkbox-group"
                :disabled="isDisabled">
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

// State
const bType = props.bType

const model = defineModel({
    type: String,
    default: ''
})

// 初始化回显数据
const localValue: any = computed(() => {
    if (model.value) {
        return model.value.split(',')
    }
})


const handleChange = (value: any) => {
    localValue.value = value
    model.value = value.join(',')
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

    return claszName;
})
// Methods
const styles = computed(() => {
    if (!props.label) {
        return { border: '1px dashed var(--el-border-color)' }
    } else {
        return {}
    }
})


const isDisabled = computed(() => {
    const idd = false

    if (props.data?.id && props.noEditable) {
        return true
    }
    return idd
})

</script>

<style scoped lang="scss">
.ala-checkbox-wrapper {

    align-items: center;

    .ala-checkbox-group {
        display: inline-flex;
        min-height: 32px;
        flex-wrap: wrap;
        column-gap: 16px;

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