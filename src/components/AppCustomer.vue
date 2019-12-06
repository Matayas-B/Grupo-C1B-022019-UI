<template>
    <div class="flex-row">
        <nav  class="navbar-nav">
            <h2 class="text-white text-center" >ViendasYa</h2>
        </nav>
        <div class="flex-column px-2 prueba">
            <sidebar-menu :menu="menu"  :collapsed="true"  @item-click="onItemClick"/>
            <div class="d-flex">
                <transition name="aparecer" appear>
                <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import API from "../service/api";

    export default {
        name: "AppCustomer",
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
                        href: '/',
                        title: 'Sign off',
                        icon: 'fa fa-sign-out-alt',
                    },
                    {
                        hiddenOnCollapse: false,
                        header: false,
                        title: 'Shopping Cart',
                        icon: 'fas fa-cart-plus',
                        //onClick:  ()=> {this.$router.push({ name: 'account', params: {post: this.post }})}
                    },
                    {
                        hiddenOnCollapse: false,
                        header: false,
                        title: 'Account',
                        icon: 'fa fa-money-bill-alt ',
                        href: 'account',

                        onClick:  ()=> {this.$router.push({ name: 'account', params: {post: this.post }})}

                    },
                ]
            }
        },
        methods: {
            onItemClick(event, item) {
                item.onClick()
            },
            getSupplier(){
                API.get(`/customer/getById?customerId=${localStorage.getItem('id')}`)
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
    /* Transition */
    .aparecer-enter {
        opacity: 0;
    }

    .aparecer-enter-active {
        transition: opacity 1s;
    }

    .aparecer-leave-to {
        opacity: 0;
    }

    .aparecer-leave-active {
        transition: opacity 1s;
    }
    /* Animation */
    .bote-enter-active {
        animation: bounce-in .5s;
    }

    .bote-leave-active {
        animation: bounce-out .5s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(0);
        }
    }
</style>