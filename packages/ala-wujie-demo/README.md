# ala-wujie-demo

Vue3 + Vite + wujie-vue3 + TypeScript 子应用示例

## 功能说明

这是一个基于 wujie-vue3 的微前端子应用示例，实现了子应用跳转主应用指定页面的功能。

## 技术栈

- Vue 3
- Vite
- TypeScript
- wujie-vue3
- Element Plus (可选)

## 安装依赖

```bash
pnpm install
```

## 开发

```bash
pnpm dev
```

## 构建

```bash
pnpm build
```

## 功能特性

### 子应用跳转主应用

子应用可以通过 `navigateToMain` 工具函数跳转到主应用的指定页面。

#### 使用方式

```typescript
import { navigateToMain, goToMain } from '@/utils/navigateToMain'

// 方式1：使用 navigateToMain（支持完整配置）
navigateToMain({
  path: '/home',
  query: { id: '123', type: 'detail' },
  newWindow: false
})

// 方式2：使用 goToMain（快速跳转）
goToMain('/dashboard')
```

#### 主应用配置

主应用需要监听 `navigateToMain` 事件并处理路由跳转：

```typescript
// 在主应用中
import { bus } from 'wujie-vue3'

bus.on('navigateToMain', (data) => {
  const { path, query, newWindow } = data
  if (newWindow) {
    window.open(path)
  } else {
    router.push(path)
  }
})
```

## 项目结构

```
src/
├── components/
│   └── NavigateToMain.vue    # 跳转功能演示组件
├── utils/
│   └── navigateToMain.ts    # 跳转工具函数
├── types/
│   └── wujie.d.ts            # wujie 类型声明
├── App.vue                   # 根组件
└── main.ts                   # 入口文件（支持 wujie 生命周期）
```

## Wujie 生命周期

子应用已配置 wujie 生命周期函数：

- `__WUJIE_MOUNT`: 子应用挂载时调用
- `__WUJIE_UNMOUNT`: 子应用卸载时调用

## 注意事项

1. 此功能需要在 wujie 微前端环境中使用
2. 主应用需要正确配置 wujie 并监听 `navigateToMain` 事件
3. 开发环境需要配置 CORS 支持
4. 确保主应用和子应用的路由配置正确
