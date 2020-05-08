import createRepository from '~/api/repository'

const baseUrlAPI = '/api'
const urlFederativeUnit = baseUrlAPI + '/federative-unit'
const urlPeople = baseUrlAPI + '/people'

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
    type = 'string',
    choices = [],
    allowForm = false,
    alignGrid = 'left',
    sortable = true,
    form = {}
  }) {
    return { field, label, type, choices, allowForm, alignGrid, sortable, form }
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
  inject(
    'peopleRepository',
    repositoryWithAxios(urlPeople, 'Cliente / Fornecedor', [
      getField({
        field: 'id',
        label: '#'
      }),
      getField({
        field: 'customer',
        label: 'cliente?',
        type: 'boolean',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          autofocus: true
        }
      }),
      getField({
        field: 'supplier',
        label: 'fornecedor?',
        type: 'boolean',
        allowForm: true,
        form: { type: fieldTypeTextTag }
      }),
      getField({
        field: 'name',
        label: 'nome',
        allowForm: true,
        form: { type: fieldTypeTextTag, rules: [rules.required] }
      }),
      getField({
        field: 'person_type',
        label: 'tipo',
        type: 'choice',
        choices: [
          {
            value: 'F',
            display_name: 'Pessoa Física'
          },
          {
            value: 'J',
            display_name: 'Pessoa Jurídica'
          }
        ],
        allowForm: true,
        form: { type: fieldTypeTextTag }
      }),
      getField({
        field: 'federation_subscription_number',
        label: 'CPF/CNPJ',
        allowForm: true,
        form: { type: fieldTypeTextTag, rules: [rules.required] }
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
}
