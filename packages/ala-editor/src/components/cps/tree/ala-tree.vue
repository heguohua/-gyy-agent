<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-24 22:41:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/tree/ala-tree.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-tree-wrapper">

        <el-tree ref="treeRef" :data="treeData" node-key="id" :default-expand-all="true"
            @node-contextmenu="handleNodeContextMenu" :current-node-key="currentNodeId" @node-click="handleNodeClick">
            <template #default="{ node, data }">
                <span class="custom-node-label">{{ node.label }}</span>
            </template>
        </el-tree>
        <div class="" v-if="isMenuVisible">
            <el-popover :placement="placement" :reference-el="contextMenuTarget" width="100px">
                <p @click="handleAddNode">新增</p>
                <p @click="handleDeleteNode">删除</p>
                <p @click="handleMoveNode">移动</p>
            </el-popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { ElTree } from 'element-plus';
import { TreeNode, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types';


// State
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    position: {
        type: String as () => '' | 'top' | 'left' | 'right',
        default: 'left'
    },
    placeholder: {
        type: String,
        default: ''
    },
    fieldName: {
        type: String,
        default: ''
    },
    currentId: { // 当前被渲染组件ID
        type: String,
    },
    block: { // 当前被渲染组件 block
        type: Object,
    },
    bType: {
        type: String,
        default: 'page'
    },
    help: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconWidth: {
        type: Number,
        default: 30
    },
    iconHeight: {
        type: Number,
        default: 30
    }
})

const model = defineModel({
    type: String || Number || null || undefined
})

const emit = defineEmits(['callback', "init"])

const handleChange = (value: string) => {
    model.value = value
}

// Methods

logger.info(`bType[ ${props.bType} ]，渲染 动态表单 ala-tree 组件，props：`, props);


// // 发送组件初始化消息
if (props.bType === 'form') {
    // 组件挂载后再发送初始化消息
    watch(() => props.currentId, () => {
        logger.info(`向 editor-render-drag-form 组件【 发送初始化消息 】，当前组件 id[ ${props.currentId} ]`);

        emit('init', {
            pid: null,
            block: props.block,
        })
    }, {
        immediate: true
    })
}


const treeRef = ref<InstanceType<typeof ElTree> | null>(null);
const isMenuVisible = ref(false);
const placement = ref<"top" | "bottom" | "left" | "right">("bottom");
const contextMenuTarget = ref<HTMLElement | null>(null);
const selectedNode = reactive<TreeNodeData>({});
const currentNodeId = ref(); // 当前选中的节点 ID

const treeData = reactive<TreeNodeData[]>([
    {
        id: 1,
        label: "Node 1",
        children: [
            { id: 11, label: "Node 1-1" },
            { id: 12, label: "Node 1-2" },
        ],
    },
    {
        id: 2,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
        ],
    },
]);

const handleNodeContextMenu = (
    event: MouseEvent,
    data: TreeNodeData,
    node: TreeNode
) => {
    event.preventDefault();
    isMenuVisible.value = true;
    placement.value = "bottom";
    contextMenuTarget.value = event.target as HTMLElement;
    selectedNode.id = data.id;
    selectedNode.label = data.label;
    selectedNode.children = data.children;
};

const handleAddNode = () => {
    if (selectedNode) {
        const newNode: TreeNodeData = {
            id: Date.now(),
            label: `New Node ${Date.now()}`,
        };
        if (!selectedNode.children) {
            selectedNode.children = [];
        }
        selectedNode.children.push(newNode);
        isMenuVisible.value = false;
    }
};

const handleDeleteNode = () => {
    if (selectedNode) {
        const parent = treeRef.value?.getNode(selectedNode.id)?.parent;
        if (parent) {
            const parentData = parent.data as TreeNodeData;
            parentData.children = parentData.children?.filter(
                (child: { id: any; }) => child.id !== selectedNode.id
            );
        }
        isMenuVisible.value = false;
    }
};
const handleNodeClick = (data: { id: null; }) => {
    console.log('data:', data);

    currentNodeId.value = data.id; // 更新当前选中的节点 ID
};
const handleMoveNode = () => {
    // 实现移动逻辑，这里可以自定义
    console.log("移动节点功能尚未实现");
    isMenuVisible.value = false;
};
</script>

<style scoped lang="scss">
// :deep(.el-input__wrapper){
//     padding-left: 4px;
// }
// :deep(.el-input__prefix-inner>:last-child){
//     margin-right: 4px;
// }</style>