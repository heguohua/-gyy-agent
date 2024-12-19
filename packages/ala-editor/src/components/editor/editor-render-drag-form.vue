<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-19 14:25:40
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-render-drag-form.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-form :model="formData" :label-width="labelWidth">
        <div class="ala-design-form" ref="alaDesignForm">

            <draggable :list="blockList" :group="group" :sort="sort" animation="200" item-key="id"
                ghost-class="ghost-class" class="edit-render-drag" :clone="clone" :move="move">

                <template #item="{ element }">


                    <div class="block" :style="styles">
                        <!-- 
                            1、渲染嵌套组件 
                            2、更新 editorStore.currentSelect 值 
                        -->
                        <div v-if="element.nested && level < 2" class="block-nested-render"
                            :class="activeClass(element)" @click.stop="setCurrentSelect(element)"
                            @mouseenter="hoverId = element.id" @mouseleave="hoverId = ''">
                            <Transition name="fade">
                                <EditRenderHover v-show="hoverId === element.id" :id="element.id" :name="element.name"
                                    @copy="copy" @clear="clear" :bType="bType">

                                </EditRenderHover>
                            </Transition>
                            <!-- 
                                1、根据组件 code 动态渲染嵌套组件
                            -->
                            <component :is="getComponentNameByCode(element)" :key="bType + '-' + element.id"
                                :viewport="editorStore.viewport[bType]" :id="element.id" :formData="element.formData"
                                :children="element.children" :pid="pid" :block="element" @init="init" :bType="bType">

                                <template #default="{ childrenBlocks, index }">
                                    <EditRenderDragForm :blockList="childrenBlocks" :level="level + 1" :group="group"
                                        class="nested-item" :class="nestedClass"
                                        :key="bType + '-' + element.id + '-' + index" :pid="element.id + '-' + index"
                                        :bType="bType">
                                    </EditRenderDragForm>
                                </template>

                            </component>

                        </div>

                        <!-- 
                        
                            1、渲染普通组件 
                            2、更新 editorStore.currentSelect 值 
                        
                        -->
                        <div v-else class="block-render" :class="activeClass(element)"
                            @click.stop="setCurrentSelect(element)" @mouseenter="hoverId = element.id"
                            @mouseleave="hoverId = ''">
                            <Transition name="fade">
                                <EditRenderHover v-show="hoverId === element.id" :id="element.id" :name="element.name"
                                    @copy="copy" @clear="clear" :bType="bType">

                                </EditRenderHover>
                            </Transition>
                            <component :is="getComponentNameByCode(element)" :key="bType + '-' + element.id"
                                :viewport="editorStore.viewport[bType]" :id="element.id" :formData="element.formData"
                                :pid="pid" :block="element" :bType="bType"
                                v-bind="extractFormItemProps(element.formData)" @init="init" />
                            <!-- 通过 v-bind ，用于转换 baseBlock 属性到表单元素需要的 props 属性 -->
                        </div>

                    </div>


                </template>
            </draggable>

        </div>

    </el-form>

</template>

<script setup lang="ts">

import { move, clone, nestedClass, findNodeById, replaceNodeId, extractProps } from "@/components/editor/nested"
import { alaConsts } from "@/config/alaConsts";

import { useEditorStore } from "@/store/useEditorStore"
import { BaseBlock } from "@/types/editorType";
import { logger } from "@/utils/logger";
import EditRenderHover from "./edit-render-hover.vue";

const editorStore = useEditorStore()

defineOptions({
    name: 'EditRenderDragForm'
})

