import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.js'),
                'cli-sync-version': path.resolve(__dirname, 'src/cli-sync-version.js'),
            },
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => {
                const ext = format === 'es' ? 'mjs' : 'cjs'
                return `${entryName}.${ext}`
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            external: [
                /^react($|\/)/,
                /^react-dom($|\/)/,
                'fs',
                'path'
            ],
        },
    },
})
