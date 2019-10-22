import Vue from 'vue'
import Router from 'vue-router'
import Loginform from "./components/Loginform";
import Login from "./components/Login";
import Registration from "./components/Registration";
import LoginSupllier from "./components/LoginSupllier";
import LoginformSuplier from "./components/LoginformSuplier";
import Category from "./components/Category"
import Account from "./components/Account";
import CreateService from "./components/CreateService";

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        {path: '/',component: Login },
        {path: '/loginform',component: Loginform},
        {path: '/registration', component: Registration},
        {path: '/loginsupllier', component: LoginSupllier},
        {path: '/loginformsuplier', component: LoginformSuplier},
        {path: '/category', component:Category},
        {path: '/account', component:Account},
        {path: '/createservice', component: CreateService}
    ]
})
