<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-04 22:43:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/tree/ala-tree.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-tree-wrapper">

        <div class="title">
            <span>{{ title }}</span>
            <VIconTooltip width="20px" height="20px" content="新增顶级节点" effect="light" v-if="displayAddSubButton()">
                <img src="/crud/add.svg" style="width: 20px;height: 20px;" @click="handleAddTopFolder" />
            </VIconTooltip>
        </div>

        <div class="ala-tree">
            <el-tree ref="treeRef" :data="treeData" node-key="id" :default-expanded-keys="expandedKeys"
                :expand-on-click-node="false" :currentNodeKey="currentNodeKey" @node-contextmenu.stop="showButtonsMenu"
                @node-click="handleNodeClick" :checkStrictly="checkStrictly">

                <template #default="{ node, data }">
                    <v-icon image="/tree/folder.svg" width="30px" height="20px" />
                    <span class="custom-node-label">{{ data.name }}</span>
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

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="params" :fields="basicFields" :formData="formData"
        labelPosition="top" :moduleName="title" :url="addUrl" :updateUrl="updateUrl"
        :tipTitle="$t('pop.warm_title')" :formAttr="formAttr" />

</template>

<script setup lang="ts">
import { alaBuildHidden, alaBuildInput } from '@/config/alaBuilders';
import { alaRequired } from '@/config/alaRules';
import { logger } from '@/utils/logger';
import { alaDelete, alaPost } from '@/utils/req';
import u from '@/utils/u';
import { ElTree } from 'element-plus';
import { TreeNode, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types';
import { TreeKey } from 'element-plus/es/components/tree/src/tree.type';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


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
    },
    addUrl: {
        type: String,
        default: ''
    },
    updateUrl: {
        type: String,
        default: ''
    },
    deleteUrl: {
        type: String,
        default: ''
    },
    treeUrl: {
        type: String,
        default: ''
    },
    checkStrictly: {
        type: Boolean,
        default: true
    },
})

// 表单数据保存对象
const formData = ref({
})

// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})


const emit = defineEmits(["refresh"])


// Methods

logger.info(`bType[ ${props.bType} ]，渲染 动态表单 ala-tree 组件，props：`, props);

const treeRef = ref<InstanceType<typeof ElTree> | null>(null);
const showButtons = ref(false);
const selectedNode = reactive<TreeNodeData>({});
const currentNode = ref(); // 当前选中的节点 
const buttonMenuPosition = ref({ x: 0, y: 0 });

const treeData = ref<TreeNodeData[]>([]);

const showButtonsMenu = (
    event: MouseEvent,
    data: TreeNodeData,
    node: TreeNode
) => {
    // 显示菜单
    showButtons.value = true;
    // 设置菜单位置
    buttonMenuPosition.value = { x: event.clientX - 8, y: event.clientY - 8 };
    currentNode.value = data; // 更新当前选中的节点 ID
};

const handleNodeClick = (data: { id: null; }) => {
    currentNode.value = data; // 更新当前选中的节点 ID
};


const displayEditButton = () => {
    return props.updateUrl ? true : false;
}

const displayDeleteButton = () => {
    return props.deleteUrl ? true : false;
}

const displayAddSubButton = () => {
    return props.addUrl ? true : false;
}

const handleMouseLeave = () => {
    showButtons.value = false
}

const handleAddTopFolder = () => {
    const params = { pid: 0, name: '' }
    if (baseInfo.treeFormData) {
        u.merged(params, baseInfo.treeFormData)
    }

    formData.value = params
    showDrawer.value = true
}

const handleAddSub = () => {
    const params = { pid: currentNode.value.id, name: '' }
    if (baseInfo.treeFormData) {
        u.merged(params, baseInfo.treeFormData)
    }

    formData.value = params
    showDrawer.value = true
}

const handleDelete = () => {
    alaDelete(u.url(props.deleteUrl), { id: currentNode.value.id }, false).then((data: any) => {
        formData.value = {}
        queryTree()
    });
}

const handleEdit = () => {
    u.merged(formData.value, currentNode.value)

    showDrawer.value = true
}

// 监听表单回调事件
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    formData.value = {}
    // 刷新树
    queryTree()

    emit('refresh', data)
}

const params = ref({
    baseInfo: {
        type: Object,
        default: {
            id: null,
            pid: 0,
            moduleName: "文件夹",
            item: {}
        }
    },
})

// 基础表单字段
const basicFields = computed(() => {
    return [
        alaBuildHidden('pid'),// 固定格式
        alaBuildHidden('id'),// 固定格式
        alaBuildHidden('nodeType'),
        alaBuildInput("name", props.title.replaceAll('管理', '') + '名称', [alaRequired()]),

    ]
})


const formAttr = ref({
    formWidth: 500,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})

const expandedKeys = ref<TreeKey[]>([])
const currentNodeKey = ref("")
// const checkedKeys = ref<TreeKey[]>([0])
const queryTree = () => {

    alaPost(u.url(props.treeUrl), {}, true, '').then((data: any) => {
        const response = data;
        if (response.data) {

            const data = response.data
            if (data && data.length > 0) {
                // 查找需要展开的 expandedKeys
                const keys: Array<Number> = [];

                data.forEach((item: { [key: string]: any }) => {
                    keys.push(item.id);  // 添加第一级节点
                    if (item.children) {
                        item.children.forEach((child: { [key: string]: any }) => {
                            keys.push(child.id);  // 添加第二级节点
                        });
                    }
                });
                expandedKeys.value = keys as TreeKey[]
                // 重设 tree 数据
                treeData.value = data

                // 如果 currentNode 不存在，则默认选中第一个
                currentNode.value = data[0]

            } else {
                treeData.value = []
            }

        }

    });
}

queryTree()

const baseInfo = inject('baseInfo') as { [key: string]: any };

console.log('baseInfo:', baseInfo.moduleName);


// 更新分页列表页面 baseInfo 中的folder属性
watch(() => currentNode.value, (value: any) => {
    baseInfo.folder = value
    currentNodeKey.value = value.id
})

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

        :deep(.el-icon) {
            svg {
                scale: 1.2;
            }
        }

        :deep(.is-current > .el-tree-node__content) {
            background: var(--el-tree-node-hover-bg-color)
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

    }


}
</style>