import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? 'https://translate-memo-5cf100b7d182.herokuapp.com' : 'http://localhost:5173',
  server: {
    host: true,
  },
  preview: {
    port: 4173,
  },
  plugins: [react()],
})
