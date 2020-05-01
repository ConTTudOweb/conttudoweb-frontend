import colors from 'vuetify/es5/util/colors'
import pt from 'vuetify/es5/locale/pt'
import light from './plugins/vuetify/light_theme.js'

require('dotenv').config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    // this htmlAttrs you need
    htmlAttrs: {
      lang: 'pt-br'
    },
    titleTemplate: '%s - ' + 'ConTTudOweb',
    title: 'Início',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ConTTudOweb - Soluções em Tecnologia'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@assets/custom.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-inject',
    '~/plugins/tenant',
    '~/plugins/axios',
    '~/plugins/repository'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  env: {
    API_PROTOCOL: process.env.API_PROTOCOL,
    API_BASE: process.env.API_BASE
  },
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/toast',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  toast: {
    position: 'top-right',
    duration: 5000,
    keepOnHover: true,
    theme: 'bubble',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      },
      {
        name: 'my-success',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return 'Uhull...OK!'
          }

          // if there is a message show it with the message
          return payload.message
        },
        options: {
          type: 'success'
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
      logout: '/dashboard',
      callback: '/login',
      home: '/dashboard'
    },
    localStorage: false,
    cookie: false
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    debug: process.env.NUXT_ENV_AXIOS_DEBUG || false
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light,
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    lang: {
      locales: { pt },
      current: 'pt'
    }
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
    host: '0.0.0.0' // default: localhost
  }
}
