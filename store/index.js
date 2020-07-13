export const state = () => ({
  subDomain: null,
  drawer: null
})

export const mutations = {
  SET_SUBDOMAIN(state, subDomain) {
    state.subDomain = subDomain
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  }
}
