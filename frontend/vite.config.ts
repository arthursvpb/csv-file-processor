import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { defineConfig } from 'vite';

const server = { host: true, port: 5173 };
export default defineConfig({
  plugins: [react(), tailwindcss(), eslintPlugin()],
  server,
});
