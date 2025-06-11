<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-08 09:58:20
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


                <router-view v-slot="{ Component, route }">
                    <keep-alive v-if="route.meta.keepAlive">
                        <component :is="Component" :key="path(route, Component)" />
                    </keep-alive>
                    <component v-else :is="Component" :key="path(route, Component)" />
                </router-view>

            </div>
        </div>


    </div>
    <div class="drag-wrapper" v-dragSwitch="true">
        <div class="ala_container" @mouseenter="showTip(true)" @mouseleave="showTip(false)">

            <div class="ala_container_inner">
                <img class="ai-button-icon" src="/ai/ai-button.svg" />
            </div>

            <div v-if="tipShow" class="tip">
                嗨，我是小智
                <div class="button" @click="toAiAssistPage">
                    点我获取帮助
                </div>
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
import { ElStep } from 'element-plus';
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

        menus.value = data.data
        //注册动态路由
        MenuUtil.registerDynamicRouter(data.data, t)

        // 从 localStorage 中恢复路由
        // const storedPath = lstore.getItem('activeMenu');
        // if (storedPath) {
        //     if ("/login" != storedPath) {
        //         logger.warn(`从localStorage恢复路由：${storedPath}`);
        //         router.push(storedPath)
        //     }
        // }

    });
})



// State

// Methods
const tipShow = ref(false)
const showTip = (isShow: boolean) => {
    tipShow.value = isShow
}

const toAiAssistPage = () => {
    router.push({ name: "AiAssistPage", query: {} })
}

const path = (route: any, component: any) => {
    return route.path
}

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
            overflow: hidden;
            // transition: width 0s ease-in-out;
        }
    }




}

.ala_container {


    width: 40px;
    height: 40px;
    position: fixed;
    user-select: none;
    z-index: 9999;
    bottom: 140px;
    right: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;

    transform: rotate(180deg);


    .tip {
        // position: absolute;
        top: -200%;
        position: static;
        width: 150px;

        transform: rotate(180deg);
        background: #F85047;
        border-radius: 10px;
        padding: 8px;
        color: #fff;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .button {
            font-size: 14px;
            padding: 4px;
            background: #fff;
            color: #F85047;
            width: 120px;
            border-radius: 4px;
            margin-top: 8px;

            &:hover {
                font-weight: bold;
                cursor: pointer;
            }
        }

    }

    .ala_container_inner {
        text-align: center;
        width: 100%;
        padding-bottom: 15px;

        .ai-button-icon {
            width: 100%;
            background: none;

        }
    }



    // &:hover{
    //     background:red;
    //     &::before{
    //         content:'hello'

    //     }
    // }
}
</style>