import Vue from 'vue'
import Router from 'vue-router'
import Loginform from "./components/Loginform";
import Login from "./components/Login";
import Registration from "./components/Registration";
Vue.use(Router)

export default new Router({
    routes: [
        {path: '/',component: Login },
        {path: '/loginform',component: Loginform},
        {path: '/registration', component: Registration}
    ]
})