const props = defineProps({
    blockList: {
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
    pid: {
        type: String,
    },
    bType: {
        type: String,
        default: 'page'
    },
    width: {
        type: String,
        default: '500'
    },
    labelWidth: {
        type: Number,
    },
})
const bType = props.bType

const hoverId = ref('')

const getComponentNameByCode = computed(() => {
    return (element: { code: string }) => {
        const componentName = alaConsts.COMPONENT_PREFIX + element.code
        logger.info(`editor-render-drag-form组件中根据组件 code[ ${element.code} ]获取子组件名[ ${componentName} ]`);
        return componentName
    }
})


const activeClass = computed(() => {
    return (element: { id: string }) => {
        const id = editorStore.currentSelect[bType]?.id || ''
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
const setCurrentSelect = (block: BaseBlock) => {

    block.parent = props.pid
    logger.info("edit-block-drag-form组件 被点击,即将更新 editorStore.currentSelect 和 editorStore.blockConfig");

    const id = block.id;

    if (id) {
        if (editorStore.currentSelect[bType]?.id != id) {
            logger.info(`bType[ ${bType} ],当前 被点击block 和 editorStore.currentSelect【 不相同 】，即将更新editorStore.currentSelect，code【 ${block.code} 】,block：`, block);
            editorStore.setCurrentSelect(block, bType)

            // 向 editorStore 的 blockConfig 中追加 block
            // tod 这里是不是都改成 拖拽后自动初始化，如果做到了自动初始化，那么这里就不用再添加到 blockConfig 中了
            logger.info(`bType[ ${bType} ],当前 被点击block 和 editorStore.currentSelect【 不相同 】，即将添加当前block到blockConfig，code【 ${block.code} 】，block：`, block);
            editorStore.addToBlockConfigIfNotExist(block, bType)

        } else {
            logger.info(`bType[ ${bType} ],当前 被点击block 和 editorStore.currentSelect【 相同 】，不执行更新操作，code【 ${block.code} 】`, block);
        }
    } else {
        logger.error(`bType[ ${bType} ],【 注意，注意，注意 】，当前 被选中block的 id不存在`, block);
    }

}

// 接收子组件的初始化回调事件
const init = (data: { pid: string, block: BaseBlock }) => {
    const { pid, block } = data
    logger.info(`bType[ ${bType} ],接收到子组件【 init 回调 】，即将回调 setCurrentSelect 方法，父组件id[ ${pid} ]，当前组件id[ ${block.id} ]，当前组件数据`, block);
    console.log('接收到子组件初始化回调参数data：', data);
    setCurrentSelect(block)
}


const handleNodeById = (arr: BaseBlock[], nodeId: string, type: 'copy' | 'clear') => {
    return findNodeById(arr, nodeId, (params) => {
        const { array, node, index } = params
        if (type === 'copy') array.splice(index, 0, replaceNodeId(node))
        if (type === 'clear') array.splice(index, 1)
    })
}

const copy = (id: string) => {
    if (!editorStore.blockConfig[bType]?.length) return
    const newBlockConfig = handleNodeById(editorStore.blockConfig[bType], id, 'copy')
    editorStore.setCurrentSelect({}, bType)
    editorStore.setBlockConfig(newBlockConfig, bType)
}

const clear = (id: string) => {
    if (!editorStore.blockConfig[bType]?.length) return
    const newBlockConfig = handleNodeById(editorStore.blockConfig[bType], id, 'clear')
    editorStore.setCurrentSelect({}, bType)
    editorStore.setBlockConfig(newBlockConfig, bType)
}


const formData = ref({})

const extractFormItemProps = (item: any) => {
    return extractProps(item, "desktop")
}

// 动态计算表单样式
const styles = computed(() => {
    const style = { width: props.width + 'px' }
    logger.info(`计算 editor-render 区域页面宽度，style`, style);
    // return style
    return {}
})

// watch(editorStore.currentSelect.pageConfig?.[bType],()=>{

// })

const labelWidth = ref(props.labelWidth + 'px')

watch(() => editorStore.pageConfig[bType], (newValue) => {
    logger.info(`bType[ ${bType} ],editor-render-drag-form组件 监听到【 editorStore.pageConfig 更新 】,即将更新 el-form labelWidth`, newValue);
    if (newValue.formData?.labelWidth?.desktop) {
        labelWidth.value = newValue.formData?.labelWidth.desktop + 'px'
    }
}, {
    deep: true
})



// 动态计算 form 表单列内容（ class ： ala-form-base-item ） 宽度 
const alaDesignForm = ref<HTMLElement>()

watchEffect(() => {
    const width = editorStore.pageConfig.form.formData?.width.desktop || 400
    const labelWidth = editorStore.pageConfig.form.formData?.labelWidth.desktop || 120
    const columnNum = editorStore.pageConfig.form.formData?.columnNum.desktop || 1

    const columnGapWidth = 16
    const totalColumnGapWidth = (columnNum - 1) * columnGapWidth

    const paddingWidth = 32

    logger.info(`重新计算动态form渲染区域组件宽度，page width[ ${width} ]，form labelWidth[ ${labelWidth} ]，form columnNum[ ${columnNum} ]，form columnGapWidth[ ${columnNum} ]，form totalColumnGapWidth[ ${totalColumnGapWidth} ]，form paddingWidth[ ${paddingWidth} ]`);

    // 计算 列宽度
    // (总宽度 - totalColumnGapWidth)/columnNum
    const columnWidth = Math.floor((width - paddingWidth - totalColumnGapWidth) / columnNum) 
    alaDesignForm.value?.style.setProperty('--ala-form-design-item-width', columnWidth + 'px');

})

</script>

<style scoped lang="scss">
.edit-render-drag {
    width: 100%;
    height: 100%;
    padding: 16px;

    .block {
        width: var(--ala-form-design-item-width);

        .block-nested-render {
            .nested-item {}
        }

        div {}
    }

    .element {
        position: relative;
    }

    :deep(.el-form-item__label) {
        text-align: right !important;
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
    border: 1px dashed #fff;

    // margin-bottom: 1px;
    &:hover,
    &.is-active {
        border-color: var(--color-edit-render-block-border-hover);
        // 在表面蒙上一层，加上边框，防止组件可以交互
        // &::after {
        //     content: '';
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     right: 0;
        //     bottom: 0;
        //     border: 1px dashed var(--color-edit-render-block-border-hover);
        // }
    }
}
</style>