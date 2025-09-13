import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000, // 自定义端口，比如改成 3000
    strictPort: true, // 可选：端口被占用时直接报错，而非自动找其他端口
  }
}
)
