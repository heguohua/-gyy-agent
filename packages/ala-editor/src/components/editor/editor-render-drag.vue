<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-23 11:49:54
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-render-drag.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <draggable :list="list" :group="group" :sort="sort" animation="200" item-key="id" ghost-class="ghost-class"
        class="edit-render-drag" :clone="clone" :move="move">

        <template #item="{ element }">
            <div class="element">

                <!-- 
                    1、渲染嵌套组件 
                    2、更新 editorStore.currentSelect 值 
                -->
                <div v-if="element.nested && level < 2" class="block-nested-render" :class="activeClass(element)"
                    @click.stop="setCurrentSelect(element)">

                    <!-- 
                        1、根据组件 code 动态嵌套组件
                    -->
                    <component :is="renderComponentCode(element)" :data="element.formData" :children="element.children"
                        :viewport="editorStore.viewport" :key="element.id">

                        <template #default="{ columnBlocks, index }">
                            <edit-render-drag :list="columnBlocks" :level="level + 1" :group="group" class="nested-item"
                                :class="nestedClass" :key="element.id + '-' + index">
                            </edit-render-drag>
                        </template>

                    </component>

                </div>

                <!-- 
                
                    1、渲染普通组件 
                    2、更新 editorStore.currentSelect 值 
                 
                -->
                <div v-else class="block-render" :class="activeClass(element)" @click.stop="setCurrentSelect(element)">
                    <component :is="renderComponentCode(element)" :data="element.formData"
                        :viewport="editorStore.viewport" />
                </div>

            </div>
        </template>
    </draggable>

</template>

<script setup lang="ts">

import { move, clone, nestedClass } from "@/components/editor/nested"
import { alaConsts } from "@/config/alaConsts";

import { useEditorStore } from "@/store/useEditorStore"
import { BaseBlock } from "@/types/editorType";
import { logger } from "@/utils/logger";

const editorStore = useEditorStore()

defineOptions({
    name: 'edit-render-drag'
})

const props = defineProps({
    list: {
        type: Array,
        required: true,
        default: () => []
    },
    group: {
        type: [String, Object],
        default: 'group'
    },
    sort: {
        type: Boolean,
        default: true,
    },
    level: {
        type: Number,
        default: 1,
    },
})

const renderComponentCode = computed(() => {
    return (element: { code: string }) => {
        const componentName = alaConsts.COMPONENT_PREFIX + element.code
        logger.info(`editor-render-drag组件中根据组件 code[ ${componentName} ]渲染子组件`);
        return componentName
    }
})


const activeClass = computed(() => {
    return (element: { id: string }) => {
        const id = editorStore.currentSelect?.id || ''
        return { "is-active": element.id === id }
    }
})
onMounted(() => {
    logger.info(`edit-render-drag 组件已挂载, 当前level ` + props.level);

})
// State

// Methods

// const addedBlock = (element) => {
//     setCurrentSelect(element)
// }
/**
 * 1）将当前选中的 BaseBlock 存储到 editorStore 中的 currentSelect 中
 * 2）同时将当前 BaseBlock 存储到 editorStore 中的 blockConfig[] 中（ 如果不存在则添加）
 * @param element 
 */
const setCurrentSelect = (element: BaseBlock) => {

    logger.info("edit-block-drag组件 被点击,即将更新 editorStore.currentSelect 和 editorStore.blockConfig");

    editorStore.setCurrentSelect(element)

    editorStore.addBlockConfigNotExist(element)

}

</script>

<style scoped lang="scss">
.edit-render-drag {
    width: 100%;
    height: 100%;

    .element {
        position: relative;
    }
}

.nested-item {
    border: 1px solid var(--color-edit-render-block-border);
    //   background: var(--color-edit-render-block-bg);
    height: 100%;
    min-height: inherit;

    &+.nested-item {
        border-left: 0;
    }
}

.block-nested-render,
.block-render {
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
}

.block-nested-render {

    &:hover,
    &.is-active {
        // 注意不能像block-render做成after，否则组件无法拖入嵌套容器里
        border: 1px dashed var(--color-edit-render-block-border-hover);
    }
}

.block-render {
    position: relative;

    &:hover,
    &.is-active {

        // 在表面蒙上一层，加上边框，防止组件可以交互
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px dashed var(--color-edit-render-block-border-hover);
        }
    }
}
</style>