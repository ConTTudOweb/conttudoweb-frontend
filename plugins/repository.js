import createRepository from '~/api/repository'

const baseUrlAPI = '/api/'
const urlFederativeUnit = baseUrlAPI + 'federative-unit/'

export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject(
    'federativeUnitRepository',
    repositoryWithAxios(urlFederativeUnit, 'Unidade Federativa')
  )
}
