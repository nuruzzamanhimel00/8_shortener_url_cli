import Vue from 'vue'
import App from './App.vue'

//axios import 
import axios from "axios"
axios.defaults.baseURL = 'http://localhost/8_shortener_url_api/public/api';


//filter import

import filter from './filters'

Vue.component('pagination', require('laravel-vue-pagination'));

//vuex install
import store from './store/store.js'

//import vue router 
import VueRouter from 'vue-router'
import {routes} from './routes.js'
Vue.use(VueRouter)

// ### bootstrap vuejs plagin install ###

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const router = new VueRouter({
  routes,
  mode: 'history'
});



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router,
  store:store,
  filter:filter
}).$mount('#app')
