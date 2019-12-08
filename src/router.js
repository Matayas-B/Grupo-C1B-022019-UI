import Vue from 'vue'
import Router from 'vue-router'
import Loginform from "./components/Loginform";
import Login from "./components/Login";
import Registration from "./components/Registration";
import LoginSupllier from "./components/LoginSupllier";
import LoginformSuplier from "./components/LoginformSuplier";
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
import AppCustomer from "./components/AppCustomer";
import Buy from "./components/Buy";
import HistoryAndPunctuation from "./components/HistoryAndPunctuation";
import historyAndDelivery from "./components/historyAndDelivery";

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [

        ////////////////////Customer//////////////////////////////////////////////////////////////

        {path: '/',component: Login  },
        {path: '/appCustomer', component: AppCustomer, name: 'appCustomer', props: true, children:[
                {path: '/account', component:Account, name: 'account'},
                {path: '/prueba', component: Prueba, name: 'prueba'},
                {path: '/buy', component: Buy, name: 'buy', props: true},
                {path: '/historyAndPunctuation', component: HistoryAndPunctuation, name: 'historyAndPunctuation'},

            ]},

        {path: '/loginform',component: Loginform},
        {path: '/registration', component: Registration},
        ///{path: '/category', component:Category},
       // {path: '/prueba', component: Prueba},
        
        {path: '/loginsupllier', component: LoginSupllier},

        ///////////////////Supplier//////////////////////////////////////////////////////////////


        {path: '/loginformsuplier', component: LoginformSuplier},
        {path: '/app', component: AppSupplier, name: 'app', props: true, children:[
            {path: 'suplieropcion', component: SuplierOpcion, name: 'suplieropcion', props: true},
            {path: 'historyAndDelivery', component: historyAndDelivery, name: 'historyAndDelivery'},
            {path: 'createservice', component: CreateService, name: 'createservice', props: true} ,
            {path: 'deleteandupdate', component: DeleteAndUpdateMenu, name: 'deleteandupdate', props: true},
            {path: 'accountsupplier', component: AccountSuplier, name: 'accountsupplier', props: true},
            {path: 'adddmenusupplier', component: AdddMenuSupplier, name: 'adddmenusupplier', props: true},
                {path: '/updatemenu', component: UpdateMenu, name: 'updatemenu', props:  true },

            ]},




        {path: '/thneNavBar', component: TheNavBAr}

    ]
})
