<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 21:13:37
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-10 16:32:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/menu/SidebarMenu.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="side-bar">

        <el-aside class="ala-aside">
            <el-menu default-active="1" class="el-menu-vertical-ala" @open="handleOpen" @close="handleClose"
                :collapse="isCollapse">

                <!-- 递归渲染菜单项 -->
                <template v-for="item in menuList" :key="item.id">

                    <!-- 渲染菜单 -->
                    <SidebarMenuItem :item="item" :is-collapse="isCollapse" @toggle-collapse="toggleCollapse" />

                </template>

            </el-menu>
            <div class="collapse-btn" @click="toggleCollapse">
                <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
            </div>
        </el-aside>
    </div>

</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import SidebarMenuItem from '@/components/menu/SidebarMenuItem.vue'; // 引入递归子组件
import Menu from '@/types/menuType';

defineProps({
    menuList: Array<Menu>
});

const isCollapse = ref(false);

const handleOpen = (key: any, keyPath: any) => {
    console.log(key, keyPath);
};

const handleClose = (key: any, keyPath: any) => {
    console.log(key, keyPath);
};

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};


</script>

<style scoped lang="scss">
.side-bar {
    padding-top: var(--el-menu-item-height);
    height: 100%;

    .ala-aside {
        // width: var(--ala-menu-width);
        height: inherit;

        :deep>ul {
            // width: inherit;
            height: inherit;

        }

        :deep .el-menu .el-menu-item:hover {
            background: rgb(67, 156, 249, 0.2) !important;
            color: #fb2e4d !important;
        }

        :deep .el-menu .is-opened {
            background-color: rgb(67, 156, 249, 0.1);
        }

        // :deep .el-sub-menu__title{
        //     padding-left: calc(var(--el-menu-base-level-padding) + var(--el-menu-level)* var(--el-menu-level-padding)) !important;
        // }
        // :deep .el-menu-item{
        //     padding-left: calc(var(--el-menu-base-level-padding) + var(--el-menu-level)* var(--el-menu-level-padding)) !important;
        // }
        :deep .el-icon-circle-plus-outline {
            width: 0px !important;
        }

        .el-menu-vertical-ala {
            .ala-icon {}

            i {}

            span {}
        }

        .collapse-btn {
            // width: var(--ala-menu-width);
            position: absolute;
            bottom: 0;
            left: 0;
            cursor: pointer;
            padding: 10px;
            background-color: #d3dce6;
            color: #fff;
            text-align: center;
            font-size: 20px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;

            .el-icon-arrow-right {}

            .el-icon-arrow-left {}
        }
    }





}
</style>