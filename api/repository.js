// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default ($axios) => (resource, title, fields) => ({
  index(page, itemsPerPage) {
    let url = `${resource}/`;
    let params;
    if (page) {
      if (params) {
        params += '&'
      }
      params += `page=${page}`
    }
    if (itemsPerPage) {
      if (params) {
        params += '&'
      }
      params += `page_size=${itemsPerPage}`
    }
    if (params) {
      url += `?${params}`
    }
    return $axios.$get(url).then((result) => {
      return result.results
    })
  },

  show(id) {
    return $axios.$get(`${resource}/${id}/`)
  },

  create(payload) {
    return $axios.$post(`${resource}/`, payload)
  },

  update(id, payload) {
    return $axios.$put(`${resource}/${id}/`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}/`)
  },

  displayFields() {
    return fields
      .filter((f) => f.allowGrid)
      .map((m) => ({
        value: m.field,
        text: m.label.toUpperCase(),
        sortable: m.sortable
      }))
  },

  booleanDisplayFields() {
    return fields
      .filter((f) => f.type === 'boolean' && f.allowGrid)
      .map((m) => [m.field])
  },

  formFields() {
    return fields
      .filter((f) => f.allowForm)
      .map((m) => ({
        ...m.form,
        type: m.type,
        field: m.field,
        label: m.label,
        choices: m.choices
      }))
  },

  props() {
    return {
      title
    }
  }
})
