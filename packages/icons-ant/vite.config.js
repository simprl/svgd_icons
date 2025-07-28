import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        ssr: true,
        lib: {
            entry: ['scripts/generate-icons.js'],
            formats: ['cjs'],
            fileName: (format, entryName) => {
                const ext = format === 'es' ? 'mjs' : 'cjs'
                return `${entryName}.${ext}`
            }

        },
        outDir: 'dist',
        rollupOptions: {
            external: ['react', 'react-dom', "@svgd/icons-utils"],
        }
    }
});

