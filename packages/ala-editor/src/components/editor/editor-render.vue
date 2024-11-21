<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:22:07
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 14:50:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-render.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-render" :style="pageStyle" :class="pageClass">


        <EditorRenderDrag :blockList="blockList" :group="dragGroup" class="render" :bType="bType"></EditorRenderDrag>


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

const editorStore = useEditorStore()

const blockList = ref<BaseBlock[]>([])
// State
const props = defineProps({
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

// Methods
// watch(() => list.value, (value) => {
//     logger.info(`editor-render组件 【 监听到 】  list.value 更新,即将更新 editorStore.blockConfig`, value);
//     editorStore.setBlockConfig(value)
// }, {
//     deep: true
// })

watch(() => editorStore.blockConfig[bType], (value) => {
    logger.info(`bType[ ${bType} ],editor-render组件 【 监听到 】  editorStore.blockConfig 更新,即将更新 blockList.value`, value);
    blockList.value = value
}, {
    deep: true
})


const pageStyle = computed(() => {
    return {}
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