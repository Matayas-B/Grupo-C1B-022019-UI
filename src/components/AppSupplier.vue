<template>
    <div class="flex-row">
        <nav  class="navbar-nav">
            <h2 class="text-white text-center" >ViendasYa</h2>

        </nav>
        <div class="flex-column px-2 prueba">
            <sidebar-menu :menu="menu"  :collapsed="true"  @item-click="onItemClick"/>
            <div class="d-flex">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import API from "../service/api";

    export default {
        name: "AppSupplier",
        mounted(){
          this.getSupplier()
        },
        data(){
            return{
                post: '',
                menu: [
                    {
                        hiddenOnCollapse: false,
                        header: false,
                        href: '/LoginSupllier',
                        title: 'Sign off',
                        icon: 'fa fa-sign-out-alt',
                    },
                    {
                        hiddenOnCollapse: false,
                        header: false,
                        title: 'Shopping Cart',
                        icon: 'fas fa-cart-plus',
                        onClick:  ()=> {this.$router.push({ name: 'accountsupplier', params: {post: this.post }})}
                    },
                    {
                        hiddenOnCollapse: false,
                        header: false,
                        title: 'Account',
                        icon: 'fa fa-money-bill-alt ',
                        onClick:  ()=> {this.$router.push({ name: 'accountsupplier', params: {post: this.post }})}

                    },
                ]
            }
        },
        methods: {
            onItemClick(event, item) {
                item.onClick()
            },
            getSupplier(){
                API.get(`/supplier/getById?supplierId=${localStorage.getItem('id')}`)
                    .then(res => this.callback(res) )
            },
            callback(r){
                this.post=r
            }
    }
    }
</script>

<style scoped>
.prueba{
    margin-left: 2rem;
}
</style>