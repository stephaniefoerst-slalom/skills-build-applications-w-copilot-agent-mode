import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const codespaceName = process.env.CODESPACE_NAME || ''

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
  },
  server: {
    port: 5173,
    host: 'localhost'
  }
})
