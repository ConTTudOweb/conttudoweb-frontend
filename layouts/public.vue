<template>
  <v-app>
    <c-menu ref="menu" :items="items" :clipped="clipped" />
    <c-header
      :title="title"
      :clipped="clipped"
      @toggle-drawer="$refs.menu.drawer = !$refs.menu.drawer"
    />
    <v-content>
      <nuxt />
    </v-content>
    <c-footer :clipped="clipped" />
  </v-app>
</template>

<script>
import CMenu from '~/components/application/Menu.vue'
import CHeader from '~/components/application/Header.vue'
import CFooter from '~/components/application/Footer.vue'

export default {
  components: {
    CMenu,
    CHeader,
    CFooter
  },
  data() {
    return {
      title: 'ConTTudOweb',
      items: [
        {
          icon: 'mdi-home',
          title: 'Início',
          to: '/'
        }
        // {
        //   icon: 'mdi-information',
        //   title: 'Sobre nós',
        //   to: '/sobre'
        // }
      ],
      drawer: null,
      clipped: false
    }
  }
}
</script>
