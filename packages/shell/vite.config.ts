import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { defaultLibraryViteConfig } from '../shared/src/utils/vite';

export default defineConfig({
  ...defaultLibraryViteConfig,
  plugins: [react()],
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyOrgShell',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        'react/jsx-runtime',
        '@mui/icons-material',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled'
      ]
    }
  }
});
