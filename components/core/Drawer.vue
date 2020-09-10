<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    dark
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    width="270"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
          tile
        >
          <v-img
            src="/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item && item.children && item.children.length > 0"
          :key="`group-${i}`"
          :item="item"
        >
          <template v-for="(item, i) in item.children">
            <base-item
              :key="`item-${i}`"
              :item="item"
            />
          </template>
        </base-item-group>

        <base-item
          v-else-if="!item.children"
          :key="`item-${i}`"
          :item="item"
        />
      </template>

<!--      <template v-for="(item, i) in computedItems">-->
<!--        <base-item-group-->
<!--          v-if="item && item.children && 1===0"-->
<!--          :key="`group-${i}`"-->
<!--          :item="item"-->
<!--        >-->
<!--          &lt;!&ndash;  &ndash;&gt;-->
<!--        </base-item-group>-->

<!--        <base-item-->
<!--          v-else-->
<!--          :key="`item-${i}`"-->
<!--          :item="item"-->
<!--        />-->
<!--      </template>-->

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

    <!--<template v-slot:append>-->
    <!--  <base-item-->
    <!--    :item="{-->
    <!--      title: $t('upgrade'),-->
    <!--      icon: 'mdi-package-up',-->
    <!--      to: '/upgrade',-->
    <!--    }"-->
    <!--  />-->
    <!--</template>-->
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'menu.dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-border-color',
          title: 'menu.core',
          group: 'core',
          children: [
            {
              title: 'menu.core.persons',
              to: '/core/person',
              permission: 'core.view_people'
            },
            {
              title: 'menu.core.federative-units',
              to: '/core/federative-unit',
              permission: 'core.view_federativeunit'
            },
            {
              title: 'menu.core.cities',
              to: '/core/city',
              permission: 'core.view_city'
            }
          ],
        },
        {
          icon: 'mdi-package-variant',
          title: 'menu.inventory',
          group: 'inventory',
          children: [
            {
              title: 'menu.inventory.products',
              to: '/inventory/product',
              permission: 'inventory.view_product'
            },
            {
              title: 'menu.inventory.units-of-measure',
              to: '/inventory/unit-of-measure',
              permission: 'inventory.view_unitofmeasure'
            },
            {
              title: 'menu.inventory.categories',
              to: '/inventory/category',
              permission: 'inventory.view_category'
            },
            {
              title: 'menu.inventory.subcategories',
              to: '/inventory/subcategory',
              permission: 'inventory.view_subcategory'
            },
            {
              title: 'menu.inventory.product-size-registers',
              to: '/inventory/product-size-register',
              permission: 'inventory.view_productsizeregister'
            },
            {
              title: 'menu.inventory.packaging-types',
              to: '/inventory/packaging-type',
              permission: 'inventory.view_packagingtype'
            }
          ],
        },
        {
          icon: 'mdi-sale',
          title: 'menu.sale',
          group: '/sale/',
          children: [
            {
              title: 'menu.sale.sale-orders',
              to: '/sale/sale-order',
              permission: 'sale.view_saleorder'
            }
          ],
        },
        {
          icon: 'mdi-cash',
          title: 'menu.accounting',
          group: '/accounting/',
          children: [
            {
              title: 'menu.accounting.account-payable',
              to: '/accounting/account-payable',
              permission: 'accounting.view_accountpayable'
            },
            {
              title: 'menu.accounting.category',
              to: '/accounting/category',
              permission: 'accounting.view_category'
            },
            {
              title: 'menu.accounting.deposit-account',
              to: '/accounting/deposit-account',
              permission: 'accounting.view_depositaccount'
            },
            {
              title: 'menu.accounting.classification-centers',
              to: '/accounting/classification-center',
              permission: 'accounting.view_classificationcenter'
            }
          ],
        },
        {
          icon: 'mdi-view-list',
          title: 'menu.report',
          group: '/report/',
          children: [
            {
              title: 'menu.report.sales-by-product',
              to: '/report/sales-by-product',
              permission: 'sale.view_saleorder'
            },
            {
              title: 'menu.report.accounts-payable-by-due-date',
              to: '/report/accounts-payable-by-due-date',
              permission: 'accounting.view_accountpayable'
            }
          ],
        }
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        if (!this.$auth.user) return

        const {user_permissions} = this.$auth.user
        const self = this
        function hasPermission(value) {
          if (value.children) {
            value.children = value.children.filter(hasPermission).map(self.mapItem)
            return value.children !== []
          }
          return value.permission === undefined || user_permissions.includes(value.permission);
        }
        return this.items.filter(hasPermission).map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    methods: {
      mapItem (item) {
        if (this.$auth.user.user_permissions.some(elem => elem === item.permission || item.permission === undefined)) {
          return {
            ...item,
            children: item.children ? item.children.map(this.mapItem) : undefined,
            title: this.$t(item.title),
          }
        }
      }
    },
  }
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
