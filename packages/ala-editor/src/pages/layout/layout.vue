<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-17 22:30:13
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
            <SidebarMenu :menuList="menus" v-model="isCollapse" />
            <div class="content">
                <AlaTab />

                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>

                <!-- <KeepAlive>
                    <RouterView />
                </KeepAlive> -->
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

// 引入useLocale
import { changLanguage, useLocale } from '@/hooks/useLocale'
// 使用useLocale
const { changeLocale } = useLocale()
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { getLocaleMessage } = useI18n();

// 根据 isCollapse 值，动态切换 左侧面板和右侧显示区域宽度
const isCollapse = ref(false)
const collapseWidth = ref('300px')
watch(() => isCollapse.value, (newValue) => {
    if (newValue) {
        // 说明当前面板需要调整成折叠状态
        collapseWidth.value = '44px'
    } else {
        // 说明当前面板需要调整成 非折叠 状态
        collapseWidth.value = '300px'

    }

}, {
    immediate: true
})

// 根据权限加载菜单数据
const menus = ref<Array<Menu>>([])
onMounted(() => {
    logger.info("onMounted 渲染 layout 页面");
    // 后台加载菜单
    alaPost(u.url("/u/menu/queryListForUser"), {}, true).then((data: any) => {

        // 先加载所有语言包
        changLanguage(lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME), getLocaleMessage, changeLocale)

        console.log('menus:', data);
        menus.value = data.data
        //注册动态路由
        MenuUtil.registerDynamicRouter(data.data, t)

        // 从 localStorage 中恢复路由
        const storedPath = lstore.getItem('activeMenu');
        if (storedPath) {
            if ("/login" != storedPath) {
                logger.warn(`从localStorage恢复路由：${storedPath}`);
                router.push(storedPath)
            }
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
    --el-aside-width: v-bind(collapseWidth);

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

    :deep .el-table th.el-table__cell {
        background-color: #F9F9FA;
        padding: 8px 0px;
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
            overflow-y: auto;
            // transition: width 0s ease-in-out;
        }
    }


}
</style>