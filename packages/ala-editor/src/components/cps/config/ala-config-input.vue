<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 14:52:26
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-input.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-input">
        <el-form-item :label="title">
            <el-input v-model="input" :placeholder="placeholder" class="input" />
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
    businessType: {
        type: String,
        default: 'page'
    }
})

const businessType = props.businessType

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, placeholder } = data.value.properties[props.viewport]
const input = ref('')



watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`businessType【${businessType}】,config-input组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        input.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`businessType【${businessType}】,config-input组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(input, (value) => {
    let data = {}
    const _value = value || ''

    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value }
    } else {
        data = { [props.viewport]: _value }
    }
    logger.info(`config-input组件 input 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
})


watch(() => editorStore.globalParams[businessType], () => {

    if (formData[key]?.[props.viewport]) {
        logger.info(`businessType【${businessType}】,config-input组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        input.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`businessType【${businessType}】,config-input组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })



// Methods

</script>

<style scoped lang="scss">
.config-input {
    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg)
    }
}
</style>
