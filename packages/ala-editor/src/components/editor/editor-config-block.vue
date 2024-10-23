<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 11:21:23
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-23 15:44:23
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-config-block.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-block">
        <editor-config-render :list="configFormItemList" @callback="callback">
            <div class="" v-if="!editorStore.currentSelect">
                <el-empty description="请在左侧拖入组件后，点击选中组件">
                    <template #image>
                        <v-icon class="icon" icon="dragBlank" />
                    </template>
                </el-empty>
            </div>
        </editor-config-render>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';
import { blockSchemas, BlockSchemaKeys } from '@/config/schemas';
import { getConfigFormItemList, updateCurrentBlockConfig } from './nested';
import { BaseBlock } from '@/types/editorType';
import { merge } from 'lodash';
// State
const configFormItemList = ref<BaseBlock[]>([])

const editorStore = useEditorStore()


// Methods

/**
 * 1、监听 editorStore 中保存的 baseBlock 变量，有变化后及时更新 config 区域的动态表单
 * 2、监听 editorStore 中保存的 viewport 变量，有变化后及时更新 config 区域的动态表单
 */
watch(() => editorStore.currentSelect, () => {
    logger.info("editor-config-block中【 监听到 】editorStore中的 currentSelect 发生变化,即将重新渲染 config 区域的动态表单");

    const currentBaseBlock = editorStore.currentSelect

    logger.info(`editor-config-block组件 【 监听到 】 editorStore 中 currentSelect 或 viewport 发生变化,即将渲染 editor-config 面板, currentBaseBlock值为`, currentBaseBlock);

    const code = currentBaseBlock?.code as BlockSchemaKeys

    logger.info(`当前block code : ${code}`);

    // 根据当前基础组件的code获取当前基础组件的schema
    const blockSchema = blockSchemas[code]
    // 获取单个组件的属性列表
    const properties = blockSchema.properties
    if (!currentBaseBlock || !properties) {
        logger.error("currentBaseBlock 和 properties均不存在");
        configFormItemList.value = []
        return
    }

    const { formData, id } = currentBaseBlock


    logger.info('当前block的 baseBlock 属性：', currentBaseBlock);
    logger.info('当前block的 blockSchema 属性：');
    console.log('blockSchema:', properties);

    const listResult = Object.fromEntries(Object.entries(properties).map((oneProperty) => {
        // console.log(key, value);
        console.log('oneProperty', oneProperty);
        const [propertyName, propertyValue] = oneProperty
        const full_properties = [propertyName, { ...propertyValue, id, key: propertyName, formData: formData }]
        console.log('oneProperty 添加 block属性 转换后', full_properties);
        return full_properties;
    }))

    console.log('总properties转换后listResult:', listResult);

    const form_items = [...Object.values(listResult)] as BaseBlock[]
    console.log('总properties转换后 form_items :', form_items);

    configFormItemList.value = form_items

}, {
    immediate: true
})

/**
 * 接受子组件传递的参数值，然后更新 editorStore 中保存的 BaseBlock[]
 * @param params 
 */
const callback = (params: { data: object, id: string }) => {
    const { data, id } = params
    if (!id) return
    const blockConfig = editorStore.blockConfig || []

    logger.info(`editor-config-block组件 接收到 子组件callback,即将更新editorStore中的 blockConfig,nodeId[${id}],data`, data);

    const newBlockConfig = updateCurrentBlockConfig(blockConfig, id, editorStore.viewport, data)
    logger.info(`editor-config-block组件 接收到 子组件callback,即将更新editorStore中的 blockConfig,nodeId[${id}],newBlockConfig`, newBlockConfig);


    console.log('newBlockConfig========================:',newBlockConfig);
    
    
    editorStore.setBlockConfig(newBlockConfig)

    // 更新 editorStore 中的 currentSelect 中 formData 属性值
    // if (editorStore.currentSelect?.id === id) {
    //     const currentSelect = editorStore.currentSelect
    //     // currentSelect.formData = deepmerge.all([editorStore.currentSelect.formData, data])
    //     merge(editorStore.currentSelect.formData, data);
    //     logger.info(`editor-config-block组件 接收到 子组件callback,即将更新 editorStore.currentSelect 中的 formData,nodeId[${id}],formData`, currentSelect.formData);
    //     editorStore.setCurrentSelect(currentSelect)
    // }
}


</script>

<style scoped lang="scss">
.editor-config-block {
    width: 100%;
}
</style>