import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Default ports. Override them when a port is busy, e.g. `API_PORT=4001 WEB_PORT=5174 npm run dev`.
const apiPort = Number(process.env.API_PORT) || 3001;
const webPort = Number(process.env.WEB_PORT) || 5173;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: webPort,
    // Fail loudly if the port is busy instead of silently switching to another one.
    strictPort: true,
    // Forward every request that starts with /api to the Express server.
    // The browser only talks to Vite, so no CORS configuration is needed.
    proxy: {
      '/api': `http://localhost:${apiPort}`,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
