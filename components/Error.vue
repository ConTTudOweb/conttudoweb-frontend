<template>
  <v-alert
    v-model="alert"
    text
    prominent
    type="error"
    icon="mdi-cloud-alert"
    border="left"
    dismissible
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      alert: false
    }
  },
  watch: {
    message: {
      handler(val, oldVal) {
        if (val) {
          this.alert = true
        }
      }
    },
    alert: function (val, oldVal) {
      if (val === false) {
        this.message = ''
      }
    },
  }
}
</script>
