<!--
 * Wujie 微前端 - 子应用 ala-wujie-demo 宿主页
 * 主应用在此页面通过 WujieVue 加载子应用，子应用可通过 navigateToMain 跳转主应用路由
-->
<template>
  <div class="wujie-demo-host">
   
    <div class="wujie-container">
      <WujieVue
        :id="appName"
        :name="appName"
        :url="subAppUrl"
        width="100%"
        height="100%" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWujieDemoUrl, WUJIE_DEMO_APP_NAME } from '@/config/wujie';

const appName = WUJIE_DEMO_APP_NAME
const subAppUrl = getWujieDemoUrl()
</script>

<style scoped lang="scss">
.wujie-demo-host {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
}

.wujie-header {
  flex-shrink: 0;
  padding: 12px 16px;
  background: var(--el-fill-color-light);
  border-radius: 8px;
  margin-bottom: 12px;

  h2 {
    margin: 0 0 6px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .hint {
    margin: 0;
    font-size: 0.8rem;
    color: var(--el-text-color-secondary);
    line-height: 1.4;
  }
}

.wujie-container {
  flex: 1;
  min-height: 360px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  height: 100%;
}
</style>
