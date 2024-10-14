// 引入createApp用于创建应用
import { createApp } from 'vue';
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
app.use(ElementPlus);

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
import {queryLoveMessage} from "./utils/tuwei"
logger.logg(
`

    App started successfully。

    Happy your life for one word：${ await queryLoveMessage()}

`
);
