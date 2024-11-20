<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-23 11:11:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-20 16:42:45
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-column.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-column">
        <el-form-item :label="title">
            <div class="item" v-for="(item, index) in columns" :key="index">
                <div v-html="widthFormat(item)" class="input">
                </div>
            </div>
            <div class="action-box">
                <div class="item">
                    <v-icon v-if="isShowRemove" class="icon" icon="subtract" @click="remove" />
                    <v-icon v-if="isShowAdd" class="icon" icon="add" @click="add" />
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
    },
    pid: {
        type: String,
    }
})

// State

const emit = defineEmits(["callback"])

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, minItems, maxItems } = data.value.properties[props.viewport]

const realDefaultValue = Array.from({ length: minItems }, () => defaultValue)

const columns = ref<number[]>([])

logger.info(`config-column组件渲染 pid【 ${props.pid} 】, data :`);
console.log('data:', data);

logger.info("config-column组件渲染, formData :", formData);
console.log('formData:', formData);

logger.info(`config-column组件渲染, defaultValue[ ${defaultValue} ]`);
logger.info("config-column组件渲染, realDefaultValue :", realDefaultValue);
logger.info(`config-column组件渲染, minItems[ ${minItems} ]`);
logger.info(`config-column组件渲染, maxItems[ ${maxItems} ]`);

// , {
//     immediate: true
// }
// 设置默认列数，立马触发数据更新，用于在 editorStore.blockList 中注册队列组件
columns.value = realDefaultValue

// logger.info(`config-column组件渲染, column`, columns);



const isShowRemove = computed(() => {
    const isShow = columns.value.length > minItems
    logger.info(`ala-column组件 表单列属性,是否显示【 移除 】按钮,isShow[ ${isShow} ]`);

    return isShow
})
const isShowAdd = computed(() => {
    const isShow = columns.value.length < maxItems
    logger.info(`ala-column组件 表单列属性,是否显示【 添加 】按钮,isShow[ ${isShow} ]`);
    return isShow
})

// Methods


watch(columns, (value) => {

    if (value.length > maxItems) return

    const _value = value
    const data = { desktop: _value, mobile: _value }

    logger.info(`config-column组件 columns 发生变化,即将调用父组件callback, data`, data);
    emit("callback", {
        data: {
            [key]: data
        },
        id
    })
})

watch(() => formData, (form_data) => {
    if (form_data[key]?.[props.viewport]) {
        logger.info(`config-column组件 【 监听到 】 form_data 发生变化,即将更新 column 的属性值,column.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
        columns.value = form_data[key][props.viewport] || realDefaultValue
    } else {
        logger.info("config-column组件 【 监听到 】 formData 发生变化,value?.[props.viewport]值不存在,不更新 column.value 属性值");
    }
}, {
    immediate: true
})

watch(() => editorStore.globalParams, () => {
    if (formData[key]?.[props.viewport]) {
        logger.info(`config-column组件 【 监听到 】 form_data 发生变化,即将更新 column 的属性值,column.value=form_data[key][props.viewport]`, formData[key][props.viewport]);
        columns.value = formData[key][props.viewport] || realDefaultValue
    } else {
        logger.info("config-column组件 【 监听到 】 formData 发生变化,value?.[props.viewport]值不存在,不更新 column.value 属性值");
    }
}, { deep: true })


const updateNumber = (length: number) => {
    logger.info(`【 重新计算列数 】,当前 column.length: ${columns.value.length},期望 column.length: ${length}`);
    const updatedColumns = Array.from({ length: length }, () => 1 / length)
    return updatedColumns
}
const widthFormat = (width: number) => {
    const widthText = parseInt(String(width * 1000)) / 10 + "%"
    return widthText
}

const remove = () => {
    const { length } = columns.value
    logger.info(`【 删除列 】,当前 column.length: ${length}`);
    if (length === minItems) return
    columns.value = updateNumber(length - 1)
    logger.info(`【 删除列 】,更新后 column: `, columns.value);

}
const add = () => {

    const { length } = columns.value
    logger.info(`【 添加列 】,当前 column.length: ${length}`);

    if (length === 1) return

    columns.value = updateNumber(length + 1)

    logger.info(`【 添加列 】,更新后 column: `, columns.value);

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
            margin: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24%;
            height: 70%;
            padding: 4px;

            &:hover {
                background-color: #5a9cf8;
                border-radius: 4px;
                color: white;
            }
        }
    }
}
</style>