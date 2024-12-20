<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-20 10:57:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-form-rules.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

    <div class="ala-form-rules-wrapper">

        <el-form-item :label="title">

            <el-checkbox-group @change="handleChange" class="ala-form-rules-group" :model-value="model">

                <div class="ala-form-rules-item" v-for="(item, index) in defaultValue" :key="bType + '-' + item.value">
                    <el-checkbox :value="item.value" :id="item.value + '-' + index">{{ item.name }}</el-checkbox>
                </div>

            </el-checkbox-group>

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
    }
})

const bType = props.bType

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]
const input = ref('')


const model = defineModel({
    type: Array<string>,
    default: []
})

const isRequired = () => {
    return required ? 'is-required' : ''
}

interface ItemProperty {
    propertyName: string,
    valueName: string,
}

watch(formData, (form_data) => {

    logger.info(`bType[ ${bType} ],【 config-form-rules 组件 监听到 】form_data 发生变化，即将更新 input 的属性值,更新前form_data[key][props.viewport]`, form_data[key]?.[props.viewport]);

    const propertyName = form_data['propertyName']?.[props.viewport]
    const valueName = form_data['valueName']?.[props.viewport]

    const itemProperty = {} as ItemProperty
    if (propertyName) {
        itemProperty.propertyName = propertyName
    }
    if (valueName) {
        itemProperty.valueName = valueName
    }
    input.value = u.tojson(itemProperty)
    logger.info(`bType[ ${bType} ],【 config-form-rules组件 监听到 - 更新后 】form_data 发生变化，更新 input 的属性值后form_data[key][props.viewport]`, form_data[key]?.[props.viewport]);

}, {
    immediate: true
})

watch(input, (value) => {
    if (!value) return;
    value = u.trim(value)

    let data = {}
    let _value = value || "{}"

    if (_value) {
        _value = u.parseJson(_value)
    }
    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value, required: required ? required : false, title, rules }
    } else {
        data = { [props.viewport]: _value, required: required ? required : false, title, rules }
    }
    logger.info(`config-form-rules组件 input 发生变化,即将调用父组件callback, data`, data);
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
        logger.info(`bType[ ${bType} ],config-form-rules组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        input.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-form-rules组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    deep: true
})

// Methods
const handleChange = (value: any) => {
    console.log('value:', value);
    model.value = value
}


</script>

<style scoped lang="scss">
.ala-form-rules-wrapper {
    .ala-form-rules-group {
        text-align: left;
    }
}

.config-form-rules {
    :deep .el-input__wrapper {
        background: var(--color-config-block-bg);

        input {
            &::placeholder {
                font-size: 0.8rem;
            }
        }
    }

    :deep(.el-textarea__inner) {
        line-height: 20px;
    }

}
</style>
