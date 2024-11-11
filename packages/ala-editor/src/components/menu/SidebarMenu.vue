<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 21:13:37
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 10:38:24
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/menu/SidebarMenu.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="side-bar">

        <el-aside class="ala-aside">
            <el-menu class="el-menu-vertical-ala" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                :default-active="activeMenu" router>

                <!-- 递归渲染菜单项 -->
                <template v-for="item in menuList" :key="item.url">

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
import { logger } from '@/utils/logger';
import lstore from '@/utils/lstore';

defineProps({
    menuList: Array<Menu>
});

const isCollapse = ref(false);

const handleOpen = (key: any, keyPath: any) => {
    // console.log(key, keyPath);
};

const handleClose = (key: any, keyPath: any) => {
    // console.log(key, keyPath);
};

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};

const route = useRoute();
const activeMenu = ref('/');

watch(() => route.path, (toPath) => {
    activeMenu.value = toPath;
    // 导航变化时，更新 localStorage
    logger.info(`监听到路由变化，更新localStorage中的路由为：${toPath}`);
    lstore.setItem('activeMenu', toPath);
});


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

        :deep .el-menu-item:hover {
            background: var(--el-menu-active-bg);
            color: var(--el-menu-active-color) !important;
        }

        :deep .el-sub-menu .is-active,
        :deep .el-sub-menu.is-active {
            background-color: var(--el-menu-active-bg);
            // font-weight: bold;
        }

        :deep .el-sub-menu .is-active {
            font-weight: bold;

            &::before {
                /* 必须设置 content 属性，即使它是空的 */
                content: '';
                /* 设置绝对定位，以便可以相对于父元素定位 */
                position: absolute;
                /* 从父元素顶部开始 */
                top: 0;
                /* 从父元素左侧开始 */
                left: 0;
                /* 设置宽度为 5px */
                width: var(--el-menu-active-before-width);
                /* 设置高度等于父元素的高度 */
                height: 100%;
                /* 设置背景色为蓝色 */
                background-color: var(--el-menu-active-before-bg);

            }
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