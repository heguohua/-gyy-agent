<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 10:00:22
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/layout/layout.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- <RouterView v-if="!checkLogin" /> -->
    <!-- <div v-else class="layout"> -->
    <div class="layout">
        <LayoutHeader />
        <div class="content-wraper">
            <SidebarMenu :menuList="menus" />
            <div class="content">
                <RouterView />
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarMenu from "@/components/menu/SidebarMenu.vue"
import LayoutHeader from "@/pages/layout/layout-header.vue"
import Menu from '@/types/menuType';
import u from '@/utils/u';
import { alaPost } from '@/utils/req';
import MenuUtil from '@/utils/menuRegister';
import { logger } from '@/utils/logger';
import lstore from '@/utils/lstore';
import { alaConsts } from '@/config/alaConsts';
import router from '@/router';

const menus = ref<Array<Menu>>([])

// alaPost(u.url("/u/menu/queryListForUser"), {}).then((data: any) => {
//     console.log('data:', data);
//     menus.value = data.data
//     //注册动态路由
//     MenuUtil.registerDynamicRouter(data.data)
// });
onMounted(() => {
    logger.info("onMounted 渲染 layout 页面");
    // 后台加载菜单
    alaPost(u.url("/u/menu/queryListForUser"), {}).then((data: any) => {
        console.log('data:', data);
        menus.value = data.data
        //注册动态路由
        MenuUtil.registerDynamicRouter(data.data)

        // 从 localStorage 中恢复路由
        const storedPath = lstore.getItem('activeMenu');
        if (storedPath) {
            logger.warn(`从localStorage恢复路由：${storedPath}`);
            router.push(storedPath)
        }
    });
})


const checkLogin = computed(() => {
    let isLogined = false;
    if (lstore.getItem(alaConsts.is_logined_key)) {
        isLogined = true;
        logger.warn("用户登录状态检测：已登录，直接渲染Layout页面");
    } else {
        logger.warn("用户登录状态检测：未登录，渲染Login页面");
    }
    return isLogined;
})

// State
const menuList = [
    {
        "id": "0",
        "title": "导航-0",
        "icon": "drag",
        "width": '22px',
        "height": '15px'
    },
    {
        "id": "1",
        "title": "导航一",
        "icon": "drag",
        "width": '22px',
        "height": '15px',
        "children": [

            {
                "id": "1-2",
                "title": "选项2",
                "icon": "phone",
                "children": [
                    {
                        "id": "1-2-1",
                        "title": "子选项1",
                        "icon": "phone"
                    },
                    {
                        "id": "1-2-2",
                        "title": "子选项2",
                        "icon": "phone"
                    }
                ]
            },
            {
                "id": "1-1",
                "title": "选项1",
                "icon": "phone",
                "width": '22px',
                "height": '15px',
            },
        ]
    },
    {
        "id": "2",
        "title": "导航二",
        "icon": "phone",
        "children": [
            {
                "id": "2-1",
                "title": "选项3",
                "icon": "phone"
            },
            {
                "id": "2-2",
                "title": "选项4",
                "icon": "phone",
                "children": [
                    {
                        "id": "2-2-1",
                        "title": "子选项3",
                        "icon": "phone"
                    }
                ]
            }
        ]
    },
    {
        "id": "3",
        "title": "导航三",
        "icon": "phone",
        "children": [
            {
                "id": "3-1",
                "title": "设置一",
                "icon": "phone"
            },
            {
                "id": "3-2",
                "title": "设置二",
                "icon": "phone",
                "children": [
                    {
                        "id": "3-2-1",
                        "title": "配置一",
                        "icon": "phone"
                    },
                    {
                        "id": "3-2-2",
                        "title": "配置二",
                        "icon": "phone",
                        "children": [
                            {
                                "id": "3-2-2-1",
                                "title": "详细配置一",
                                "icon": "phone"
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

    // 修改左侧菜单右侧打开、折叠箭头样式
    :deep .el-sub-menu__icon-arrow {
        font-size: 1.2rem;
        margin-top: -0.6rem;
    }



    // background: #dceafb;
    background: var(--ala-color-bg);
    height: inherit;

    .content-wraper {
        display: flex;
        height: inherit;

        .content {
            width: calc(100% - var(--el-aside-width));
            padding-top: var(--el-menu-item-height);
        }
    }


}
</style>