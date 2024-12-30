import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({
  css: {
    modules: {
      generateScopedName: 'fc-mde__[local]_[hash]',
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'fc-mde',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
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
})
