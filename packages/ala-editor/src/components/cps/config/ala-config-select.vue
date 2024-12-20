<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-20 10:17:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-select.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-select">
        <el-form-item :label="title" :class="isRequired()">
            <el-input v-model="input" :placeholder="placeholder" class="input" readonly />

            <el-select v-model="input" placeholder="请选择" :clearable="clearable">
                <el-option v-for="item in defaultValue" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
            <!-- @change="handleChange" -->
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import { ref } from 'vue'
const editorStore = useEditorStore()

const emit = defineEmits(["callback"])

// State


interface Item {
    name: string,
    value: string
}

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
    width: {
        type: Number,
        default: 100,
    },
    clearable: {
        type: Boolean,
        default: false,
    }
})

const bType = props.bType

const { data } = toRefs(props)
const { formData, parentKey, key, id, properties } = data.value

const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]
const input = ref('')

const isRequired = () => {
    return required ? 'is-required' : ''
}


logger.info(`bType[ ${bType} ],config-select组件被渲染, items :`, defaultValue);
logger.info(`bType[ ${bType} ],config-select组件被渲染, items :`, defaultValue);


watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        input.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(input, (value) => {
    if (!value) return;
    value = u.trim(value)
    let data = {}
    const _value = value || ''

    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value, required: required ? required : false, title, rules }
    } else {
        data = { [props.viewport]: _value, required: required ? required : false, title, rules }
    }
    logger.info(`config-select组件 input 发生变化,即将调用父组件callback, data`, data);
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
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        input.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-select组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })



// Methods

</script>

<style scoped lang="scss">
.config-select {
    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg)
    }
}
</style>
