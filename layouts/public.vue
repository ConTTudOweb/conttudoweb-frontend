<template>
  <v-app>
    <!--<c-menu ref="menu" :items="items" :clipped="clipped" />-->
    <c-header
      :title="title"
      :clipped="clipped"
      @toggle-drawer="$refs.menu.drawer = !$refs.menu.drawer"
    />
    <v-main>
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        fixed
        dark
        fab
        bottom
        right
        color="success"
        :href="this.$g('site.whatsapp')"
        target="_blank"
      >
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
      <nuxt />
    </v-main>
    <c-footer />
  </v-app>
</template>

<script>
// import CMenu from '~/components/application/Menu.vue'
import CHeader from '~/components/application/Header.vue'
import CFooter from '~/components/application/Footer.vue'

export default {
  middleware({ store, redirect, $auth }) {
    if (store.state.subDomain) {
      if (!$auth.loggedIn) {
        return redirect('/login')
      } else {
        return redirect('/dashboard')
      }
    }
  },
  components: {
    // CMenu,
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
