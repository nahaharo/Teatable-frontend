import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import store from './vuex/subject_store'
import router from './router'

import './assets/css/global.css'



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
