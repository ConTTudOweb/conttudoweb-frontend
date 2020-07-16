export default function({ $axios, store, app }) {
  $axios.setHeader('Tenant', store.state.subDomain)

  // $axios.onRequest((config) => {
  //   config.baseURL = process.env.API_PROTOCOL
  //   if (store.state.subDomain) {
  //     config.baseURL += store.state.subDomain + '.'
  //   }
  //   config.baseURL += process.env.API_BASE
  // })

  $axios.onError((error) => {
    const { response = null } = error

    // Check is network error
    if (!response) {
      // throw new Error(error.message)
      throw new URIError('Erro de conexão!')
    }

    const { status } = response

    if (status === 401) {
      app.$auth.logout();
    }

    if (status === 423) {
      throw new Error('Registro ainda está sendo referenciado por outros cadastros!')
    }

    const checkStatus =
      status === 400 || status === 404 || status === 500 || status === 403

    if (checkStatus) {
      const { data } = response
      Object.keys(data).forEach((m) => {
        let isArray
        isArray = false
        if (Array.isArray(data[m])) {
          isArray = true
          data[m].forEach((k) => {
            // throw new Error(`${k}`)
            throw new Error(k)
          })
        }
        // else {
        //   // eslint-disable-next-line unicorn/prefer-type-error
        //   // throw new Error(`${m}: ${data[m]}`)
        //   throw new Error(`${data[m]}`)
        // }

        if (!isArray) {
          throw new Error(data[m])
        }
      })
    }
  })
}
