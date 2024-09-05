import react from '@vitejs/plugin-react'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react()],
    base: 'movie-database',
    resolve: {
        alias: {
            '@/app': path.resolve(__dirname, './src/app'),
            '@/processes': path.resolve(__dirname, './src/processes'),
            '@/pages': path.resolve(__dirname, './src/pages'),
            '@/widgets': path.resolve(__dirname, './src/widgets'),
            '@/features': path.resolve(__dirname, './src/features'),
            '@/entities': path.resolve(__dirname, './src/entities'),
            '@/shared': path.resolve(__dirname, './src/shared'),
        },
    },
    server: {
        port: 3000,
    },
})
