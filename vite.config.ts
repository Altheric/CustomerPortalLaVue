import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const srcPath = path.resolve('./resources/js');

export const resolve = {
    alias: {
        // shared aliases
        components: path.join(srcPath, 'components'),
        routes: path.join(srcPath, 'routes'),
        constants: path.join(srcPath, 'constants'),

        // domains
        domains: path.join(srcPath, 'domains'),

        // general aliases
        services: path.join(srcPath, 'services'),
        types: path.join(srcPath, 'types'),
        errors: path.join(srcPath, 'errors'),
        helpers: path.join(srcPath, 'helpers'),
    },
};

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.ts'],
            refresh: true,
        }),
        vue(),
    ],
    build: {target: 'esnext'},
    resolve,
});