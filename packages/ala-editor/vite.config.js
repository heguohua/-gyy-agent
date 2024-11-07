/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 22:06:39
 * @FilePath: /1-low-coding/packages/ala-editor/vite.config.js
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
import { logger } from './src/utils/logger.ts'
import { loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const ph = path.resolve(__dirname, './src');
logger.info(`src path is ${ph}`);


const dc = defineConfig(({ command, mode }) => {
  logger.info(`command is ${command}`);
  logger.info(`env is .env.${mode}`);
  console.log('loadEnv(mode, process.cwd()):',loadEnv(mode, process.cwd()));

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
      createHtmlPlugin({
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_APP_TITLE,
          },
        },
      }),
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/assets/styles/vite-import.scss" as *;`,
        }
      }
    },
    base: ''
  };
});


// https://vitejs.dev/config/
export default dc;
