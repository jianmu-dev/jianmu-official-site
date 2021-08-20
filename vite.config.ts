import { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { name, version } from './package.json';

// https://vitejs.dev/config/
export default (
  { command, mode }: ConfigEnv,
): UserConfigExport => {
  return {
    plugins: [vue()],
    // base public path
    base: command === 'build' && mode === 'production' ? `https://cdn.jianmu.run/${name}/${version}/` : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
};
