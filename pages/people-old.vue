<template>
  <c-crud :repository="this.$nuxt.context.app.$peopleRepository">
    <template v-slot:item.customer="{ item }">
      <v-simple-checkbox v-model="item.customer" disabled></v-simple-checkbox>
    </template>
    <template v-slot:vDataTableItemSlot="item">
      <template v-if="item.proxiedProps.item.customer">
        <v-icon>block</v-icon>
      </template>
      <template v-else>
        <v-icon>done</v-icon>
      </template>
    </template>
  </c-crud>
</template>

<script>
import CCrud from '~/components/Crud'

export default {
  components: {
    CCrud
  }
}
</script>
