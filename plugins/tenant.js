export default function({ store }) {
  const host = window.location.host
  const parts = host.split('.')
  if ((parts.length === 2 || parts.length === 4) && parts[0] !== 'www') {
    store.commit('SET_SUBDOMAIN', parts[0])
  }
}
