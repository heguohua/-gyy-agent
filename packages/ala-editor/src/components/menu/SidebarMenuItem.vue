<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 21:03:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 08:44:59
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/menu/SidebarMenuItem.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <!-- <el-sub-menu :index="`${item.id}`" class="ala-sub-menu"> -->
    <el-sub-menu :index="`${item.url}`" class="ala-sub-menu">
        <!-- 1、先渲染当前节点 -->
        <template #title>
            <v-icon :icon="item.icon" :height="`${item.height || 16}px`" :width="`${item.width || 16}px`" />
            <span>{{ item.name }}</span>
        </template>

        <!-- 2、直接遍历子节点并进行渲染 -->
        <template v-for="child in item.children" :key="child.id">

            <!-- 3、如果当前节点不存在子节点，直接渲染普通菜单 -->
            <!-- <el-menu-item v-if="!child.children || child.children.length === 0" :index="`${child.id}`" -->
            <el-menu-item v-if="!child.children || child.children.length === 0" :index="`${child.url}`"
                @click="handleSelect(child)">
                <v-icon :icon="child.icon" :height="`${child.height || 16}px`" :width="`${child.width || 16}px`" />
                <span>{{ child.name }}</span>
            </el-menu-item>

            <!-- 4、如果当前节点又存在子节点，那么调用自身来渲染子菜单 -->
            <SidebarMenuItem v-else :item="child" :is-collapse="isCollapse"
                @toggle-collapse="$emit('toggle-collapse')" />

        </template>

    </el-sub-menu>

</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Menu from '@/types/menuType';
import { logger } from '@/utils/logger';
import { allMenuComponents } from '@/utils/menuRegister';
import router from '@/router';
import lstore from '@/utils/lstore';
import { alaConsts } from '@/config/alaConsts';

defineOptions({
    name: "SidebarMenuItem"
})

defineProps<{
    item: Menu,
    isCollapse: Boolean
}>();



// Methods
const emits = defineEmits(['toggle-collapse']);
const handleSelect = (child: Menu) => {
    // const menu = allMenuComponents[child.url]
    // if (menu) {
    //     logger.info(`即将切换菜单${child.name}, menu.url[${child.url}], component name[${menu.name}], component path[${menu.component}]`);
    //     // router.push({ path: child.url})
    //     router.push({ name: menu.name })
    //     // lstore.setItem(alaConsts.current_router_name, menu.name)
    //     // router.push({ name: 'console-router-view', path: child.url })
    // } else {
    //     logger.error(`menu.url[${child.url}]对应的菜单未在[ menuRegister.ts ]的[ allMenuComponents ]中注册`);
    // }
};
</script>

<style scoped lang="scss">
.ala-sub-menu {
    .ala-icon {}

    span {}
}
</style>