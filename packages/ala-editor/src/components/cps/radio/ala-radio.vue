<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-25 11:19:48
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/radio/ala-radio.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-radio-wrapper" :style="styles">
        <el-form-item :label="label" :label-position="position" :prop="fieldName" class="minHeight">
            <!-- <span :class="clasz">{{ label }}</span> -->
            <template #label>
                <AlaFormLabel :label="label" :help="help" :alaComponent="alaComponent" :alaFieldName="fieldName" />
            </template>
            <el-radio-group @change="handleChange" :model-value="model" class="ala-radio-group" :disabled="isDisabled">
                <div class="ala-radio-item" v-for="(item, index) in items" :key="item.value">
                    <el-radio :value="item.value" :id="fieldName">{{ item.name }}</el-radio>
                </div>
            </el-radio-group>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { PropType } from 'vue';


interface Item {
    name: string,
    value: any

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
    help: {
        type: String,
    },
    data: {
        type: Object,
    },
    noEditable: {
        type: Boolean,
        default: () => false
    },
    alaComponent: { // 当前被渲染组件 block
        type: String,
        default: ''
    }
})

const model = defineModel({
    type: [String, Number, Boolean, undefined] as PropType<string | number | boolean | undefined>
})
logger.info(`bType[ $bType ],ala-radio组件被渲染, props :`, props);

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

    if (props.noEditable) {
        return true
    }
    return idd
})


</script>

<style scoped lang="scss">
.ala-radio-wrapper {

    .ala-radio-group {
        display: inline-flex;
        gap: 16px;
        min-height: 32px;

        .ala-radio-item {
            height: inherit;
        }

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