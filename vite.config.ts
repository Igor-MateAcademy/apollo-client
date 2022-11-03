import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// resolve "baseUrl" from tsconfig.json
import tsConfigPath from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath()],
});
