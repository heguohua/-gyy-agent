<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 21:03:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 21:31:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/menu/SidebarMenuItem.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <el-sub-menu :index="item.index">
        <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
        </template>
        <!-- 递归调用自身来渲染子菜单 -->
        <template v-for="child in item.children" :key="child.index">
            <SidebarMenuItem v-if="child.children && child.children.length" :item="child" :is-collapse="isCollapse"
                @toggle-collapse="$emit('toggle-collapse')" />
            <el-menu-item v-else :index="child.index">
                <i :class="child.icon"></i>
                <span>{{ child.title }}</span>
            </el-menu-item>
        </template>
    </el-sub-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue';

defineOptions({
    name: "SidebarMenuItem"
})



// State
interface Menu {
    index: string,
    icon: string,
    title: string,
    children: Array<Menu>,
}
const props = defineProps<{
    item: Menu,
    isCollapse: Boolean
}>();



// Methods
const emits = defineEmits(['toggle-collapse']);

</script>

<style scoped lang="scss"></style>