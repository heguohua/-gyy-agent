<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-19 10:19:02
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-int.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-int">
        <el-form-item :label="title" :class="isRequired()">
            <el-input-number v-model.number="input" :precision="precision" :placeholder="placeholder" :min="min"
                :max="max" :step="step" :step-strictly="stepStrictly" :readonly="readonly" :controls="controls"
                :controls-position="controlsPosition" class="input" />
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import { ref } from 'vue'
const editorStore = useEditorStore()

const emit = defineEmits(["callback"])

// State


const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: 'desktop'
    },
    bType: {
        type: String,
        default: 'page'
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: () => Math.pow(2, 53) - 1
    },
    step: {
        type: Number,
        default: 1
    },
    stepStrictly: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    controls: {
        type: Boolean,
        default: true
    },
    controlsPosition: {
        type: String,
        default: ""
    },
    precision: {
        type: Number,
        default: 0
    }
})

const bType = props.bType

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value


const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]
const input = ref(0)
if (defaultValue) {
    input.value = defaultValue
}

const isRequired = () => {
    return required ? 'is-required' : ''
}



watch(() => formData, (form_data) => {
    
    if (form_data[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-int组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,defaultValue[${defaultValue}],input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        input.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-int组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(input, (value) => {
    if (value !== 0 && !value) return;
    let data = {}
    const _value = value || ''

    if (Object.values(formData || {}).length < 2) {
        data = { desktop: Number(_value), mobile: Number(_value), required: required ? required : false, title, rules }
    } else {
        data = { [props.viewport]: Number(_value), required: required ? required : false, title, rules }
    }
    logger.info(`config-int组件 input 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
}, {
    immediate: true
})


watch(() => editorStore.globalParams[bType], () => {

    if (formData[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-int组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        input.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-int组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })



// Methods

</script>

<style scoped lang="scss">
.config-int {
    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg);

        input {
            &::placeholder {
                font-size: 0.8rem;
            }
        }
    }

    :deep(.el-input-number) {
        width: 100%;
    }

}
</style>
