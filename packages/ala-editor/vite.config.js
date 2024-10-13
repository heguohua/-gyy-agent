import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const ph = path.resolve(__dirname, './src')
console.log("src path is :", ph)

const dc = defineConfig({
  plugins: [vue(), AutoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
    ],
    dts: "./auto-import.d.ts"
  }),
  Components({
    // 指定自动导入的组件位置，默认是 src/components
    dirs: ['src/components'],
  })],
  resolve: {
    alias: {
      '@': ph,
    },
  },
})


// https://vitejs.dev/config/
export default dc