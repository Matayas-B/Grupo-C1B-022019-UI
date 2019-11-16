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
import Prueba from "./components/Prueba";
import SuplierOpcion from "./components/SuplierOpcion";
import AccountSuplier from "./components/AccountSuplier";
import AdddMenuSupplier from "./components/AdddMenuSupplier";

import DeleteMenues from "./components/DeleteMenues";
import UpdateMenues from "./components/UpdateMenues";

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
        {path: '/createservice', component: CreateService},
        {path: '/prueba', component: Prueba},
        {path: '/suplieropcion', component: SuplierOpcion},
        {path: '/accountsupplier', component: AccountSuplier},

        {path: '/deletemenues', component: DeleteMenues},
        {path: '/updatemenues', component: UpdateMenues},
        {path: '/adddmenusupplier', component: AdddMenuSupplier },
        {path: '/adddmenusupplier/:m', component: AdddMenuSupplier, props: true }
    ]
})
