<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-26 21:37:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/drawer/ala-drawer.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-drawer-wrapper">

        <el-drawer v-model="showDrawer" :direction="direction" :before-close="handleClose" class="ala-drawer"
            :size="width" :with-header="withHeader()">

            <template #header v-if="withHeader()">
                <h4>{{ title }}</h4>
            </template>

            <template #default>
                <slot name="content"></slot>
            </template>

            <template #footer>
                <slot name="footer"></slot>
            </template>

        </el-drawer>

    </div>

</template>

<script setup lang="ts">
import { DrawerProps } from 'element-plus';
import { ref } from 'vue'

// State
const props = defineProps({
    title: {
        type: String,
    },
    width: {
        type: String,
        default: 500
    }
})

const withHeader = () => {
    return props.title ? true : false
}

const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const direction = ref<DrawerProps['direction']>('rtl')
// Methods
// ##########################  以下是公共方法，不需要修改  #########################################

const emits = defineEmits(["beforeClose"])

const handleClose = (done: () => void) => {
    emits("beforeClose", done)
}


</script>

<style lang="scss">
.ala-drawer-wrapper {
    .ala-drawer {
        .el-drawer__header {
            display: flex;
            padding: 0px !important;
            margin: 0px !important;
            color: #3d446e !important;
            font-size: 1.1rem !important;
            background: #F9F9FA !important;
            padding: 4px 0px !important;
        }

        .el-drawer__body {
            text-align: left;
            display: flex;
            overflow-y: auto;
            flex-wrap: wrap;
            padding: 20px 26px;
            align-items: flex-start;
            align-content: flex-start;
            padding-bottom: 30px;

            &::-webkit-scrollbar {
                width: 4px;
                /* 设置滚动条的宽度 */
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            &::-webkit-scrollbar-thumb {
                background: #b2b2b2;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #b2b2b2;
            }

        }

        .el-drawer__footer {
            padding-bottom: 6px;
        }

        .el-drawer__footer {
            position: absolute;
            bottom: 0px;
            right: 0px;
        }

    }
}
</style>