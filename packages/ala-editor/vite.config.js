import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';

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
    ],
    resolve: {
      alias: {
        '@': ph,
      },
    },
  };
});

// https://vitejs.dev/config/
export default dc;
