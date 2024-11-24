<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-23 11:11:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-24 14:51:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-viewport.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-viewport">
        <el-form-item :label="title">
            <AlaConfigBaseTab :data="list" @change="change" :bType="bType">
                <template #default="{ item }">
                    <v-icon-tooltip :content="item.content" class="icon" :icon="item.icon" />
                </template>
            </AlaConfigBaseTab>


        </el-form-item>
    </div>
</template>

<script setup lang="ts">
import { Viewport } from '@/types/editorType';
import { logger } from '@/utils/logger';
import { computed, ref, toRefs, watch } from 'vue'

import { useEditorStore } from '@/store/useEditorStore';
import { all } from 'axios';
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
    bType: {
        type: String,
        default: 'page'
    }
})
const bType = props.bType

// State

const emit = defineEmits(["callback"])

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue } = data.value.properties[props.viewport]

logger.info(`bType[ ${bType} ],config-viewport组件渲染, data :`);
console.log('data:', data);

logger.info(`bType[ ${bType} ],config-viewport组件渲染, formData :`, formData);
console.log('formData:', formData);

logger.info(`bType[ ${bType} ],config-viewport组件渲染, defaultValue[ ${defaultValue} ]`);


interface ViewportList {
    icon: String,
    content: String,
    value: 'all' | 'mobile' | 'desktop',
    default: boolean,
}

const list = ref<ViewportList[]>([
    {
        icon: "allViewport",
        content: "多端显示",
        value: 'all',
        default: false,
    },
    {
        icon: "desktop",
        content: "仅桌面显示",
        value: 'desktop',
        default: false,
    },
    {
        icon: "mobile",
        content: "仅移动端显示",
        value: 'mobile',
        default: false,
    },
])



const callback = (value: { desktop: boolean, mobile: boolean }) => {
    emit('callback', {
        data: {
            [key]: value
        },
        id
    })
}


const change = (value: ViewportList['value']) => {
    const rules = {
        all: { desktop: true, mobile: true },
        desktop: { desktop: true, mobile: false },
        mobile: { desktop: false, mobile: true },
    }
    callback(rules[value])
}

// watch(() => formData, (form_data) => {

//     const _formData = form_data?.[key]
//     const defaultValueIndex = Math.max(list.value.findIndex((x) => x.value === _formData || defaultValue), 0)

//     list.value[defaultValueIndex].default = true
//     change(list.value[defaultValueIndex].value)


//     // if (form_data[key]?.[props.viewport]) {
//     //     logger.info(`config-viewport组件 【 监听到 】 form_data 发生变化,即将更新 column 的属性值,column.value=form_data[key][props.viewport]`, form_data[key][props.viewport]);
//     //     column.value = form_data[key][props.viewport] || realDefaultValue
//     // } else {
//     //     logger.info("config-viewport组件 【 监听到 】 formData 发生变化,value?.[props.viewport]值不存在,不更新 column.value 属性值");
//     // }


// }, {
//     immediate: true
// })


watch(() => editorStore.globalParams[bType], () => {
    if (formData[key]?.[props.viewport]) {
        logger.info(`bType[ ${bType} ],config-viewport组件 【 监听到 】 form_data 发生变化,即将更新 column 的属性值,column.value=form_data[key][props.viewport]`, formData[key][props.viewport]);
        // column.value = formData[key][props.viewport] || realDefaultValue
    } else {
        logger.info(`bType[ ${bType} ],config-viewport组件 【 监听到 】 formData 发生变化,value?.[props.viewport]值不存在,不更新 column.value 属性值`);
    }
}, { deep: true })


</script>

<style scoped lang="scss">
.config-viewport {
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
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70%;
            padding: 4px 0px;

            &:hover {
                // background-color: #5a9cf8;
                border-radius: 4px;
                // color: white;
            }
        }
    }
}
</style>