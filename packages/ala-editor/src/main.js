/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-17 13:29:08
 * @FilePath: /1-low-coding/packages/ala-editor/src/main.js
 * @Description: 应用启动入口文件
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// 引入createApp用于创建应用
import { createApp, reactive, createVNode, render } from 'vue';
// 引入App根组件
import App from './App.vue';
// 引入全局css文件
import './style.css';
import 'animate.css';
// 引入路由器
import router from './router';

// 创建一个应用
const app = createApp(App);
// 使用路由器
app.use(router);

// 集成 pinia
const pinia = createPinia();
app.use(pinia);

// 集成 element-plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'element-plus/dist/index.css';
import './assets/styles/main.scss'
// import i18n from './utils/i18n/i18n';
import { setupI18n } from './utils/i18n/i18n'
// 注册 i18n
// app.use(i18n);
setupI18n(app)

// 向element-plus注册i18n
// app.use(ElementPlus, {
//   i18n: (key, value) => i18n.global.t(key, value),
// });


// 注册 icon
import { Icon } from '@iconify/vue';
app.component('icon', Icon);


// 集成 vuedraggable
import Draggable from "vuedraggable"
app.component('draggable', Draggable);

// 全局注册自定义组件
// 导入要全局注册的组件
import components from "@/config/alaComponents"
Object.entries(components).forEach(([name, component]) => {
  app.component(name, component);
});

// 注册全局异常拦截器
import errorHandler from "@/utils/errorHandler"
errorHandler.registerErrorHandler(app)

// 注册全局状态管理器
import { GlobalProperties } from "@/config/globalProperties"

const gb = new GlobalProperties(app)
app.config.globalProperties.$gb = gb

// 注册VNode组件
import LoadingBar from '@/components/LoadingBar/LoadingBar.vue';
// 创建LoadingBar的VNode
const loadingBarVNode = createVNode(LoadingBar);
// 挂载LoadingBar到DOM
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);
render(loadingBarVNode, mountNode);
// 将LoadingBar的引用保存在app.config.globalProperties中
app.config.globalProperties.$loadingBar = loadingBarVNode.component;


// 创建 并实例化 axios 对象
import { configAxios } from './utils/req';
configAxios(app);


// 挂载整个应用到app容器中
app.mount('#app');

// 打印启动日志
import { logger } from './utils/logger';
import { queryLoveMessage } from './utils/tuwei';



const formattedDate = new Date().toISOString().replace('T', ' ').slice(0, 19).replace('Z', '');
const year = new Date().getFullYear()
const companyInfo = '科爱思(深圳)科技有限公司（Scenario AI Technologies，SAIT）一直致力于IT软件产品研发和应用侧客户服务，拥有从咨询、设计、开发、测试、运维到运营的端到端软件研发全生命周期服务能力，在金融、政务、制造、交通、教育、文旅等各行业积累了丰富的IT案例与研发经验。科爱思(深圳)科技有限公司以“为合作单位持续提供安全、稳定、高效、卓越的产品与服务，同时最大化降低IT系统建设成本”为企业使命，努力成为客户数字化建设过程中最值得信赖的合作伙伴。公司团队核心成员深耕IT行业10年+，依托微服务化业务平台、云计算平台、大数据平台、物联网平台、AI智能平台、数字孪生平台、智能运维平台和安全及隐私保护管理体系等基础能力，形成了以平台产品、工具产品和应用产品为核心的数字化技术底座，同时在产研体系管理、产品质量提升、解决方案开发、销售工具集开发和业务体系管理等方面积累了丰富的、配套化治理经验。公司自研产品、技术方案完全自主可控，打破了国际厂商和大型头部公司的技术垄断，形成了以技术创新为驱动、以制度保障为协同的，完全可独立行走、可独立落地的方法论。公司所有技术底座均经过了众多科技巨头，如中国移动、中国电信、华为、腾讯、阿里、中信集团、中国航天集团等多年、持续的安全和系统稳定性测试，以及大量项目的持续磨炼，具有行业内值得信赖的稳定度和安全性。'
// Happy your life for one word：${await queryLoveMessage()}
logger.success(
  `

    App started successfully。
    
    Happy your life for one word：

    @Copyright 2022~${year} 科爱思(深圳)科技有限公司
    @Publish time: ${formattedDate}

${companyInfo}

`,
);
logger.info(`import.meta.env.MODE is ${import.meta.env?.MODE}`);
