import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/guide/plugins.html 
export default defineConfig({
  plugins: [react()],
});