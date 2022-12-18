import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  server: {
    host: '127.0.0.1',
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin()
  ],
})