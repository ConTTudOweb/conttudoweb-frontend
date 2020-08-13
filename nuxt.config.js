import pt from 'vuetify/es5/locale/pt'
// import light from './plugins/vuetify/light_theme.js'
import head from './config/head'

require('dotenv').config()

export default {
  mode: 'spa',

  generate: {
    fallback: true
  },

  watch: ['~/config/*.js'],

  head,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@assets/custom.scss'
    // { src: '@assets/overrides.sass', lang: 'sass' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-inject',
    '~/plugins/tenant',
    '~/plugins/axios',
    '~/plugins/repository',
    '~/plugins/base',
    { src: '~/plugins/currency', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  env: {},
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/date-fns'
  ],
  // dateFns: {
  //   locales: ['pt-BR',],
  //   defaultLocale: 'pt-BR',
  //   format: 'yyyy-MM'
  // },
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['nuxt-i18n', {
      lazy: true,
      locales: [
        // {
        //   code: 'en',
        //   name: 'English',
        //   iso: 'en-US',
        //   langFile: 'en_US.js'
        // },
        {
          code: 'pt',
          name: 'Português',
          iso: 'pt-BR',
          file: 'pt-BR.js'
        }
      ],
      loadLanguagesAsync: true,
      langDir: 'locales/',
      defaultLocale: 'pt',
      vueI18n: {
        fallbackLocale: 'pt'
      }
    }],
    '@nuxtjs/toast',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    ['v-currency-field/nuxt-treeshaking', {
      locale: 'pt-BR',
      decimalLength: 2,
      autoDecimalMode: true,
      min: null,
      max: null,
      defaultValue: 0,
      valueAsInteger: false,
      allowNegative: true
    }]
    // ['vue-currency-input/nuxt', {
    //   globalOptions: {
    //     currency: 'BRL',
    //     locale: 'pt-BR',
    //     'auto-decimal-mode': true,
    //     'distraction-free': false
    //   }
    // }]
  ],
  toast: {
    position: 'bottom-center',
    duration: 5000,
    keepOnHover: true,
    theme: 'bubble',
    iconPack: 'mdi',
    allowHtml: true,
    register: [
      // Register custom toasts
      {
        name: 'error_save',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return `Oops... Algo deu errado! :(<br />${payload}`
          }
          // if there is a message show it with the message
          return payload.message
        },
        options: {
          type: 'error',
          icon: 'message-alert'
        }
      },
      {
        name: 'error_delete',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return `Oops... Algo deu errado! :(<br />${payload}`
          }
          // if there is a message show it with the message
          return payload.message
        },
        options: {
          type: 'error',
          icon: 'message-alert'
        }
      },
      {
        name: 'success_save',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return 'Registro salvo!'
          }
          // if there is a message show it with the message
          return payload.message
        },
        options: {
          type: 'success',
          icon: 'check'
        }
      },
      {
        name: 'success_delete',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return 'Registro apagado!'
          }
          // if there is a message show it with the message
          return payload.message
        },
        options: {
          type: 'success',
          icon: 'check'
        }
      }
    ]
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/rest-auth/login/',
            method: 'post',
            propertyName: 'key'
          },
          logout: { url: '/rest-auth/logout/', method: 'post' },
          user: { url: '/rest-auth/user/', method: 'get', propertyName: false }
        },
        tokenType: 'Token'
      }
    },
    watchLoggedIn: true,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/dashboard'
    },
    localStorage: true,
    cookie: false,
    autoLogout: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    debug: process.env.NUXT_ENV_AXIOS_DEBUG || false,
    baseURL: process.env.NUXT_ENV_API_URL || 'http://localhost:8000'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: [
      '~/assets/variables.scss',
      '~/assets/overrides.sass',
      // { src: '~assets/overrides.sass', lang: 'sass' }
    ],
    optionsPath: './vuetify.options.js'
    // theme: {
    //   dark: false,
    //   themes: {
    //     light
    //     // dark: {
    //     //   primary: colors.blue.darken2,
    //     //   accent: colors.grey.darken3,
    //     //   secondary: colors.amber.darken3,
    //     //   info: colors.teal.lighten1,
    //     //   warning: colors.amber.base,
    //     //   error: colors.deepOrange.accent4,
    //     //   success: colors.green.accent3
    //     // }
    //   }
    // },
    // lang: {
    //   locales: { pt },
    //   current: 'pt'
    // }
  },
  router: {
    middleware: ['auth']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  },
  server: {
    // host: '0.0.0.0' // default: localhost
  }
}
