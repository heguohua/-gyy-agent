<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 20:47:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-11 15:57:22
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/side-bar.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-ala" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse">
            <template v-for="item in menuData">
                <el-sub-menu v-if="item.children && item.children.length" :index="item.index" :key="item.index">
                    <template #title>
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.index" :key="child.index">
                        {{ child.title }}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.index" :key="item.index">
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <div class="collapse-btn" @click="toggleCollapse">
            <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </div>
    </el-aside>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { ElAside, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';

const props = defineProps({
    menuData: Array
});

const isCollapse = ref(false);

const handleOpen = (key, keyPath) => {
};

const handleClose = (key, keyPath) => {
};

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};
</script>

<style scoped lang="scss">
.el-menu-vertical-ala {
    i {}

    span {}

    &:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
}

.collapse-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
    padding: 10px;
    background-color: #d3dce6;
    color: #fff;
    text-align: center;
    font-size: 20px;
    transform: translateY(50%);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    .el-icon-arrow-right {}

    .el-icon-arrow-left {}
}
</style>