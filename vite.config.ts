import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

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
  ],
  build: {
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName (name) {
          const match = DRIVE_LETTER_REGEX.exec(name)
          const driveLetter = match ? match[0] : ''
          // substr 是被淘汰語法，因此要改 slice
          return (
            driveLetter +
            name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
          )
        }
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/crm/' : ''
})
