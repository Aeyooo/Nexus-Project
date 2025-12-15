// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    config: {
      darkMode: 'class'
    }
  },
  // CORS PROXY CONFIGURATION
  routeRules: {
    // Requests to /proxy/api/... will be forwarded to the Render Backend
    '/proxy/api/**': { 
      proxy: 'https://cpe-2lfo.onrender.com/api/**',
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }, // Smooth page transitions
    head: {
      title: 'NexusModeler',
      meta: [
        { name: 'description', content: 'Interactive Nexus Scenario Modeling Platform' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      // link: [
      //   { rel: 'stylesheet', href: '[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap)' }
      // ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '' // Live Production API
    }
  }
})