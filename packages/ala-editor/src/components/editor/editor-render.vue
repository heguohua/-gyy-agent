<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:22:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-21 19:56:22
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-render" :style="pageStyle" :class="pageClass">
        <editor-render-drag :list="list" :group="dragGroup" class="render">

        </editor-render-drag>
        <el-empty class="empty" v-if="!list?.length" description="请拖拽左侧组件到此处">
            <template #image>
                <v-icon class="icon" icon="dragBlank" />
            </template>
        </el-empty>
    </div>
</template>

<script setup lang="ts">
import { BaseBlock } from '@/types/editorType';
import { dragGroup } from './nested';
import { useEditorStore } from '@/store/useEditorStore';
import { logger } from '@/utils/logger';

const editorStore = useEditorStore()

const list = ref<BaseBlock[]>([])
// State


// Methods
// watch(() => list.value, (value) => {
//     logger.info(`editor-render组件监听到 list.value 更新,即将更新 editorStore.blockConfig`, value);
//     editorStore.setBlockConfig(value)
// }, {
//     deep: true
// })

watch(() => editorStore.blockConfig, (value) => {
    logger.info(`editor-render组件监听到 editorStore.blockConfig 更新,即将更新 list.value`, value);
    list.value = value
}, {
    deep: true
})


const pageStyle = computed(() => {
    return {}
})

const pageClass = computed(() => {
    return { "is-mobile": editorStore.isMobileViewport }
})
</script>

<style scoped lang="scss">
.editor-render {
    container-type: inline-size;
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--edit-header-height));
    margin-left: var(--edit-block-width);
    margin-top: var(--edit-header-height);
    background: white;
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);

    &.is-mobile {
        width: 375px;
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        margin-top: calc(var(--edit-header-height) + 20px);
        margin-bottom: 20px;
        transform: translateX(10px);
        transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
    }

    .empty {
        position: absolute;
        z-index: 0;
        top: 0;
        top: 0;
        width: inherit;
    }

    .render {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
    }
}
</style>