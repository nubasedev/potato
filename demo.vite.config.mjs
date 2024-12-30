import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  root: './demo',
  plugins: [react()],
  build: {
    outDir: '../dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    target: 'esnext',
  },
  server: {
    open: true,
  },
})
