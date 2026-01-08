<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 13:40:02
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-25 18:25:42
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
        <div class="ala_container" @mouseenter="showTip(true)">

            <div class="ala_container_inner">
                <img class="ai-button-icon" src="/ai/ai-button.svg" />
            </div>

            <div v-if="tipShow" class="tip">

                <div class="tip-close">
                    <VIcon icon="close_circle" width="20" height="20" @click="handleClose()" />
                </div>

                <div class="ai-tip">
                    嗨，我是白露
                </div>
                <div class="ai-directive">
                    <textarea class="ai-directive-textarea" type="text" v-model="aiDirective" />
                    <div class="ai-directive-submit" @click="handleSubmit">发送</div>
                </div>
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
import { useAlaStore } from '@/store/ala-store';
const alaStore = useAlaStore()

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
        changLanguage(lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME) || alaConsts.I18N_DEFAULT, getLocaleMessage, changeLocale)

        menus.value = data.data
        //注册动态路由
        const modules = import.meta.glob('@/pages/**/*.vue');
        MenuUtil.registerDynamicRouter(data.data, t, modules)
        // 从 localStorage 中恢复路由

    });
})



// State

// Methods
const tipShow = ref(false)
const showTip = (isShow: boolean) => {
    tipShow.value = isShow
    // tipShow.value = true
}
const handleClose = () => {
    tipShow.value = false
    // tipShow.value = true
}

const toAiAssistPage = () => {
    router.push({ name: "AiAssistPage", query: {} })
}

const path = (route: any, component: any) => {
    return route.path
}

const aiDirective = ref('')
const handleSubmit = () => {
    alaPost(u.url("/ai/audio/page"), { message: aiDirective.value }, true).then((data: any) => {
        const url = data.data.label
        if (url.indexOf('__add') > 0) {
            // 说明是跳转新增页面
            const label = url.replaceAll('__add', '')
            const path = { path: label }
            router.push(path)

            nextTick(() => {
                alaStore.set('ai_toPage', label)
            })

        } else {
            const path = { path: data.data.label }
            router.push(path)
        }
        aiDirective.value = ''

    });
}

</script>

<style scoped lang="scss">
.layout {



    // background: #dceafb;
    background: var(--ala-color-bg);
    height: inherit;

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

.drag-wrapper {
    .ala_container {
        .ala_container_inner {
            .ai-button-icon {}
        }

        .tip {

            .tip-close {
                position: absolute;
                top: 6px;
                right: 10px;
                opacity: 0.9;

                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }
            }

            .ai-tip {
                margin: 10px 0px 6px 0px;
                font-size: 1.4rem;
                font-weight: bold;
            }


            .ai-directive {
                display: flex;
                position: relative;
                width: 100%;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;

                .ai-directive-textarea {
                    width: 96%;
                    display: flex;
                    min-height: 60px;
                    padding: 4px 8px;
                    border: none;
                    font-size: 1rem;
                    line-height: 1.4rem;
                }

                .ai-directive-submit {
                    width: 96%;
                    border-radius: 4px;
                    margin: 6px 0px 14px 0px;
                    padding: 6px 0px;
                    background: #fff;
                    color: var(--el-menu-text-color);
                    font-size: 1rem;

                    &:hover {
                        color: #F85047;
                        cursor: pointer;
                        font-weight: bold;
                        opacity: 0.99;
                    }

                }


            }


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
    right: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;

    transform: rotate(180deg);


    .tip {
        // position: absolute;
        top: -200%;
        position: static;
        width: 250px;

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
            // font-size: 14px;
            padding: 6px 0px;
            background: #fff;
            color: #F85047;
            width: 96%;
            border-radius: 4px;
            margin-bottom: 8px;
            font-size: 1rem;


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
    //
    //     background:red;
    //     &::before{
    //         content:'hello'

    //     } }
}
</style>