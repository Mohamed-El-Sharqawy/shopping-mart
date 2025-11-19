import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    assetsInlineLimit: 4096,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('@mantine')) {
              return 'mantine';
            }
            if (id.includes('@tanstack/react-query') || id.includes('react-router-dom')) {
              return 'utils';
            }
          }
          return undefined;
        },
        format: 'es' as const
      }
    }
  },
  // ESBuild options - simplified for compatibility with Vercel
  esbuild: {
    // Old Options, had a problem with Vercel
    
    // drop: ['console', 'debugger'],
    // legalComments: 'none',
    // minifyIdentifiers: true,
    // minifySyntax: true,
    // minifyWhitespace: true,
    legalComments: 'none'
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 4173
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
      'react-router-dom'
    ]
  }
})
