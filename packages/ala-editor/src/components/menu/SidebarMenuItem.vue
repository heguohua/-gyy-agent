<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 21:03:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-10 12:52:28
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/menu/SidebarMenuItem.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <el-sub-menu :index="`${item.id}`" class="ala-sub-menu">
        <!-- 1、先渲染当前节点 -->
        <template #title>
            <v-icon :icon="item.icon" :height="`${item.height || 16}px`" :width="`${item.width || 16}px`" />
            <span>{{ item.name }}</span>
        </template>

        <!-- 2、直接遍历子节点并进行渲染 -->
        <template v-for="child in item.children" :key="child.id">


            <!-- 3、如果当前节点不存在子节点，直接渲染普通菜单 -->
            <el-menu-item v-if="!child.children || child.children.length === 0" :index="`${child.id}`">
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

defineOptions({
    name: "SidebarMenuItem"
})

defineProps<{
    item: Menu,
    isCollapse: Boolean
}>();



// Methods
const emits = defineEmits(['toggle-collapse']);

</script>

<style scoped lang="scss">
.ala-sub-menu {
    .ala-icon {}

    span {}
}
</style>