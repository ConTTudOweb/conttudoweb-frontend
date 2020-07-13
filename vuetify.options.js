// import '@/sass/overrides.sass'


// '#9C27b0',
// '#00CAE3',
// '#4CAF50',
// '#ff9800',
// '#E91E63',
// '#FF5252',

const theme = {
  // primary: '#4CAF50',
  primary: '#ff9800',
  secondary: '#FF5252',
  accent: '#9C27b0',
  info: '#00CAE3',
}

export default function ({ app }) {
  return {
    lang: {
      t: (key, ...params) => app.i18n.t(key, params)
    },
    theme: {
      themes: {
        dark: theme,
        light: theme
      }
    }
  }
}
