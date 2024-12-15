<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-15 13:24:18
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-key-value.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-key-value">
        <el-form-item :label="title" :class="isRequired()">
            <div class="input">
                <el-input v-model="itemKey" placeholder="name" class="input-item" />
                <el-input v-model="itemValue" placeholder="value" class="input-item" />
                <v-icon-tooltip content="删除" class="icon" icon="add" @click="addKeyValue()" width="16" height="16" />

            </div>
            <div class="show">
                <div v-for="(item, index) in items" :key="index" class="show-item">
                    <span>{{ item.name }}: {{ item.value }}</span>
                    <v-icon-tooltip content="删除" class="icon" icon="delete" @click="removeKeyValue(index)" width="12"
                        height="12" />
                </div>
            </div>


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
logger.info(`bType[ ${bType} ],config-column组件渲染, data :`, props.data);

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, placeholder, required } = data.value.properties[props.viewport]

const isRequired = () => {
    return required ? 'is-required' : ''
}


// ################## 相较于 input组件 自定义部分 start ########################################################

interface Item {
    name: string,
    value: string,
}
const items = ref<Array<Item>>([])
const itemKey = ref('');
const itemValue = ref('');
const addKeyValue = () => {

    if (itemKey.value && itemValue.value) {
        items.value.push({ name: u.trim(itemKey.value), value: u.trim(itemValue.value) });
        itemKey.value = '';
        itemValue.value = '';
    }
};

const removeKeyValue = (index: number) => {
    items.value.splice(index, 1);
};

// ################## 相较于 input组件 自定义部分 end ########################################################


watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-key-value组件 【 监听到 】 form_data 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        items.value = form_data[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-key-value组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, {
    immediate: true
})

watch(() => items.value, (value) => {
    let data = {}
    const _value = value || ''

    if (Object.values(formData || {}).length < 2) {
        data = { desktop: _value, mobile: _value, required: required ? required : false, title }
    } else {
        data = { [props.viewport]: _value, required: required ? required : false, title }
    }
    logger.info(`config-key-value组件 input 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
}, {
    deep: true
})


watch(() => editorStore.globalParams[bType], () => {

    if (formData[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-key-value组件 【 监听到 】 formData 发生变化，key[ ${key} ]，即将更新 input 的属性值,input.value=formData[key][props.viewport]`, formData[key][props.viewport]);
        items.value = formData[key][props.viewport] || defaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-key-value组件 【 监听到 】 formData 发生变化，key[ ${key} ]，value?.[props.viewport]值不存在,不更新 input.value 属性值`);
    }
}, { deep: true })




</script>

<style scoped lang="scss">
.config-key-value {
    .input {
        display: flex;
        justify-content: center;
        align-items: center;

        .input-item {
            width: 40%;
            margin-right: 4px;
        }

        .icon {}


    }

    .show {
        width: 100%;

        .show-item {
            display: flex;
            align-items: center;
            font-size: 0.7rem;

            span {
                text-align: left;
                padding-right: 8px;
            }

            .icon {
                display: inline-block;
                width: 20px;
            }
        }


    }

    :deep(.el-input__wrapper) {
        background: var(--color-config-block-bg)
    }
}
</style>
