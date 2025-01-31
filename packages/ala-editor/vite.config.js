/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 16:06:36
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-31 17:07:35
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
import topLevelAwait from 'vite-plugin-top-level-await';


const ph = path.resolve(__dirname, './src');
logger.info(`src path is ${ph}`);


const dc = defineConfig(({ command, mode }) => {
  logger.info(`command is ${command}`);
  logger.info(`env is .env.${mode}`);
  const env = loadEnv(mode, process.cwd());
  console.log('env content:', env);

  const year = new Date().getFullYear();
  const formattedDate = new Date().toISOString().replace('T', ' ').slice(0, 19).replace('Z', '');

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
            author: "darcy.zhang , tech.darcy.zhang@outlook.com",
            copyright: `@Copyright 2022~${year} 科爱思(深圳)科技有限公司`,
            keywords: "科爱思、微服务、数据中台、物联网平台、AI智能平台、大数据、云原生、AI智能体",
            description: "致力于IT软件产品研发和应用侧客户服务，拥有从咨询、设计、开发、测试、运维到运营的端到端软件研发全生命周期服务能力，在金融、政务、制造、交通、教育、文旅等各行业积累了丰富的IT案例与研发经验。",
            formattedDate: formattedDate,
          },
        },
      }),
      topLevelAwait(),
    ],
    resolve: {
      alias: {
        '@': ph,
      }
    },
    server: {
      proxy: {
        '/tuwei': {
          target: 'https://api.uomg.com/api/rand.qinghua?format=json', // 目标服务器地址
          changeOrigin: true, // 允许跨域
        },
        '/dev': {
          target: 'http://10.211.55.2:2009', // 目标服务器地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/dev/, '')
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
    base: "",

  };
});


// https://vitejs.dev/config/
export default dc;
