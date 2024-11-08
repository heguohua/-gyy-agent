/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:54:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 18:56:55
 * @FilePath: /1-low-coding/packages/ala-editor/src/router/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// router.js
import { useAlaStore } from '@/store/ala-store';
import { logger } from '@/utils/logger';
import { createRouter, createWebHashHistory } from 'vue-router';
import { getCurrentInstance } from 'vue';
import { GlobalProperties } from "@/config/globalProperties"

// 定义路由
const routes = [
    {
        path: '/',
        name: "login",
        component: () => import('../pages/login.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/editor',
        name: "editor",
        component: () => import('../pages/editor.vue'),
        meta: {
            requiresAuth: false
        }
    },
];

// 创建router实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    // to: 即将要去的路由对象
    // from: 当前导航正要离开的路由
    // next: 一定要调用该方法来 resolve 这个钩子
    const alaStore = useAlaStore()
    logger.error("即将跳转路由");
    console.log('to:', to);
    console.log('from:', from);
    console.log('alaStore.get("isLogined"):', alaStore.get("isLogined"));

    console.log('window.location:', window.location);

    if (!alaStore.get("isLogined")) {
        // window.location.href = window.location.origin;
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {


        logger.error("已跳转路由");


        if (!alaStore.get("isLogined")) {
            // 用户未登录，重定向到登录页面
            next('/');
        } else {
            // 用户已登录，放行
            next();
        }

    } else {
        next();
    }
});

// beforeResolve 在 beforeEach 之后调用，它会等待所有的异步钩子（如 async components）解析完成
router.beforeResolve((to, from, next) => {
    // ...
    next();
});

router.afterEach((to, from) => {
    // ...
});
export default router;