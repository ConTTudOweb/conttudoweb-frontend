<template>
  <v-list-group
    :group="item.group"
    :active-class="`${!isDark ? 'black' : 'white'}--text`"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-icon
        v-if="text"
        class="v-list-item__icon--text"
        v-text="computedText"
      />

      <v-list-item-icon v-else-if="item.icon">
        <v-icon v-text="item.icon" />
      </v-list-item-icon>

      <v-list-item-content v-if="item.title || item.subtitle">
        <v-list-item-title v-text="item.title" />

        <v-list-item-subtitle v-text="item.subtitle" />
      </v-list-item-content>
    </template>

    <slot />
  </v-list-group>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'Item',

    mixins: [Themeable],

    props: {
      item: {
        type: Object,
        default: () => ({
          href: undefined,
          icon: undefined,
          subtitle: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      computedText () {
        if (!this.item || !this.item.title) return ''

        let text = ''

        this.item.title.split(' ').forEach(val => {
          text += val.substring(0, 1)
        })

        return text
      },
      href () {
        return this.item.href || (!this.item.to ? '#' : undefined)
      },
    },
  }
</script>
