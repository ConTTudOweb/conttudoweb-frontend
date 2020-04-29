export const state = () => ({
  subDomain: null
  // listFederativeUnit: null
})

export const mutations = {
  SET_SUBDOMAIN(state, subDomain) {
    state.subDomain = subDomain
  }
}

// export const actions = {
//   async loadFederativeUnit({ commit }) {
//     const { data } = await this.$axios.get('/api/federative-unit/')
//     console.info(data)
//     commit('SET_FEDERATIVE-UNIT_LIST', data)
//   }
// }
