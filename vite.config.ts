import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  }
})
module.exports = {
  input: 'src/main.tsx',
  output: {
    file: 'dist/bundle.js'
  }
}