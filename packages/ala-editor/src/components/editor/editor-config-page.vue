<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 11:21:23
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-12 16:27:42
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-config-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-page">
        <editor-config-render :list="configFormItemList" @callback="callback" :bType="bType">

        </editor-config-render>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import { pageSchemasForm, pageSchemasPage } from '@/config/schemas';
import { updateBlockConfigFormData } from './nested';
import { BasePage } from '@/types/editorType';
import { merge } from 'lodash';
import deepmerge from 'deepmerge';
// State
const props = defineProps({
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

const editorStore = useEditorStore()

const initProperties = () => {
    if (bType === 'form') {
        return pageSchemasForm.properties
    } else if (bType === 'page') {
        return pageSchemasPage.properties
    } else if (bType === 'screen') {

    }
}

const properties = initProperties()

const configFormItemList = ref<(typeof properties)[keyof typeof properties][]>([])

let form_data = editorStore.pageConfig[bType].formData
// const { globalParams } = toRefs(editorStore)
// merge(form_data, { globalParams })
const { globalParams } = toRefs(editorStore)
merge(form_data, { globalParams })



const listResult = Object.fromEntries(
    Object.entries(properties).map((property) => {
        const [key, value] = property
        return [key, { ...value, key, formData: form_data }]
    })
)

configFormItemList.value = [...Object.values(listResult)]


// Methods


/**
 * 接受子组件传递的参数值，然后更新 editorStore 中保存的 BaseBlock[]
 * @param params 
 */
const callback = (params: { data: Record<string, any>, id: string }) => {
    const { data } = params
    logger.info(`bType[ ${bType} ],editor-config-page组件 接收到 子组件callback,即将更新editorStore中的 pageConfig,data`, data);
    const pageConfig = editorStore.pageConfig[bType] || {}
    logger.info(`bType[ ${bType} ],editor-config-page组件 接收到 子组件callback,即将更新editorStore中的 pageConfig,formData`, pageConfig);

    merge(pageConfig, { formData: data })
    editorStore.setPageConfig(pageConfig, bType)
    logger.info(`bType[ ${bType} ],editor-config-page组件 接收到 子组件callback,即将更新editorStore中的 pageConfig,合并 data 后 pageConfig`, pageConfig);

    const propertyName: string = Object.keys(data)[0]
    configFormItemList.value.forEach((item) => {
        if (item.key === propertyName) {
            merge(item.formData[propertyName], data[propertyName])
            logger.info(`bType[ ${bType} ],editor-config-page组件 接收到 子组件callback,即将更新 【 表单组件 】 中的 formData,合并 data 后formData`, item.formData);
        }
    })
}


watch(() => editorStore.pageConfig[bType], (newValue) => {
    logger.info(`bType[ ${bType} ],editor-config-page组件 监听到【 editorStore.pageConfig 更新 】,即将更新 pageConfig.${bType}`, newValue);

    const listResult = Object.fromEntries(
        Object.entries(properties).map((property) => {
            const [key, value] = property
            return [key, { ...value, key, ...newValue }]
        })
    )
    // pageConfig 页面最新组件
    const allComponents = [...Object.values(listResult)]
    console.log('pageConfig allComponents:', allComponents);
    configFormItemList.value = allComponents

}, {
    deep: true
})


</script>

<style scoped lang="scss">
.editor-config-page {
    width: 100%;
}
</style>