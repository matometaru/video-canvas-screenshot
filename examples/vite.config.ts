import reactPlugin from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [reactPlugin()],
})
