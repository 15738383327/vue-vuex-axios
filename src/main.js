import Vue from 'vue'
import Element from 'element-ui'
import HttpPlugin from './http'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './icons' // icon
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // global filters

Vue.use(HttpPlugin)
Vue.use(Element)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
