<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-23 11:11:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-23 11:46:03
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/config/config-column.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-column">
        <el-form-item>
            <div class="item" v-for="(item, index) in column" :key="index">
                <div v-html="widthFormat(item)" class="input">
                </div>
            </div>
            <div class="action-box">
                <div class="item">
                    <v-icon v-if="isShowRemove" class="icon" icon="subtract" @class="remove" />
                    <v-icon v-if="isShowAdd" class="icon" icon="add" @class="add" />
                </div>
            </div>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { Viewport } from '@/types/editorType';
import { logger } from '@/utils/logger';
import { computed, ref, toRefs, watch } from 'vue'

import { useEditorStore } from '@/store/useEditorStore';
const editorStore = useEditorStore()


const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: "desktop" as Viewport
    }
})

// State

const emit = defineEmits(["callback"])

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { default: defaultValue, minItems, maxItems } = data.value.properties[props.viewport]

const realDefaultValue = Array.from({ length: minItems }, () => defaultValue)

const column = ref<number[]>([])

const isShowRemove = computed(() => column.value.length > minItems)
const isShowAdd = computed(() => column.value.length < minItems)

// Methods



watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`config-column组件 【 监听到 】 form_data 发生变化,即将更新 column 的属性值,column.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        column.value = form_data[key][props.viewport] || realDefaultValue
    } else {
        logger.info("config-column组件 【 监听到 】 formData 发生变化,value?.[props.viewport]值不存在,不更新 column.value 属性值");
    }
}, {
    immediate: true
})

watch(() => editorStore.globalParams, () => {
    if (formData[key]?.[props.viewport]) {
        logger.info(`config-column组件 【 监听到 】 form_data 发生变化,即将更新 column 的属性值,column.value=form_data[key][props.viewport]`, formData[key][props.viewport]);
        column.value = formData[key][props.viewport] || realDefaultValue
    } else {
        logger.info("config-column组件 【 监听到 】 formData 发生变化,value?.[props.viewport]值不存在,不更新 column.value 属性值");
    }
}, { deep: true })

watch(column, (value) => {

    if (value.length > maxItems) return

    const _value = value
    const data = { desktop: _value, mobile: _value }

    logger.info(`config-column组件 column 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
})

const updateNumber = (length: number) => Array.from({ length: length }, () => 1 / length)
const widthFormat = (width: number) => parseInt(String(width * 10000)) / 100 + "%"

const remove = () => {
    const { length } = column.value
    if (length === maxItems) return
    column.value = updateNumber(length + 1)
}
const add = () => {
    const { length } = column.value
    if (length === 1) return
    column.value = updateNumber(length - 1)
}

</script>

<style scoped lang="scss">
.config-column {
    .list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .action-box {
        width: 100%;
        display: flex;
    }

    .item {
        flex: 1;
        flex-shrink: 0;
        background: var(--color-config-block-bg);
        border: 1px dashed var(--color-border);
        border-right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        font-size: 13px;

        &:first-child {
            border-top-left-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
        }

        &:last-child {
            border: 1px dashed var(--color-border);
            border-top-right-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
        }

        .input {
            width: 100%;
            height: 38px;
            padding: 8px;
            text-align: center;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .icon {
            width: 20px;
            height: 20px;
            margin: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: #5a9cf8;
                border-radius: 4px;
                color: white;
            }
        }
    }
}
</style>