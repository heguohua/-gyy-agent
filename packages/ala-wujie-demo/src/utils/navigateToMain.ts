

/**
 * 子应用跳转主应用工具函数
 */

export interface NavigateToMainOptions {
  /** 目标路径 */
  path: string
  /** 查询参数 */
  query?: Record<string, string>
  /** 主应用地址（可选，默认使用当前主应用） */
  mainAppUrl?: string
  /** 是否在新窗口打开 */
  newWindow?: boolean
}

/**
 * 跳转到主应用指定页面
 * @param options 跳转配置选项
 * @returns 是否成功发送跳转事件
 */
export function navigateToMain(options: NavigateToMainOptions): boolean {
  const { path, query, mainAppUrl, newWindow } = options

  // 检查是否在 wujie 环境中
  if (!window.__POWERED_BY_WUJIE__) {
    console.warn('[navigateToMain] 当前不在 wujie 环境中，无法跳转到主应用')
    return false
  }

  // 检查 $wujie 对象是否存在
  if (!window.$wujie) {
    console.warn('[navigateToMain] $wujie 对象不存在，无法跳转到主应用')
    return false
  }

  // 构建跳转参数
  const navigateParams: {
    path: string
    query?: Record<string, string>
    mainAppUrl?: string
    newWindow?: boolean
  } = {
    path
  }

  if (query) {
    navigateParams.query = query
  }

  if (mainAppUrl) {
    navigateParams.mainAppUrl = mainAppUrl
  }

  if (newWindow !== undefined) {
    navigateParams.newWindow = newWindow
  }

  try {
    if (window.$wujie?.bus) {
      // 通过事件总线发送跳转事件到主应用
      console.log('[navigateToMain] 发送跳转事件22:', window.$wujie.bus.emit)
    // window.$wujie.bus.emit('navigateToMain')
    console.log('[navigateToMain] 已发送跳转事件:', navigateParams)
    }
   
    return true
  } catch (error) {
    console.error('[navigateToMain] 发送跳转事件失败:', error)
    return false
  }
}

/**
 * 便捷方法：跳转到主应用指定路径（不带查询参数）
 * @param path 目标路径
 * @returns 是否成功发送跳转事件
 */
export function navigateToMainPath(path: string): boolean {
  return navigateToMain({ path })
}

/**
 * 便捷方法：跳转到主应用指定路径（同 navigateToMainPath）
 * @param path 目标路径
 */
export function goToMain(path: string): void {
  navigateToMain({ path })
}
