import { defineConfig } from 'vite';

export default defineConfig({
    base: "/progress-block-ozon/",
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
