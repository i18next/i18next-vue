import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            reporter: 'text'
        }
    },
});