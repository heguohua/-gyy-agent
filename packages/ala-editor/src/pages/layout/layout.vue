<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 23:08:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/layout/layout.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="layout">
        <LayoutHeader />
        <SidebarMenu :menuList="menuList" />
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarMenu from "@/components/menu/SidebarMenu.vue"
import LayoutHeader from "@/pages/layout/layout-header.vue"

// State
const menuList = [
    {
        "index": "1",
        "title": "导航一",
        "icon": "el-icon-message",
        "children": [
            {
                "index": "1-1",
                "title": "选项1",
                "icon": "el-icon-circle-plus"
            },
            {
                "index": "1-2",
                "title": "选项2",
                "icon": "el-icon-circle-plus",
                "children": [
                    {
                        "index": "1-2-1",
                        "title": "子选项1",
                        "icon": "el-icon-circle-plus-outline"
                    },
                    {
                        "index": "1-2-2",
                        "title": "子选项2",
                        "icon": "el-icon-remove-outline"
                    }
                ]
            }
        ]
    },
    {
        "index": "2",
        "title": "导航二",
        "icon": "el-icon-menu",
        "children": [
            {
                "index": "2-1",
                "title": "选项3",
                "icon": "el-icon-circle-plus"
            },
            {
                "index": "2-2",
                "title": "选项4",
                "icon": "el-icon-circle-plus",
                "children": [
                    {
                        "index": "2-2-1",
                        "title": "子选项3",
                        "icon": "el-icon-circle-plus-outline"
                    }
                ]
            }
        ]
    },
    {
        "index": "3",
        "title": "导航三",
        "icon": "el-icon-setting",
        "children": [
            {
                "index": "3-1",
                "title": "设置一",
                "icon": "el-icon-gear"
            },
            {
                "index": "3-2",
                "title": "设置二",
                "icon": "el-icon-gear",
                "children": [
                    {
                        "index": "3-2-1",
                        "title": "配置一",
                        "icon": "el-icon-magic-stick"
                    },
                    {
                        "index": "3-2-2",
                        "title": "配置二",
                        "icon": "el-icon-magic-stick",
                        "children": [
                            {
                                "index": "3-2-2-1",
                                "title": "详细配置一",
                                "icon": "el-icon-magic-stick"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

// Methods

</script>

<style scoped lang="scss">
.layout {
    --layout-header-height: 50px;
    // background: #dceafb;
    background: #f6f8f9;
    height: inherit;
}
</style>