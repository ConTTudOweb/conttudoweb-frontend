export const state = () => ({
  subDomain: null
})

export const mutations = {
  SET_SUBDOMAIN(state, subDomain) {
    state.subDomain = subDomain
  }
}
