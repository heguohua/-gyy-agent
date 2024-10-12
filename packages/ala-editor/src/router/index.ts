// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

// 定义路由
const routes = [
    { path: '/',name:"list", component: () => import('../pages/list.vue') },
    { path: '/editor',name:"editor", component: () => import('../pages/editor.vue') },
];

// 创建router实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;