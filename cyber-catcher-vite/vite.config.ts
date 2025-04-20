import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/cyber-catcher/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true
  }
})
