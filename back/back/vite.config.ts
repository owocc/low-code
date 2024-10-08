import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@flow': fileURLToPath(new URL('./src/views/flow', import.meta.url)),
      '@page': fileURLToPath(new URL('./src/views/page', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/views/data', import.meta.url)),
      '@process': fileURLToPath(new URL('./src/views/process', import.meta.url))
    }
  }
})
