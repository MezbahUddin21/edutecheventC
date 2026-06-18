import { defineConfig } from 'vite'
import oxc from '@vitejs/plugin-react-oxc'

export default defineConfig({
  plugins: [oxc()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
