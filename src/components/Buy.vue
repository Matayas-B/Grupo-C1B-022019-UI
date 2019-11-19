<template>
    <div class="container">

        <!--        <nav id="barra-principal" class="navbar fixed-top">-->
        <!--            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>-->
        <!--            <h2 class="text-white" id="user">My Account: {{user.name}}</h2>-->
        <!--        </nav>-->
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class=" labelColor text-center " >Facundo</h2>
                </div>
                    <div class="card ">
                        <div class="card-body">
                            <h4 class="card-text labelColor ">{{post.name}}</h4>
                            <h4 class="card-text labelColor">{{post.description}}</h4>
                            <h4 class="card-text labelColor">{{post.category}}</h4>
                            <h5 class="card-text labelColor"> Price: {{post.price}}</h5>


                        </div>
                </div>
                <div class="card-body">
                    <input type="number" min="0"  class="form-control" id="cant" placeholder="Cant" autocomplete="off" v-model="quantity">

                </div>
                <div class="card-footer">
                    <input type="button" value="Buy" class="btn float-right login_btn"  v-on:click="buy" >
                    <input type="button" value="Back" class="btn float-right login_btn" v-on:click="back">
                    <input type="button" value="Log Out" class="btn float-right login_btn" v-on:click="logOut" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from "../service/api";

    export default {
        name: "Buy",
        props: ['post'],
        data(){
            return{
                compra: {
                    "customerId": this.$store.state.user.id,
                    "serviceId": this.post.serviceId,
                    "menuId": this.post.menuId,
                    "quantity": 10
                }
            }
        },
        methods:{
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
                this.$router.push('prueba')
            },
            buy(){
                let self = this
                API.post('/customer/purchase', self.compra)
                    .then(() => this.$toastr.success('Compra Realizada', ':)'))
                    .catch(res => this.$toastr.error(res,':('))
            }

        }

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>