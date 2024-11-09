<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-09 16:28:47
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
        "icon": "phone",
        "width": '22px',
        "height": '15px',
        "children": [
            {
                "index": "1-1",
                "title": "选项1",
                "icon": "phone",
                "width": '22px',
                "height": '15px',
            },
            {
                "index": "1-2",
                "title": "选项2",
                "icon": "phone",
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

    // 左侧菜单宽度
    --el-aside-width: 250px;
    // --el-menu-text-color:rgb(67, 156, 249);
    // 未激活菜单字体颜色
    --el-menu-text-color: #303133;

    // 菜单字体大小
    --el-menu-item-font-size: 14px;
    // 包含子集菜单的行高
    --el-menu-item-height: 46px;
    --el-menu-sub-item-height: 40px;
    // 包含子集菜单的左右padding大小
    --el-menu-base-level-padding: 20px;
    // 子一级菜单缩进宽度
    --el-menu-base-level-padding: 10px;
    --el-menu-level-padding: 10px;
    --el-menu-level: 0;


    // background: #dceafb;
    background: #f6f8f9;
    height: inherit;
}
</style>