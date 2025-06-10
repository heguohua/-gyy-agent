<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-10 20:33:14
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-checkbox.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->

<template>

    <div class="ala-form-rules-wrapper">

        <el-form-item :label="title">
            <el-checkbox-group @change="handleChange" class="ala-form-rules-group" :model-value="model">
                <div class="ala-form-rules-item" v-for="(item, index) in checkbox" :key="bType + '-' + item.value">
                    <el-checkbox :value="item.value">{{ item.name }}</el-checkbox>
                </div>
            </el-checkbox-group>
        </el-form-item>

    </div>

</template>

<script setup lang="ts">

import { alaConsts } from '@/config/alaConsts';
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

const { title, default: defaultValue, checkbox, required, rules } = data.value.properties[props.viewport]

interface Rule {
    name: string,
    value: string,
    min: number,
    max: number,
}
const model = defineModel({
    type: Array<string>,
    default: []
})


// 根据 formData 更新当前组件状态
watch(formData, (form_data) => {

    if (form_data[key]?.[props.viewport]) {

        logger.info(`bType[ ${bType} ],【 config-form-rules 监听到 】form_data 发生变化，即将更新 input 的属性值,更新前form_data[key][props.viewport]`, form_data[key]?.[props.viewport]);
        model.value = form_data[key]?.[props.viewport]

    } else {

        logger.info(`bType[ ${bType} ],【 config-form-rules 监听到 】form_data formData.${key}.${props.viewport}不存在，不执行更新动作`, form_data[key]?.[props.viewport]);

    }

}, {
    immediate: true
})

// 通过回调更新 editorStore 中的状态值
watch(() => model.value, (value) => {
    if (!value) return;
    // return;
    let data = {}
    let _value = value || []

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
    immediate: true,
    deep: true
})


// Methods
const handleChange = (value: any) => {
    model.value = value
}


</script>

<style scoped lang="scss">
.ala-form-rules-wrapper {
    .ala-form-rules-group {
        text-align: left;

        .ala-form-rules-item {
            padding: 6px;
            border-top: 1px dashed var(--el-border-color);

            .properties {
                font-size: 14px;
                text-align: center;
                vertical-align: middle;
                align-items: center;
                margin-top: 6px;
                flex-wrap: wrap;

                .ala-form-rules-item-property {
                    display: flex;
                    margin-top: 4px;

                    .label {
                        height: 18px;
                        width: 54px;
                        font-size: 12px;
                        align-items: center;
                        display: flex;
                    }

                    :deep(.el-input-number) {
                        height: 18px;
                        width: 100px;
                    }

                    :deep(.el-input-number__decrease),
                    :deep(.el-input-number__increase) {
                        width: 20px;
                    }

                    :deep(.el-form-item__label) {
                        height: 18px;
                        line-height: 18px;
                    }

                    :deep(.el-form-item) {
                        margin-bottom: 4px;
                    }
                }
            }

            label {
                display: flex;
            }

            &:last-child {
                border-bottom: 1px dashed var(--el-border-color);

            }
        }

        :deep(.el-checkbox) {
            height: 14px;
        }
    }
}
</style>
