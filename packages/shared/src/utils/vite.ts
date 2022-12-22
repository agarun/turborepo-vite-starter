import fs from 'fs/promises';
import react from '@vitejs/plugin-react-swc';
import { UserConfig } from 'vite';

export const jsAsJsxFilter = (): UserConfig => ({
  // https://github.com/vitejs/vite/discussions/3448
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[tj]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build: any) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args: any) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, 'utf8')
            }));
          }
        }
      ]
    }
  }
});

export const jsAsJsxAll = (): UserConfig => ({
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[tj]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
});

const defaultLibraryViteConfig: UserConfig = {
  plugins: [react()],
  ...jsAsJsxFilter(),
  envPrefix: 'REACT_APP_',
  // https://github.com/vitejs/vite/issues/1973
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV
  },
  resolve: {
    conditions: ['development']
  }
};

export { defaultLibraryViteConfig };
