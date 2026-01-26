/**
 * Wujie 类型声明文件
 */

declare global {
  interface Window {
    __POWERED_BY_WUJIE__?: boolean
    __WUJIE_MOUNT?: () => void
    __WUJIE_UNMOUNT?: () => void
    $wujie?: {
      bus: {
        emit: (event: string, data?: unknown) => void
        on: (event: string, callback: (data?: unknown) => void) => void
        off: (event: string, callback?: (data?: unknown) => void) => void
      }
      shadowRoot?: ShadowRoot
      props?: Record<string, unknown>
    }
  }
}

export { }

