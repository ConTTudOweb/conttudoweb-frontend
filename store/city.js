import { set } from '~/utils/vuex'

export const state = () => ({
  cidades: null
})

export const mutations = {
  SET_LISTA: set('cidades')
}

// export const actions = {
//   loadCidades: load()
// }
