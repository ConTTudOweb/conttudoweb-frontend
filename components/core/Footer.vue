<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="auto">
          <v-switch
            v-model="$vuetify.theme.dark"
            class="ma-0 pa-0 body-1 font-weight-light"
            hide-details
          >
            <template v-slot:label>
              <span class="body-1 font-weight-light">Dark Mode</span>
            </template>
          </v-switch>
        </v-col>
        <v-col
          v-for="(link, i) in computedLinks"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <a
            :href="link.href"
            class="mr-0 grey--text text--darken-3"
            rel="noopener"
            target="_blank"
            v-text="link.text"
          />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
        >
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2014-{{ new Date().getFullYear() }}, {{ $t('made-with') }}
            <v-icon size="18">
              mdi-heart
            </v-icon>
            {{ $t('by') }} <a href="http://conttudoweb.com.br/">{{ $t('company.name') }}</a>.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
      links: [
        // {
        //   href: 'http://conttudoweb.com.br/',
        //   text: 'about-us',
        // }
      ]
    }),
    computed: {
      computedLinks () {
        return this.links.map(this.mapLink)
      },
    },
    methods: {
      mapLink (link) {
        return {
          ...link,
          text: this.$t(link.text),
        }
      }
    }
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
