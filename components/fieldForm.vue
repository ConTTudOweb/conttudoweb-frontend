<template>
  <v-col :cols="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">
    <v-text-field
      v-if="field.type === 'string' && hasMaxLength"
      :rules="field.rules"
      :required="field.required"
      :maxlength="field.maxLength"
      v-bind="propsFields"
      :value="value"
      @input="$emit('input', $event)"
    ></v-text-field>
    <v-checkbox
      v-else-if="field.type === 'boolean'"
      :rules="field.rules"
      :required="field.required"
      v-bind="propsFields"
      :value="value"
      @change="$emit('input', $event)"
    >
    </v-checkbox>
  </v-col>
</template>

<script>
export default {
  props: {
    // v-col
    // index: {
    //   type: Number,
    //   required: true
    // },
    xs: {
      type: Number,
      default: 12
    },
    sm: {
      type: Number,
      default: null
    },
    md: {
      type: Number,
      default: null
    },
    lg: {
      type: Number,
      default: null
    },
    xl: {
      type: Number,
      default: null
    },
    // v-fields
    value: {
      type: undefined,
      required: true
    },
    field: {
      type: Object,
      required: true
    },
    autofocus: { type: Boolean, default: false }
  },
  data() {
    return {
      propsFields: {
        label: this.field.label,
        autofocus: this.autofocus,
        outlined: true,
        dense: true,
        placeholder: ' ',
        hideDetails: 'auto'
        // class: 'my-field'
      }
    }
  },
  computed: {
    hasMaxLength() {
      return this.containsKey(this.field, 'max_length')
    }
  },
  methods: {
    containsKey(obj, key) {
      return Object.keys(obj).includes(key)
    }
  }
}
</script>
