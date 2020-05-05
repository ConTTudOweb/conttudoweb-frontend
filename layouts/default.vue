<template>
  <v-app>
    <c-menu ref="menu" :items="items" :clipped="clipped" :is-dark="true" />

    <c-header
      :title="title"
      :clipped="clipped"
      :is-dark="false"
      @toggle-drawer="$refs.menu.drawer = !$refs.menu.drawer"
    />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <c-footer :clipped="clipped" :is-dark="true" />
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
      clipped: true,
      drawer: null,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-icon',
          title: 'Unidade federativas',
          to: '/federative-unit'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ConTTudOweb App'
    }
  }
}
</script>
