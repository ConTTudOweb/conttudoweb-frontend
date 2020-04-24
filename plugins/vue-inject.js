import Vue from 'vue'
import _get from 'lodash/get'
import globals from '~/global_vars.json'

// usage in template: {{ $g('empresa.site') }}
// usage in script: this.$g('social.facebook.url')
Vue.prototype.$g = (key) => {
  const val = _get(globals, key, null)
  console.info(val)
  if (val == null) {
    console.warn(key, ' não existe em $g')
    return key
  } else {
    return val
  }
}
