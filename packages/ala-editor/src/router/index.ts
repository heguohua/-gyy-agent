/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:54:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-08-02 17:15:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/router/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// router.js
import { useAlaStore } from '@/store/ala-store';
import { logger } from '@/utils/logger';
import { createRouter, createWebHashHistory } from 'vue-router';
import { alaConsts } from '@/config/alaConsts';
import lstore from '@/utils/lstore';
import notify from '@/utils/notify';

// 定义路由
const routes = [
    {
        path: '/',
        name: "console",
        component: () => import('../pages/layout/layout.vue'),
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/login',
        name: "login",
        component: () => import('../pages/login.vue'),
        meta: {
            requiresAuth: false
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
    {
        path: '/console',
        name: "console",
        component: () => import('../pages/layout/layout.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/welcome',
        name: "welcome",
        component: () => import('../pages/welcome.vue'),
        meta: {
            requiresAuth: true,
            menuCode: 'welcome',
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
    logger.info(`router.beforeEach中即将跳转路由: 从 ${from.path} 到 ${to.path}`)

    const routeExists = router.getRoutes().some(route => route.name === to.name);

    if (to.path === '/') {
        logger.warn("router.beforeEach检测到当前访问路径为/，不做跳转");
        return
    } else if (to.path === '/login') {
        lstore.removeItem(alaConsts.is_logined_key)
    }

    if (routeExists) {
        // 用户访问的路由页面已存在
        // 检查该路由是否是需要登录后才能访问的路由
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // 检查用户是否登录
            // if (!alaStore.get("isLogined")) {
            // lstore.setItem(alaConsts.is_logined_key, true)
            if (!lstore.getItem(alaConsts.is_logined_key)) {
                // 用户未登录，重定向到登录页面
                logger.warn("router.beforeEach检测到用户未登录，跳转登录页面");
                next('login');
            } else {
                // 用户已登录，放行

                const alaStore = useAlaStore()
                const query = to.query as { type: string };
                // 判断当前路由是否需要进行唯一性检测，如果需要则检测是否已打开一个tab标签，如果已打开一个tab页，则给出提示信息并阻止路由跳转
                if (to.meta.uniqueCheck && query && query['type'] === 'edit') {

                    const tabList = alaStore.get("tabList");
                    const index = tabList.findIndex((item: any) => item.path == to.path)
                    //选中的菜单项目前没有在标签页中 需要添加到标签页中
                    if (index > -1) {
                        notify.warn("温馨提示：", `您已打开一个名为【 ${to.meta.menuName} 】的页面，请先关闭该页面然后重复刚才操作！`)
                        return

                    } else {
                        next();
                    }

                } else {
                    // 不需检测，直接跳转
                    next();
                }



            }

        } else {
            // 不需要登录即可访问，直接跳转
            logger.warn("router.beforeEach检测到当前页面不需要登录，直接放行");
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
        // logger.warn("router.beforeEach检测到用户访问的路由页面不存在，跳转404页面");
        logger.warn("router.beforeEach检测到用户访问的路由页面不存在，不做跳转");
        next("/welcome")
        // }
        // next(false)

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

router.isReady().then(() => {
    // const url = window.location.href.split('#')[1];
    // router.push(url);
});

export const toLogin = () => {
    router.push({ name: "Login" })
}

export default router;