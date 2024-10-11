import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ala-vite-project',
      fileName: (format) => `ala-lib-vite-project.${format}.js`
    },
  }
})
