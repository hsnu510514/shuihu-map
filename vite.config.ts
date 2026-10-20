import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || '/',
    plugins: [react()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    build: {
      target: 'es2022',
      assetsInlineLimit: 2048,
      chunkSizeWarningLimit: 700,
    },
  }
})
