<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-19 09:09:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/input/ala-input.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-input-wrapper">
        <el-form-item :label-position="position" :prop="fieldName" >
            <template #label>
                <AlaFormLabel :label="label" :help="help" />
            </template>
            <el-input :model-value="model" @input="handleChange" :placeholder="placeholder" :id="fieldName">

                <template #prefix v-if="icon">
                    <v-icon class="image" :icon="icon" :width="iconWidth" :height="iconHeight" />
                </template>

            </el-input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';


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
    currentId: { // 当前被渲染组件ID
        type: String,
    },
    block: { // 当前被渲染组件 block
        type: Object,
    },
    bType: {
        type: String,
        default: 'page'
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback', "init"])

const handleChange = (value: string) => {
    model.value = value
}

// Methods

logger.error(`bType[ ${props.bType} ]，渲染 动态表单 ala-input 组件，props：`, props);

const ck = () => {
    model.value = model.value+'-2'
    logger.error(`bType[ ${props.bType} ]，渲染 动态表单 ala-input 组件，props：`, props);
}


// // 发送组件初始化消息
if (props.bType === 'form') {
    // 组件挂载后再发送初始化消息
    watch(() => props.currentId, () => {
        logger.info(`向 editor-render-drag-form 组件【 发送初始化消息 】，当前组件 id[ ${props.currentId} ]`);

        emit('init', {
            pid: null,
            block: props.block,
        })
    }, {
        immediate: true
    })
}



</script>

<style scoped lang="scss">
// :deep(.el-input__wrapper){
//     padding-left: 4px;
// }
// :deep(.el-input__prefix-inner>:last-child){
//     margin-right: 4px;
// }
</style>