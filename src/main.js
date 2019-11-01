import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import router from './router'
import VueSession from 'vue-session'
import 'jquery'



import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'



import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)




Vue.use(VueSession)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
