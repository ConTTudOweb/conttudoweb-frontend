<template>
  <v-app>
    <c-menu ref="menu" :items="items" :clipped="clipped" :is-dark="true" />

    <c-header
      :title="title"
      :clipped="clipped"
      :is-dark="true"
      @toggle-drawer="$refs.menu.drawer = !$refs.menu.drawer"
    />

    <v-main class="secondary lighten-5">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <c-footer :is-dark="true" />
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
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/'
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire'
        // },
        {
          icon: 'mdi-border-color',
          title: 'Unidades federativas',
          to: '/federative-unit'
        },
        {
          icon: 'mdi-border-color',
          title: 'Cidades',
          to: '/city'
        },
        {
          icon: 'mdi-border-color',
          title: 'Clientes / Fornecedores',
          to: '/people'
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
