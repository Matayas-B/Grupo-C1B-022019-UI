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
import DeleteAndUpdateMenu from "./components/DeleteAndUpdateMenu";
import UpdateMenu from "./components/UpdateMenu";
import TheNavBAr from "./components/TheNavBAr";
import AppSupplier from "./components/AppSupplier";

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        {path: '/',component: Login },
        {path: '/loginform',component: Loginform},
        {path: '/registration', component: Registration},
        {path: '/category', component:Category},
        {path: '/updatemenu', component: UpdateMenu, name: 'updatemenu', props:  true },
        {path: '/prueba', component: Prueba},
        {path: '/account', component:Account},

        ///////////////////Supplier//////////////////////////////////////////////////////////////



        {path: '/loginsupllier', component: LoginSupllier},
        {path: '/loginformsuplier', component: LoginformSuplier},

        {path: '/app', component: AppSupplier, name: 'app', props: true, children:[
            {path: 'suplieropcion', component: SuplierOpcion, name: 'suplieropcion', props: true},
            {path: 'createservice', component: CreateService, name: 'createservice', props: true} ,
            {path: 'deleteandupdate', component: DeleteAndUpdateMenu, name: 'deleteandupdate', props: true},
            {path: 'accountsupplier', component: AccountSuplier, name: 'accountsupplier', props: true},
            {path: 'adddmenusupplier', component: AdddMenuSupplier, name: 'adddmenusupplier', props: true},
         ]},



        {path: '/thneNavBar', component: TheNavBAr}

    ]
})
