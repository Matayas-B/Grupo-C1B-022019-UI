import Vue from 'vue'
import Router from 'vue-router'
import Loginform from "./components/Loginform";
import Login from "./components/Login";
Vue.use(Router)

export default new Router({
    routes: [
        {path: '/',component: Login },
        {path: '/loginform',component: Loginform}
    ]
})
