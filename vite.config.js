import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client'

  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true
    }
  }
})
