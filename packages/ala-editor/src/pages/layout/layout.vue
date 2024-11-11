<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-11 21:08:10
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


onMounted(() => {
    logger.info("onMounted 渲染 layout 页面");
    // 后台加载菜单
    alaPost(u.url("/u/menu/queryListForUser"), {}, true).then((data: any) => {
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



// State

// Methods

</script>

<style scoped lang="scss">
.layout {

    // 重写 element-plus样式
    // 左侧菜单宽度
    --el-aside-width: 250px;

    // 修改左侧菜单右侧打开、折叠箭头样式
    :deep .el-sub-menu__icon-arrow {
        font-size: 1.2rem;
        margin-top: -0.6rem;
    }

    // 表格标题字体大小
    :deep .el-table__header {
        font-size: 1rem;
    }

    :deep .el-table__cell.el-table__expanded-cell {
        padding: 0px 16px;
    }



    // background: #dceafb;
    background: var(--ala-color-bg);
    height: inherit;

    .content-wraper {
        display: flex;
        height: inherit;

        .content {
            width: calc(100% - var(--el-aside-width));
            padding: var(--el-menu-item-height) 8px 0px 8px;
        }
    }


}
</style>