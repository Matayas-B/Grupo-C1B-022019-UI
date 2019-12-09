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
import {store} from './store/store';
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMaterial from 'vue-material'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// import StarRating from 'vue-star-rating'
// Vue.use('star-rating', StarRating)
import rate from 'vue-rate';
import ToggleSwitch from 'vuejs-toggle-switch'

let googlekey = process.env.VUE_APP_GOOGLEKEY;

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
    load: {
        key: googlekey,
        libraries: "places,drawing,visualization",
    },
    installComponents: true
});

import Geocoder from "@pderas/vue2-geocoder";
Vue.use(Geocoder, {
    defaultCountryCode: null, // e.g. 'CA'
    defaultLanguage:    null, // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   googlekey
});

Vue.use(ToggleSwitch)
Vue.use(rate)
Vue.use(VueSidebarMenu)

window.toastr = require('toastr')
library.add(faSpinner)
Vue.use(FlagIcon);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueToastr2)
Vue.use(VueSession)
Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
