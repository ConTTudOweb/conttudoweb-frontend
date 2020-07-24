import createRepository from '~/api/repository'

const baseUrlAPI = '/api'
const urlFederativeUnit = baseUrlAPI + '/federative-unit'
const urlCity = baseUrlAPI + '/city'
const urlPeople = baseUrlAPI + '/people'
const urlUnitOfMeasure = baseUrlAPI + '/unit-of-measure'
const urlCategory = baseUrlAPI + '/category'
const urlSubcategory = baseUrlAPI + '/subcategory'
const urlProductSizeRegister = baseUrlAPI + '/product-size-register'
const urlProduct = baseUrlAPI + '/product'

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
    allowGrid = true,
    allowForm = false,
    alignGrid = 'left',
    sortable = true,
    form = {},
    align = 'start'
  }) {
    return {
      field,
      label,
      type,
      choices,
      allowGrid,
      allowForm,
      alignGrid,
      sortable,
      form,
      align
    }
  }

  const fieldTypeTextTag = 'v-text-field'
  const fieldTypeCheckTag = 'v-checkbox'
  const fieldTypeRadioTag = 'v-radio-group'
  const fieldTypeAutoCompleteTag = 'v-autocomplete'

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
          rules: [rules.required],
          maxlength: 2,
          autofocus: true
        }
      }),
      getField({
        field: 'name',
        label: 'nome',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          sm: 8,
          rules: [rules.required],
          maxlength: 255
        }
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
  inject(
    'cityRepository',
    repositoryWithAxios(urlCity, 'Cidade', [
      getField({
        field: 'id',
        label: 'ID'
      }),
      getField({
        field: 'name',
        label: 'Nome',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          xs: 6,
          sm: 4,
          rules: [rules.required],
          maxlength: 2,
          autofocus: true
        }
      }),
      getField({
        field: 'uf',
        label: 'UF',
        allowForm: true,
        allowGrid: false,
        form: {
          type: fieldTypeTextTag,
          sm: 8,
          rules: [rules.required],
          maxlength: 255
        }
      }),
      getField({
        field: 'uf__initials',
        label: 'UF'
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
        label: 'Cliente?',
        type: 'boolean',
        allowForm: true,
        form: {
          type: fieldTypeCheckTag,
          xs: 6,
          autofocus: true
        }
      }),
      getField({
        field: 'supplier',
        label: 'Fornecedor?',
        type: 'boolean',
        allowForm: true,
        form: { type: fieldTypeCheckTag, xs: 6 }
      }),
      getField({
        field: 'name',
        label: 'Nome',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          required: true,
          rules: [rules.required],
          max_length: 60
        }
      }),
      getField({
        field: 'person_type',
        label: 'Tipo',
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
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeRadioTag }
      }),
      getField({
        field: 'federation_subscription_number',
        label: 'CPF/CNPJ',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 6, maxlength: 18 }
      }),
      getField({
        field: 'state_subscription_number',
        label: 'RG/IE',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 6, maxlength: 18 }
      }),
      getField({
        field: 'phone',
        label: 'Telefone',
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 6, maxlength: 20 }
      }),
      getField({
        field: 'email',
        label: 'Email',
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 6, maxlength: 254 }
      }),
      getField({
        field: 'zip_code',
        label: 'CEP',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, xs: 6, maxlength: 10 }
      }),
      getField({
        field: 'address',
        label: 'Logradouro',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 10, maxlength: 255 }
      }),
      getField({
        field: 'address_number',
        label: 'Número',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 2, maxlength: 60 }
      }),
      getField({
        field: 'complement',
        label: 'Complemento',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 6, maxlength: 60 }
      }),
      getField({
        field: 'neighborhood',
        label: 'Bairro',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag, sm: 6, maxlength: 60 }
      }),
      getField({
        field: 'city',
        label: 'Cidade',
        type: 'field',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeAutoCompleteTag, items: 'cities' }
      }),
      getField({
        field: 'observation',
        label: 'Observação',
        allowGrid: false,
        allowForm: true,
        form: { type: fieldTypeTextTag }
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
  inject(
    'unitOfMeasureRepository',
    repositoryWithAxios(urlUnitOfMeasure, 'Unidade de Medida', [
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
          rules: [rules.required],
          maxlength: 5,
          autofocus: true
        }
      }),
      getField({
        field: 'description',
        label: 'descrição',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          sm: 8,
          rules: [rules.required],
          maxlength: 120
        }
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
  inject(
    'categoryRepository',
    repositoryWithAxios(urlCategory, 'Categoria de Produto', [
      getField({
        field: 'id',
        label: '#'
      }),
      getField({
        field: 'code',
        label: 'código',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          xs: 6,
          sm: 4,
          maxlength: 20,
          autofocus: true
        }
      }),
      getField({
        field: 'description',
        label: 'descrição',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          sm: 8,
          rules: [rules.required],
          maxlength: 120
        }
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
  inject(
    'subcategoryRepository',
    repositoryWithAxios(urlSubcategory, '', [
      getField({
        field: 'id',
        label: '#'
      }),
      getField({
        field: 'code',
        label: 'código',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          xs: 6,
          sm: 4,
          maxlength: 20,
          autofocus: true
        }
      }),
      getField({
        field: 'category__description',
        label: 'categoria'
      }),
      getField({
        field: 'description',
        label: 'descrição',
        allowForm: true,
        form: {
          type: fieldTypeTextTag,
          sm: 8,
          rules: [rules.required],
          maxlength: 120
        }
      }),
      getField({
        field: 'category',
        label: 'categoria',
        allowForm: true,
        allowGrid: false
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false
      })
    ])
  )
  inject(
    'productSizeRegisterRepository',
    repositoryWithAxios(urlProductSizeRegister, '', [
      getField({
        field: 'id',
        label: '#'
      }),
      getField({
        field: 'description',
        label: 'descrição'
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false,
        align: 'center'
      })
    ])
  )
  inject(
    'productRepository',
    repositoryWithAxios(urlProduct, '', [
      getField({
        field: 'id',
        label: '#'
      }),
      getField({
        field: 'description',
        label: 'descrição'
      }),
      getField({
        field: 'unit_of_measure__str',
        label: 'unidade de medida'
      }),
      getField({
        field: 'ncm',
        label: 'ncm'
      }),
      getField({
        field: 'subcategory__str',
        label: 'Subcategoria'
      }),
      getField({
        field: 'cost_price_of_last_purchase',
        label: 'Preço de custo da última compra'
      }),
      getField({
        field: '_actions',
        label: '',
        sortable: false,
        align: 'center'
      })
    ])
  )
}
