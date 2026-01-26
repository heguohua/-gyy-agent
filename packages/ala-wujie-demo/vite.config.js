
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
      // "@tailwindcss/postcss" 不是有效的 auto-import. 移除
    ],
    dts: true
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 @ 设置为 ./src 的别名
    },
  },
  server: {
    port: 5174,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    // 支持 wujie 子应用独立运行
    rollupOptions: {
      output: {
        format: 'umd',
        name: 'ala-wujie-demo',
      },
    },
  },
  // 支持 wujie 子应用
  base: './',
})
