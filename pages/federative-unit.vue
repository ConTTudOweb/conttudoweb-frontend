<template>
  <crud :repository="this.$nuxt.context.app.$federativeUnitRepository" />
</template>

<script>
import Crud from '~/components/Crud'

export default {
  components: {
    Crud
  }
}
</script>
