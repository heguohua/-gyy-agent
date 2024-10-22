<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 11:21:23
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-22 10:33:08
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-config-block.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-block">
        <editor-config-render :list="list" @callback="callback">
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
import { updateCurrentBlockConfig } from './nested';
import deepmerge from 'deepmerge';
import { BaseBlock } from '@/types/editorType';
// State
const list = ref<any[]>([])

const editorStore = useEditorStore()


// Methods

/**
 * 监听 editorStore 中保存的 baseBlock 变量，有变化后及时更新 config 区域的动态表单，由于涉及到 schema 相关属性读取，因此此方法略显复杂
 */
watch(() => editorStore.currentSelect, (currentBaseBlock) => {

    logger.info(`editor-config-block组件 【 监听到 】 editorStore.currentSelect 发生变化,即将渲染 editor-config 面板, currentBaseBlock值为`, currentBaseBlock);

    const code = currentBaseBlock?.code as BlockSchemaKeys

    logger.info(`当前block code : ${code}`);

    // 根据当前基础组件的code获取当前基础组件的schema
    const blockSchema = blockSchemas[code]
    // 获取单个组件的属性列表
    const properties = blockSchema.properties
    if (!currentBaseBlock || !properties) {
        list.value = []
        return
    }

    const { formData, id } = currentBaseBlock

    logger.info('当前block的 baseBlock 属性：', currentBaseBlock);

    logger.info('当前block的 blockSchema 属性：');
    console.log('blockSchema:', properties);



    // list.value = Object.values(properties).map((oneProperty, index) => {
    //     console.log('oneProperty', oneProperty);
    //     console.log('Object.entries(oneProperty.properties)', Object.entries(oneProperty.properties));
    //     // 通过 Object.entries 将对象的所有属性转换成 [[属性名,属性值],,,] 格式
    //     return Object.fromEntries(Object.entries(oneProperty.properties).map(([propertyName, propertyValue]) => {
    //         // console.log(key, value);
    //         const full_properties = [propertyName, { ...(propertyValue as Object), id, key: propertyName, formData: formData ? formData[propertyName] || {} : {} }]
    //         console.log('Object.entries(oneProperty.properties)转换后', full_properties);
    //         return full_properties;
    //     }))
    // })

    const listResult = Object.fromEntries(Object.entries(properties).map((oneProperty) => {
        // console.log(key, value);
        console.log('oneProperty', oneProperty);
        const [propertyName, propertyValue] = oneProperty
        const full_properties = [propertyName, { ...(propertyValue as Object), id, key: propertyName, formData: formData?.[propertyName] || {} }]
        console.log('oneProperty 添加 block属性 转换后', full_properties);
        return full_properties;
    }))

    console.log('总properties转换后listResult:', listResult);

    // const form_items = reactive([...Object.values(listResult)])
    const form_items = [...Object.values(listResult)] as BaseBlock[]
    console.log('总properties转换后 form_items :', form_items);

    list.value = form_items


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

    editorStore.setBlockConfig(newBlockConfig)

    // 更新 editorStore 中的 currentSelect 中 formData 属性值
    if (editorStore.currentSelect?.id === id) {
        const currentSelect = editorStore.currentSelect
        currentSelect.formData = deepmerge.all([editorStore.currentSelect.formData, data])
        editorStore.setCurrentSelect(currentSelect)
    }
}

</script>

<style scoped lang="scss">
.editor-config-block {
    width: 100%;
}
</style>