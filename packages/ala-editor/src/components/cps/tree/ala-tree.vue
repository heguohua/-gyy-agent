<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-25 17:41:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/tree/ala-tree.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-tree-wrapper">

        <div class="title">
            <span>{{ title }}</span>
            <VIconTooltip width="20px" height="20px" content="新增顶级节点" effect="light">
                <img src="/crud/add.svg" style="width: 20px;height: 20px;" />
            </VIconTooltip>
        </div>

        <div class="ala-tree">
            <el-tree ref="treeRef" :data="treeData" node-key="id" :default-expand-all="true"
                @node-contextmenu.stop="showButtonsMenu" :current-node-key="currentNodeId"
                @node-click="handleNodeClick">

                <template #default="{ node, data }">
                    <v-icon image="/tree/folder.svg" width="30px" height="20px" />
                    <span class="custom-node-label">{{ node.label }}</span>
                </template>

            </el-tree>
        </div>

        <div class="buttonMenu" v-if="showButtons"
            :style="{ position: 'absolute', left: `${buttonMenuPosition.x}px`, top: `${buttonMenuPosition.y}px` }"
            @mouseleave="handleMouseLeave">

            <!-- 注意，注意，注意： 这里的AlaButton不再支持 popConfirm 属性 ！！！ -->
            <AlaButton :showButton="displayEditButton()" name="edit" @edit="handleEdit()" image="/crud/edit.svg"
                iconWidth="18px" iconHeight="18px" />
            <AlaButton :showButton="displayAddSubButton()" name="addSub" @addSub="handleAddSub()" image="/crud/add.svg"
                iconWidth="20px" iconHeight="20px" />
            <AlaButton :showButton="displayDeleteButton()" name="delete" @delete="handleDelete()"
                image="/crud/delete.svg" iconWidth="18px" iconHeight="18px" />

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
    title: {
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
const showButtons = ref(false);
const selectedNode = reactive<TreeNodeData>({});
const currentNodeId = ref(); // 当前选中的节点 ID
const buttonMenuPosition = ref({ x: 0, y: 0 });

const treeData = reactive<TreeNodeData[]>([
    {
        id: 1,
        label: "Node 1",
        children: [
            { id: 11, label: "Node 1-1" },
            { id: 12, label: "Node 1-2" },
            { id: 13, label: "Node 1-1" },
            { id: 14, label: "Node 1-2" },
        ],
    },
    {
        id: 2,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 3,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 43,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 43,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 43,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 43,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 43,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
    {
        id: 43,
        label: "Node 2",
        children: [
            { id: 21, label: "Node 2-1" },
            { id: 22, label: "Node 2-2" },
            { id: 23, label: "Node 2-1" },
            { id: 24, label: "Node 2-2" },
        ],
    },
]);

const showButtonsMenu = (
    event: MouseEvent,
    data: TreeNodeData,
    node: TreeNode
) => {
    // 显示菜单
    showButtons.value = true;

    // 设置菜单位置
    buttonMenuPosition.value = { x: event.clientX - 8, y: event.clientY - 8 };

    console.log('data:', data.label);


};


const handleNodeClick = (data: { id: null; }) => {
    currentNodeId.value = data.id; // 更新当前选中的节点 ID
};


const handleEdit = () => {
    console.log('edit:');
}

const handleDelete = () => {
    console.log('edit:');
}

const handleAddSub = () => {
    console.log('edit:');
}

const displayEditButton = () => {
    return true;
}
const displayDeleteButton = () => {
    return true;
}
const displayAddSubButton = () => {
    return true;
}

const handleMouseLeave = () => {
    showButtons.value = false
}

</script>

<style scoped lang="scss">
.ala-tree-wrapper {

    /* Safari */
    -webkit-user-select: none;
    /* Firefox */
    -moz-user-select: none;
    /* IE/Edge */
    -ms-user-select: none;
    /* 标准语法 */
    user-select: none;

    margin-right: 4px;
    height: 100vh;

    .title {
        background: #fff;
        padding: 4px 0px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-bottom: 2px;

        span {
            width: 80%;
        }

        .button-add {}

        :deep(.icon-image) {
            width: 20%;
            cursor: pointer;

            &:hover {
                img {
                    fill: var(--el-button-bg-color);
                }
            }
        }
    }


    .ala-tree {
        padding: 8px;
        background: #fff;
        height: calc(100vh - 100px);
        overflow-y: auto;
        padding-bottom: 100px;

        &::-webkit-scrollbar {
            width: 4px;
            /* 设置滚动条的宽度 */
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #e2e2e2;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #e2e2e2;
        }
    }

    // .ala-tree::-webkit-scrollbar {
    //     width: 4px;
    //     /* 设置滚动条的宽度 */
    // }


    .buttonMenu {
        padding: 12px 0px;
        border-radius: 4px;
        z-index: 2000;
        background: #fff;

        border: 1px solid #e4e7ed;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: center;
        flex-wrap: wrap;
        flex-direction: column;

        :deep(.ala-button-wrapper) {
            width: 100%;
            padding: 4px 0px;
            display: flex;

            &:hover {
                background: #F3F7FA;
            }
        }

        :deep(.ala-button-wrapper button) {
            width: inherit;
            font-size: 0.9rem;
            border: none;
            background: none;

            &:hover {
                background: none;
            }

        }

        :deep(.ala-button-wrapper button span) {
            font-weight: normal;

            &:hover {
                color: none;
            }

        }

        p {}
    }

    div {
        p {}
    }
}
</style>