<template>
  <v-app>
    <!--<v-navigation-drawer-->
    <!--  v-model="drawer"-->
    <!--  :mini-variant="miniVariant"-->
    <!--  :clipped="clipped"-->
    <!--  fixed-->
    <!--  app-->
    <!--&gt;-->
    <!--  <v-list>-->
    <!--    <v-list-item-->
    <!--      v-for="(item, i) in items"-->
    <!--      :key="i"-->
    <!--      :to="item.to"-->
    <!--      router-->
    <!--      exact-->
    <!--    >-->
    <!--      <v-list-item-action>-->
    <!--        <v-icon>{{ item.icon }}</v-icon>-->
    <!--      </v-list-item-action>-->
    <!--      <v-list-item-content>-->
    <!--        <v-list-item-title v-text="item.title" />-->
    <!--      </v-list-item-content>-->
    <!--    </v-list-item>-->
    <!--  </v-list>-->
    <!--</v-navigation-drawer>-->
    <c-menu ref="menu" :items="items" :clipped="clipped" :is-dark="true" />

    <!--<v-app-bar :clipped-left="clipped" fixed app>-->
    <!--  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
    <!--  <v-toolbar-title v-text="title" />-->
    <!--  <v-spacer />-->
    <!--  <v-btn icon @click.stop="rightDrawer = !rightDrawer">-->
    <!--    <v-icon>mdi-menu</v-icon>-->
    <!--  </v-btn>-->
    <!--</v-app-bar>-->
    <c-header
      :title="title"
      :clipped="clipped"
      @toggle-drawer="$refs.menu.drawer = !$refs.menu.drawer"
      :is-dark="false"
    />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!--<v-footer :fixed="fixed" app>-->
    <!--  <span>&copy; {{ new Date().getFullYear() }}</span>-->
    <!--</v-footer>-->
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
