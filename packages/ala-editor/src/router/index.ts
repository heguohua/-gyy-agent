// router.js
import { createRouter, createWebHistory } from 'vue-router';

// 定义路由
const routes = [
    { path: '/', component: () => import('../pages/list.vue') },
    { path: '/editor', component: () => import('../pages/editor.vue') },
];

// 创建router实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;