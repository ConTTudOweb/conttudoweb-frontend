export default function({ store }) {
  if (process.env.NUXT_ENV_SUB_DOMAIN) {
    store.commit('SET_SUBDOMAIN', process.env.NUXT_ENV_SUB_DOMAIN)
  } else {
    const host = window.location.host
    const parts = host.split('.')
    if ((parts.length === 2 || parts.length === 5) && parts[0] !== 'www') {
      store.commit('SET_SUBDOMAIN', parts[0])
    }
  }
}
