export const state = () => ({
  drawer: true
})

export const mutations = {
  toogleDrawer(state) {
    state.drawer = !state.drawer
  }
}
