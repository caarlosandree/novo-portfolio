import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor'
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n-vendor'
            }
            // Outras dependências em um chunk separado
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser', // Usando terser para melhor controle de minificação
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    } as Record<string, unknown>,
    cssCodeSplit: true,
    sourcemap: false,
    target: 'esnext',
    modulePreload: {
      polyfill: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material', 'framer-motion'],
    exclude: [],
  },
  server: {
    port: 5173,
    host: 'localhost',
    strictPort: false,
    hmr: {
      clientPort: 5173,
    },
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
})
