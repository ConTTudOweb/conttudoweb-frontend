<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" class="text-center">
      <v-col cols="12">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h1 v-if="statusCode === 404" v-html="pageNotFound" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h1 v-else v-html="otherError" />
      </v-col>
      <v-col cols="12">
        Voltar para a
        <NuxtLink to="/" class="text-uppercase subtitle-1 font-weight-medium">
          Página inicial
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound:
        'Ops... Página não encontrada!<br /><small class="overline">(404 ' +
        this.error.message +
        ')</small>',
      otherError:
        'Ops... Ocorreu um erro inesperado!<br /><small class="overline">(' +
        this.error.statusCode +
        ' ' +
        this.error.message +
        ')</small>'
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  },
  head() {
    const title = this.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
