/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-16 10:58:27
 * @FilePath: /low-coding/packages/ala-editor/vite.config.js
 * @Description:
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import vueDevTools from 'vite-plugin-vue-devtools'

const ph = path.resolve(__dirname, './src');
console.log('src path is :', ph);

const dc = defineConfig(({ command }) => {
  console.log('command is :', command);

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: true,
        deep: true,
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 指定自动导入的组件位置，默认是 src/components
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        mockPath: 'mock', // 指定 mock 文件夹路径
        enable: command === 'serve',
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': ph,
      },
    },
    server: {
      proxy: {
        '/tuwei': {
          target: 'https://api.uomg.com/api/rand.qinghua?format=json', // 目标服务器地址
          changeOrigin: true, // 允许跨域
        },
      },
    },
  };
});

// https://vitejs.dev/config/
export default dc;
