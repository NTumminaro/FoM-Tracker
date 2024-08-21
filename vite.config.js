import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
	base: mode === 'production' ? '/FoM-Tracker/' : '/',
	plugins: [react()],
	build: {
		outDir: 'dist', 
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
}));
