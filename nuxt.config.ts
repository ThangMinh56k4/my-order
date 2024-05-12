// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/sass/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/sass/element/index.scss" as element;',
        },
      },
    },
  },
  modules: [
    '@unocss/nuxt',
    ['@nuxt/eslint', {
      config: {
        stylistic: true,
      },
    }],
    ['@element-plus/nuxt', {
      importStyle: 'scss',
      icon: false,
      themes: ['dark'],
    }],
    ['@nuxtjs/i18n', {
      locales: [
        { code: 'vi', iso: 'vi-VN', file: 'vi-VN.yml', name: 'Tiếng Việt' },
        { code: 'en', iso: 'en-US', file: 'en-US.yml', name: 'English' },
      ],
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',
        alwaysRedirect: false,
      },
      lazy: true,
      langDir: 'lang',
      precompile: { strictMessage: false, escapeHtml: true },
      defaultLocale: 'vi',
    }],
    ['@vesp/nuxt-fontawesome', {
      component: 'fa',
      suffix: false,
    }],
    ['@pinia/nuxt', {
      storesDirs: ['./stores/**', './custom-folder/stores/**'],
    }],
  ],
  imports: {
    dirs: ['stores', 'constants', 'utils'],
  },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
  vue: {
    propsDestructure: true,
  },
})
