import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import store from './vuex/subject_store'
import router from './router'
import VModal from 'vue-js-modal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook } from '@fortawesome/fontawesome-free-brands';
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/css/global.css'



Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VModal);
Vue.prototype.$http = axios;

library.add(faFacebook, faCopy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
