<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:21:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-03 16:00:06
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-block.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-block">

        <div class="left">
            <div class="menu-item" v-for="( item, index ) in menuList" :key="bType + '-' + index"
                :class="{ 'is-active': index === activeMenu }" @click="activeMenu = index">
                <v-icon class="menu-icon" :icon="index === activeMenu ? item.iconActive : item.icon" />

                <div class="menu-name">
                    {{ item.name }}
                </div>

            </div>

        </div>

        <div class="right">
            <el-collapse v-model="activeNames" @change="handleChange">

                <!-- 渲染 基础组件 可拖拽区域 -->
                <el-collapse-item :title="$t('module.lowcoding.baseBlock')" name="1">

                    <editor-block-drag :list="baseBlocks" :sort="false"
                        :group="{ name: dragGroup, pull: 'clone', put: false }" :bType="bType">
                    </editor-block-drag>

                </el-collapse-item>

                <!-- 渲染 高级组件 可拖拽区域 -->
                <el-collapse-item :title="$t('module.lowcoding.seniorBlock')" name="2">

                    <editor-block-drag :list="seniorBlocks" :sort="false"
                        :group="{ name: dragGroup, pull: 'clone', put: false }" :bType="bType"
                        class="editor-block-drag-senior">

                    </editor-block-drag>

                </el-collapse-item>


                <!-- 渲染 高级组件 可拖拽区域 -->
                <el-collapse-item :title="$t('module.lowcoding.businessBlock')" name="3">

                    <editor-block-drag :list="businessFields" :sort="false"
                        :group="{ name: dragGroup, pull: 'clone', put: false }" :bType="bType"
                        class="editor-block-drag-senior">

                    </editor-block-drag>

                </el-collapse-item>

            </el-collapse>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import i18n, { fetchLocaleMessages } from '@/utils/i18n/i18n';
// const { global: { t } } = i18n
import { dragGroup } from './nested';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
const props = defineProps({
    bType: {
        type: String,
        default: 'page'
    },
    menuList: {
        type: Array<{
            name: '',
            icon: '',
            iconActive: '',
        }>,
        default: [{
            name: '',
            icon: '',
            iconActive: '',
        }]
    },
    baseBlocks: {
        type: Array,
        default: []
    },
    seniorBlocks: {
        type: Array,
        default: []
    },
    businessFields: {
        type: Array,
        default: []
    },
})
const bType = props.bType

const activeMenu = ref(0)
const activeNames = ref(["1", "2", "3"])


const handleChange = () => {

}
// Methods

</script>

<style scoped lang="scss">
.editor-block {
    flex-shrink: 0;
    background: white;
    border-right: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-start;
    width: var(--edit-block-width);

    .left {
        width: 70px;
        height: calc(100vh - var(--edit-header-height));
        border-right: 1px solid var(--color-border);

        .menu-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            padding: 5.5px 0;
            border-radius: var(--border-radius);
            cursor: pointer;
            margin: 17px 5px;
            align-items: center;

            &.is-active,
            &:hover {
                background: var(--color-block-hover);
                border-radius: var(--border-radius);
            }

            .menu-icon {
                width: 30px;
                height: 30px;
                margin: 0 auto;
            }

            .menu-name {
                font-size: 14px;
                line-height: 14px;
                padding-top: 4px;
                overflow-wrap: break-word;
            }
        }

    }

    .right {
        flex: 1;
        height: calc(100vh - var(--edit-header-height));
        overflow: auto;

        &::-webkit-scrollbar {
            width: 2%;
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

    :deep(.el-collapse) {
        border: 0;
    }

    :deep(.el-collapse-item__header) {
        padding-left: 14px;
        font-size: 14px;
    }

    :deep(.el-collapse-item__content) {
        padding-left: 14px;
        padding-right: 14px;
        padding-bottom: 14px;
    }

    :deep(.block-item) {
        svg {
            width: 22px;
            height: 22px;
            opacity: 0.8;
        }
    }
}
</style>
<style>
.editor-block-drag-senior {
    .block-item {
        width: 50% !important;
        max-height: 60px;


    }
}
</style>