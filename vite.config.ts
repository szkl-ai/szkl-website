import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitesStatic } from './build/sites-static-vite-plugin';

export default defineConfig(async () => {
  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    base: '/',
    plugins: [
      react(),
      cloudflare({
        config: {
          main: './worker/index.ts',
          assets: {
            binding: 'ASSETS',
            not_found_handling: 'single-page-application',
          },
        },
      }),
      sitesStatic(),
    ],
  };
});
