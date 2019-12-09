<template>
    <div class="container">

        <!--        <nav id="barra-principal" class="navbar fixed-top">-->
        <!--            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>-->
        <!--            <h2 class="text-white" id="user">My Account: {{user.name}}</h2>-->
        <!--        </nav>-->
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class=" labelColor text-center " > r.account.funds : {{funds}} </h2>
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
                    <input type="number"  class="form-control" id="cant"  autocomplete="off" v-model="quantity"
                        min="0" v-bind:max="maxQuantity" placeholder="Cant" v-on:max="() => $toastr.error('Not enough money',':(') ">
                </div>
                <div class="card-footer">
                    <input type="button" value="Buy" class="btn float-right login_btn"  v-on:click="buy" >
                    <input type="button" value="Back" class="btn float-right login_btn" v-on:click="back">
                    <input type="button" value="Log Out" class="btn float-right login_btn" v-on:click="logOut" >
                    <input type="button" value="Prueba" class="btn float-right login_btn" v-on:click="prueba" >
                </div>
                <div v-if="this.pr" >                }
                    <div class="d-flex justify-content-center card-footer">
                        <rate :length="5" v-model="pun.punctuation"/>
                    </div>
                    <div class="d-flex justify-content-center card-footer">
                        <input type="button" value="Puntuar" class="btn float-right login_btn" v-on:click="puntuar">
                    </div>


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
                myRate: 3,
                compra: {
                    "customerId": this.$store.state.user.id,
                    "serviceId": this.post.serviceId,
                    "menuId": this.post.menuId,
                    "quantity": 10
                },
                funds: this.$store.state.user.account.funds,
                maxQuantity: typeof(this.funds) != "undefined" ? this.funds / this.post.price : 10,
                pun: {
                    "customerId": this.$store.state.user.id,
                    "serviceId": this.post.serviceId,
                    "menuId": this.post.menuId,
                    "punctuation": 3
                },
                pr: false
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
                    .then(() => this.score())
                    .catch(res => this.$toastr.error(res,':('))
            },
            score(){
                this.$toastr.success('Compra Realizada', ':)')
                this.pr=true
            },
            prueba(){
                this.pr=true
            },
            rating(){
            },
            puntuar(){

                let self = this
                API.post('/customer/score', self.pun)
                    .then(() => this.$toastr.success('Puntuacion Realizada', ':)'))
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