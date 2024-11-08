/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:54:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 20:34:17
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
import { alaConsts } from '@/config/alaConsts';

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
            requiresAuth: true
        }
    },
    {
        path: '/404',
        name: "404",
        component: () => import('../pages/e-404.vue'),
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


    const routeExists = router.getRoutes().some(route => route.name === to.name);

    if (routeExists) {
        // 用户访问的路由页面已存在
        // 检查该路由是否是需要登录后才能访问的路由
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // 检查用户是否登录
            if (!alaStore.get("isLogined")) {
                // 用户未登录，重定向到登录页面
                next('login');
            } else {
                // 用户已登录，放行
                next();
            }

        } else {
            // 不需要登录即可访问，直接跳转
            next();
        }
    } else {
        // 用户访问的路由页面不存在
        // if (!alaStore.get("isLogined")) {
            // 用户未登录状态下，访问了一个不存在的路由，则将这个路由存储到store中，待用户登录后自动跳转
        //     alaStore.set(alaConsts.redirect_router_name_key, to.name)
        //     next({ name: 'login' }); // 重定向到 login 路由
        // } else {
        // 跳转 404 页面
        next("404")
        // }

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