import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true, // Yalnız bir portda işləyir
    fs: {
      strict: true, // Yalnız icazə verilmiş fayllara girişə icazə ver
    },
  },
  build: {
    sourcemap: false, // Source map-ləri deaktiv edir
  }

})
