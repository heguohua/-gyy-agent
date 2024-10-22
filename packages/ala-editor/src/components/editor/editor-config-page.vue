<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 11:21:23
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-22 20:52:09
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-config-page.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-page">
        <editor-config-render :list="configFormItemList" @callback="callback">

        </editor-config-render>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import { pageSchemas } from '@/config/schemas';
import { updateCurrentBlockConfig } from './nested';
import { BasePage } from '@/types/editorType';
import { merge } from 'lodash';
// State
const configFormItemList = ref<BasePage[]>([])

const editorStore = useEditorStore()

const properties = pageSchemas.properties

const listResult = Object.fromEntries(
    Object.entries(properties).map((property) => {
        const [key, value] = property
        return [key, { ...value, key, formData: editorStore.pageConfig.formData }]
    })
)

configFormItemList.value = [...Object.values(listResult)]

// Methods


/**
 * 接受子组件传递的参数值，然后更新 editorStore 中保存的 BaseBlock[]
 * @param params 
 */
const callback = (params: { data: object, id: string }) => {
    const { data } = params
    logger.info(`editor-config-page组件 接收到 子组件callback,即将更新editorStore中的 pageConfig,data`, data);
    const pageConfig = editorStore.pageConfig || {}
    logger.info(`editor-config-page组件 接收到 子组件callback,即将更新editorStore中的 pageConfig,formData`, pageConfig);

    merge(pageConfig, { formData: data })
    logger.info(`editor-config-page组件 接收到 子组件callback,即将更新editorStore中的 pageConfig,合并 data 后formData`, pageConfig);

    editorStore.setPageConfig(pageConfig)
    // 
}


</script>

<style scoped lang="scss">
.editor-config-page {
    width: 100%;
}
</style>