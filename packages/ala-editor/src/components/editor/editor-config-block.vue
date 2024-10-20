<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 11:21:23
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-20 17:14:06
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
// State
const list = ref<any[]>([])

const editorStore = useEditorStore()


// Methods


const callback = (param: any) => {

}

watch(() => editorStore.currentSelect, (baseBlock) => {

    const code = baseBlock?.code as BlockSchemaKeys

    logger.info(`当前block code : ${code}`);

    // 根据当前基础组件的code获取当前基础组件的schema
    const blockSchema = blockSchemas[code]
    // 获取单个组件的属性列表
    const properties = blockSchema.properties
    if (!baseBlock || !properties) {
        list.value = []
        return
    }

    const { formData, id } = baseBlock

    list.value = Object.values(properties).map((oneProperty, index) => {
        // console.log(Object.entries(oneProperty.properties));
        // 通过 Object.entries 将对象的所有属性转换成 [[属性名,属性值],,,] 格式
        return Object.fromEntries(Object.entries(oneProperty.properties).map(([key, value]) => {
            // console.log(key, value);
            return [key, { ...baseBlock, id, key, formData: formData ? formData[key] : {} }];
        }))
    })

    console.log('list.value:', list.value);


}, {
    immediate: true
})


</script>

<style scoped lang="scss">
.editor-config-block {
    width: 100%;
}
</style>