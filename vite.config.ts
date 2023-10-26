import { resolve } from 'path'
import reactPlugin from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactPlugin()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactUsePolling',
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
  },
})