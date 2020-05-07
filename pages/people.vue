<template>
  <c-crud :repository="this.$nuxt.context.app.$peopleRepository" />
</template>

<script>
import CCrud from '~/components/Crud'

export default {
  components: {
    CCrud
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$peopleRepository
    }
  },
  head() {
    return {
      title: this.repository.props().title
    }
  }
}
</script>
