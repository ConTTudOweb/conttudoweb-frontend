export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    config.baseURL = process.env.API_PROTOCOL
    if (store.state.subDomain) {
      // TODO: Tirar as duas linhas abaixo!
      // eslint-disable-next-line no-console
      console.log('setou o subDomain no baseurl')
      config.baseURL += store.state.subDomain + '.'
    }
    config.baseURL += process.env.API_BASE
  })

  $axios.onError((error) => {
    const { response = null } = error

    // Check is network error
    if (!response) {
      throw new Error(error.message)
    }

    const { status } = response

    // if (status === 401) {
    //   await store.dispatch('auth/doSignOut')
    // }

    const checkStatus = status === 400 || status === 404 || status === 500

    if (checkStatus) {
      const { data } = response
      Object.keys(data).forEach((m) => {
        if (Array.isArray(data[m])) {
          data[m].forEach((k) => {
            // throw new Error(`${k}`)
            throw k
          })
        } else {
          // eslint-disable-next-line unicorn/prefer-type-error
          throw new Error(`${m}: ${data[m]}`)
        }
      })
    }
  })
}
