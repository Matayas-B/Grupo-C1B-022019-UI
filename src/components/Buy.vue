<template>
    <div class="container">

        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class=" labelColor text-center " >Facundo</h2>
                </div>
                    <div class="card ">
                        <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                            <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                        </div>
                        <img class="card-img-top" :src=post.imageUrl alt="Card image">
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
                loading: false,
                myRate: 3,
                compra: {
                    "customerId": this.$store.state.user.id,
                    "serviceId": this.post.serviceId,
                    "menuId": this.post.menuId,
                    "quantity": 10
                },
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
                this.loading=true;
                let self = this
                API.post('/customer/purchase', self.compra)
                    .then(() => {
                        this.score()
                        this.loading= false;
                    })
                    .catch(res => {
                        this.$toastr.error(res,':(')
                        this.loading=false;
                    })
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