import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/translate-memo-67b071cfd78f/' : '/',
  server: {
    host: 'true',
  },
  plugins: [react()],
})
