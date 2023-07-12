import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  // Local Host
  server: {
    open: true,
    host: true,
    proxy: {
      '/api': {
        // 測試機
        target: 'https://#/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, 'api/')
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    })
  ]
})
