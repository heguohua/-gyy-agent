<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 10:02:47
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 10:51:42
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-block-drag.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="editor-block">
        <div class="left">
            <div class="menu-item" v-for="{ index, item } in menuList" :key="index"
                :class="{ 'is-active': index === activeMenu }" @click="activeMenu = index">

                <!-- <v-icon class="menu-icon" :icon="index === activeMenu ? item.iconActive : item.icon" /> -->

                <div class="menu-name">
                    {{ item.name }}
                </div>
            </div>

        </div>
        <div class="right">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Consistency" name="1">
                    <div class="">
                        ddd
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Feedback" name="2">
                    <div class="">
                        eee
                    </div>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
interface Menu {
    icon: string,
    iconActive: string,
    name: string,
}
const menuList = ref([
    {
        icon: "block",
        iconActive: "blockActive",
        name: "组件"
    },
    {
        icon: "kit",
        iconActive: "kitActive",
        name: "套件"
    }
])

const activeMenu = ref(0)
const activeNames = ref(["1", "2"])
const baseBlockList = ref([])
const seniorBlockList = ref([])


// Methods

</script>

<style scoped lang="scss"></style>