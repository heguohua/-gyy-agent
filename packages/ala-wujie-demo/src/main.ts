
import '@logicflow/core/dist/style/index.css'; // 确保样式被引入
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
let app: ReturnType<typeof createApp> | null = null

/**
 * 子应用挂载函数
 * 在 wujie 环境中，由主应用调用此函数来挂载子应用
 */
function mount(): void {
  app = createApp(App)
  if (window.$wujie) {
    app.config.globalProperties.$wujie = window.$wujie
  }
  app.mount('#app')
  console.log('[Wujie] 子应用已挂载')
}

/**
 * 子应用卸载函数
 * 在 wujie 环境中，由主应用调用此函数来卸载子应用
 */
function unmount(): void {
  if (app) {
    app.unmount()
    app = null
    console.log('[Wujie] 子应用已卸载')
  }
}

// 检查是否在 wujie 环境中运行
if (window.__POWERED_BY_WUJIE__) {
  // 在 wujie 环境中，使用生命周期函数
  window.__WUJIE_MOUNT = mount
  window.__WUJIE_UNMOUNT = unmount
} else {
  // 独立运行模式，直接挂载
  mount()
}
