import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	// conditionally set the base path
	base: mode === 'production' ? '/frontend/' : '/',
	plugins: [react()],
	build: {
		outDir: 'frontend',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, // removes console logs in production
			},
		},
	},
}));
