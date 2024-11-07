/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 17:54:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 11:21:51
 * @FilePath: /low-coding/packages/ala-editor/src/router/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

// 定义路由
const routes = [
    { path: '/',name:"list", component: () => import('../pages/login-2.vue') },
    { path: '/editor',name:"editor", component: () => import('../pages/login.vue') },
];

// 创建router实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;