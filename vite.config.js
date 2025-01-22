import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        open: false,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
