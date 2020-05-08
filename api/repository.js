// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default ($axios) => (resource, title, fields) => ({
  index() {
    return $axios.$get(`${resource}/`)
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

  _getDisplayFields() {
    return fields
  },

  displayFields() {
    return fields.map((m) => ({
      value: m.field,
      text: m.label.toUpperCase(),
      sortable: m.sortable
    }))
  },

  booleanDisplayFields() {
    return fields.filter((f) => f.type === 'boolean').map((m) => [m.field])
  },

  formFields() {
    return fields
      .filter((f) => f.allowForm)
      .map((m) => ({ ...m.form, field: m.field, label: m.label }))
  },

  props() {
    return {
      title
    }
  }
})
