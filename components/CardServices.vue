<template>
  <v-card shaped>
    <v-list-item>
      <v-list-item-avatar tile>
        <v-icon>mdi-application</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ title }}</v-list-item-title>
        <v-list-item-subtitle>{{ subTitle }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!--suppress HtmlUnknownTarget -->
    <v-img :src="image" :aspect-ratio="16 / 9" width="100%" contain />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <v-card-text style="height: 100%;" v-html="text" />
    <v-divider class="mx-4"></v-divider>
    <v-card-text v-if="tags" class="caption font-italic font-weight-medium">
      <v-chip
        v-for="(tag, i) in tags"
        :key="i"
        class="mb-1"
        color="primary darken-1"
        outlined
      >
        <small>{{ tag }}</small>
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => null
    }
  }
}
</script>
