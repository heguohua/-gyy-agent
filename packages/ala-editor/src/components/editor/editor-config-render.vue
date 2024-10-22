<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 15:05:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-22 18:01:52
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-config-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-config-render">
        <el-form label-width="auto">
            <div class="" v-for="( item, index ) in list" :key="index" :class="bem('render')" @click="">
                <!-- <component v-if="getComponent(item)" :is="getComponent(item)" :data="item" -->
                <component v-if="getComponent(item)" :is="getComponent(item)" :data="item"
                    :viewport="editorStore.viewport" @callback="callback" :key="item.id" />
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@/components/cps/utils/createNamespace';
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';

const editorStore = useEditorStore()

const { name, bem } = createNamespace("config")

// State
const props = defineProps({
    list: {
        type: Array,
        default: () => []
    }
})

// Methods
const getComponent = computed(() => {
    return (item: any) => {
        const code = item.properties[editorStore.viewport].code
        const title = item.properties[editorStore.viewport].title
        logger.info(`editor-config-render中渲染动态 属性表单 组件, code: ${code}, title: ${title}`);
        console.log('item:', item);
        return code
    }
})


// const getComponent = computed(() => {
//     return (item: any) => {
//         const code = item.properties[editorStore.viewport].code
//         const title = item.properties[editorStore.viewport].title
//         logger.info(`editor-config-render中渲染动态 属性表单 组件, code: ${code}, title: ${title}`);
//         console.log('item:', item);
//         return code
//     }
// })



const emit = defineEmits(["callback"])

const callback = (data: any) => {
    logger.info(`editor-config-render组件 接收到 子组件callback,即将调用父组件callback, data`, data);
    emit("callback", data)
}

</script>

<style scoped lang="scss"></style>