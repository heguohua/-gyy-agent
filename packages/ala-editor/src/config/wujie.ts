/**
 * Wujie 微前端主应用配置
 *
 * 1. 子应用 ala-wujie-demo 通过 bus 发送 navigateToMain，主应用监听并处理路由跳转
 * 2. 宿主页 /wujie/demo 使用 WujieVue 加载子应用；路由已静态注册，可直接访问 #/wujie/demo
 * 3. 若需在侧边栏展示入口，需在后台菜单中新增菜单项，url 设为 /wujie/demo
 */

import { logger } from '@/utils/logger'
import type { Router } from 'vue-router'
import wujie from 'wujie-vue3'

/** 子应用 ala-wujie-demo 开发环境地址 */
export const WUJIE_DEMO_DEV_URL = 'http://localhost:5174'

/** 子应用 ala-wujie-demo 生产环境地址（可按部署情况修改） */
export const WUJIE_DEMO_PROD_URL = './ala-wujie-demo/'

/** 子应用名称，与 WujieVue 的 name 保持一致 */
export const WUJIE_DEMO_APP_NAME = 'ala-wujie-demo'

/**
 * 获取子应用 ala-wujie-demo 的加载地址
 */
export function getWujieDemoUrl(): string {
  const isDev = import.meta.env?.DEV ?? import.meta.env?.MODE === 'dev'
  return isDev ? WUJIE_DEMO_DEV_URL : WUJIE_DEMO_DEV_URL
}

interface NavigateToMainPayload {
  path: string
  query?: Record<string, string>
  newWindow?: boolean
  mainAppUrl?: string
}

/**
 * 注册 navigateToMain 事件监听，子应用跳转主应用时由主应用执行路由跳转
 * @param router 主应用 vue-router 实例
 */
export function setupNavigateToMainListener(router: Router): void {
  wujie.bus.$on('navigateToMain', (data: NavigateToMainPayload) => {
    if (!data?.path) {
      logger.warn('[Wujie] navigateToMain 缺少 path')
      return
    }
    const { path, query, newWindow } = data
    if (newWindow) {
      const qs = query ? '?' + new URLSearchParams(query).toString() : ''
      const full = `${window.location.origin}${window.location.pathname || '/'}#${path}${qs}`
      window.open(full, '_blank')
      logger.info('[Wujie] 新窗口打开:', full)
    } else {
      router.push({ path, query }).catch((err) => {
        if (err?.name !== 'NavigationDuplicated') {
          logger.error('[Wujie] router.push 失败:', err)
        }
      })
      logger.info('[Wujie] 主应用路由跳转:', { path, query })
    }
  })
  logger.info('[Wujie] 已注册 navigateToMain 监听')
}
