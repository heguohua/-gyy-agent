<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:22:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-19 14:35:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-render" :style="styles" :class="pageClass">


        <!-- 渲染 页面 拖拽编辑区域组件 -->
        <EditorRenderDrag v-if="bType === 'page'" :blockList="blockList" :group="dragGroup" class="render"
            :bType="bType"></EditorRenderDrag>

        <!-- 渲染 大屏 拖拽编辑区域组件 -->
        <EditorRenderDrag v-else-if="bType === 'screen'" :blockList="blockList" :group="dragGroup" class="render"
            :bType="bType"></EditorRenderDrag>

        <!-- 渲染 表单 拖拽编辑区域组件 -->
        <EditorRenderDragForm v-else-if="bType === 'form'" :blockList="blockList" :group="dragGroup" class="render"
            :bType="bType" :labelWidth="labelWidth"></EditorRenderDragForm>



        <!-- 以下是空列表渲染节点 -->
        <el-empty class="empty" v-if="!blockList?.length" description="请拖拽左侧组件到此处">
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
import EditorRenderDrag from "./editor-render-drag.vue"
import EditorRenderDragForm from './editor-render-drag-form.vue';

const editorStore = useEditorStore()

const blockList = ref<BaseBlock[]>([])

// State
const props = defineProps({
    bType: {
        type: String,
        default: 'page'
    },
    width: {
        type: Number,
    },
    labelWidth: {
        type: Number,
        default: 120,
    },
})
const bType = props.bType

// Methods
watch(() => editorStore.blockConfig[bType], (value) => {
    logger.info(`bType[ ${bType} ],editor-render组件 【 监听到 】  editorStore.blockConfig 更新,即将更新 blockList.value`, value);
    blockList.value = value
}, {
    deep: true
})

interface Style {
    width: string
}

// 动态计算表单样式
const pageWidth = ref(500)
watch(() => editorStore.pageConfig[bType], (newValue) => {
    if (newValue.formData?.width.desktop) {
        pageWidth.value = newValue.formData?.width.desktop
        logger.info(`bType[ ${bType} ],editor-render组件 监听到【 editorStore.pageConfig 更新 】,即将更新 表单页面宽度：`, pageWidth.value);
    }
}, {
    deep: true
})

const styles = computed(() => {
    console.log('pageStyle---------->:', pageWidth);
    return { width: pageWidth.value + 'px' }
})

const pageClass = computed(() => {
    return { "is-mobile": editorStore.isMobileViewport(bType) }
})

</script>

<style scoped lang="scss">
.editor-render {
    container-type: inline-size;
    position: relative;
    width: 100%;
    background: white;
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
    margin: 0 auto;

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