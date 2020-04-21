export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    config.baseURL = process.env.API_PROTOCOL
    if (store.state.subDomain) {
      config.baseURL += store.state.subDomain + '.'
    }
    config.baseURL += process.env.API_BASE
  })

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 0) {
  //     redirect('/400')
  //   }
  // })
}
