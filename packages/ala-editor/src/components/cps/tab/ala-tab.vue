<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-17 20:42:13
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-24 16:30:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/tab/ala-tab.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-tab">
        <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-remove="tabRemove">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                :closable="item.path != '/welcome'" class="ala-tab-title">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { logger } from '@/utils/logger';
import { TabPaneName } from 'element-plus';
import { useAlaStore } from '@/store/ala-store';
const { locale, t } = useI18n();

interface TabType {
    title: string,
    path: string,
    menuCode: string,
}

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)

const alaStore = useAlaStore()


const tabList = ref<[TabType]>([
    {
        title: '首页',
        path: '/welcome',
        menuCode: 'menu.welcome',
    }
])

alaStore.set("tabList",tabList.value)

//点击标签导致activeTab改变时触发
function tabChange(name: TabPaneName): any {
    router.push(name as string)
    activeTab.value = name as string
}


//添加路由 添加到标签页
function addTab(tab: TabType) {
    const index = tabList.value.findIndex((item) => item.path == tab.path)
    //选中的菜单项目前没有在标签页中 需要添加到标签页中
    if (index == -1) {
        tabList.value.push(tab)
    }
}

//点击菜单导致路由变化 路由变化之前使用这个全局守卫 
router.beforeEach((to) => {

    activeTab.value = to.path
    // console.log('to.meta.moduleName:', t(to.meta.menuCode as string));

    if (to.meta.menuCode) {
        addTab({
            title: t(to.meta.menuCode as string),
            path: to.path,
            menuCode: to.meta.menuCode as string,
        })
    } else {
        logger.warn(`【 to.meta.menuCode不存在 】，不添加Tab页，当前跳转URL【 ${to.path} 】`);

    }
})


function tabRemove(targetTab: string) {
    let targetIndex: number = 0 // 要关闭的tab的index    

    //先找到要删除的
    tabList.value.forEach((tab, index) => {
        if (tab.path == targetTab) {
            targetIndex = index
        }
    })
    //要关闭的是当前活跃的tab
    if (activeTab.value == targetTab) {
        const nextTab = tabList.value[targetIndex - 1] || tabList.value[targetIndex + 1]
        activeTab.value = nextTab.path
        router.push(activeTab.value)
    }
    tabList.value.splice(targetIndex, 1)

}


// 监听语言变化
watch(locale, (newLocale, oldLocale) => {
    logger.warn(`Tab页监听到国际化语言从 ${oldLocale} 切换到【 ${newLocale} 】，即将更新 tab 页标题`);
    // 
    tabList.value.forEach(tab => {
        console.log('tab:', tab.menuCode);
        tab.title = t(tab.menuCode)
    })

}, {
    immediate: true
});


</script>
<style lang="scss" scoped>
.ala-tab {
    :deep .el-tabs__item:not(.is-active) {
        color: #3E446B;
        font-weight: normal;
    }

    :deep .el-tabs__header {
        margin-bottom: 4px;
    }
}
</style>
