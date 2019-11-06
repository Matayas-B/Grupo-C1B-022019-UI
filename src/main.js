import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from "vue-router"
import router from './router'
import VueSession from 'vue-session'
import 'jquery'


//import { store } from "./components/Store";
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMaterial from 'vue-material'
//import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'

library.add(faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex)
Vue.use(VueSession)
Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    userName: "",
    menuindex:0
  },
  mutations: {
    changeName(state,name) {
      this.state.userName = name;
    },
    resetUser(state){
      this.changeName(state,"");
    },
    setMenuIndex(state, num){
      state.menuindex = num;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
