import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
    ],
    dts: true
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 @ 设置为 ./src 的别名
    },
  },
})
