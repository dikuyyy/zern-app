export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_PUBLIC_API_URL
        }
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    },

    ssr: true,

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Zern App',
        }
    },

    compatibilityDate: '2024-09-17'
})