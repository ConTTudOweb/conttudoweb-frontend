import createRepository from '~/api/repository'

const baseUrlAPI = '/api'
const urlFederativeUnit = baseUrlAPI + '/federative-unit'

const rules = {
  required: (value) => !!value || 'Campo obrigatório!',
  counter: (value) => value.length <= 20 || 'Max 20 characters',
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  }
}

export default (ctx, inject) => {
  function getField({
    field,
    label,
    allowForm = false,
    alignGrid = 'left',
    sortable = true,
    form = {}
  }) {
    return { field, label, allowForm, alignGrid, sortable, form }
  }

  const fieldTypeTextTag = 'v-text-field'

  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject(
    'federativeUnitRepository',
    repositoryWithAxios(urlFederativeUnit, 'Unidade Federativa', [
      getField({
        field: 'id',
        label: '#'
      }),
      getField({
        field: 'initials',
        label: 'sigla',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          xs: 6,
          sm: 4,
          rules: [rules.required]
        }
      }),
      getField({
        field: 'name',
        label: 'nome',
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 8, rules: [rules.required] }
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
}
