/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-16 16:38:43
 * @FilePath: /low-coding/packages/ala-editor/src/main.js
 * @Description: 应用启动入口文件
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// 引入createApp用于创建应用
import { createApp, reactive } from 'vue';
// 引入App根组件
import App from './App.vue';
// 引入全局css文件
import './style.css';
// 引入路由器
import router from './router';

// 创建一个应用
const app = createApp(App);
// 使用路由器
app.use(router);

// 集成 element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/main.scss'
import i18n from './utils/i18n/i18n';
// 注册 i18n
app.use(i18n);
// 向element-plus注册i18n
app.use(ElementPlus, {
  i18n: (key, value) => i18n.global.t(key, value),
});


// 注册 icon
import { Icon } from '@iconify/vue';
app.component('icon', Icon);

// 集成 pinia
const pinia = createPinia();
app.use(pinia);


// 挂载整个应用到app容器中
app.mount('#app');

// 集成自定义的 GlobalProperties
import { logger } from './utils/logger';
import { queryLoveMessage } from './utils/tuwei';

logger.success(
  `

    App started successfully。

    Happy your life for one word：${await queryLoveMessage()}

`,
);
