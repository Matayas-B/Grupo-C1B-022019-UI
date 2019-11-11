<template>
    <div class="container">

        <nav id="barra-principal" class="navbar fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>
            <h2 class="text-white" id="user">My Account: {{user.username}}</h2>
        </nav>
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Founds: {{money}}</h3>

                </div>
                <div class="card-body">
                    <input type="text "  class="form-control" id="cant" placeholder="amount to account"
                           v-model="count">



                </div>
                <div class="card-footer">
                    <input type="submit" value="extract Money" class="btn float-right login_btn" v-on:click="extractMoney(count)" >
                    <input type="submit" value="Back" class="btn float-right login_btn" v-on:click="back()">
                    <input type="submit" value="Log Out" class="btn float-right login_btn" v-on:click="logOut()">
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import API from "../service/api";

    export default {
        name: "AccountSuplier",

        mounted() {
            this.loadUser();
        },
        data() {
            return {
                loaduser: [],
                user: {
                    username: localStorage.getItem('name')
                },
                money: 0,
                count: null
            }
        },
        methods: {
            loadUser() {

                API.get('/supplier/getById?supplierId=3')
                    .then(response => this.callBack(response))
                    .catch(e => alert(e));
            },
            callBack(r){
                this.loaduser = r;
                this.money = r.account.funds
            },

            extractMoney(newAmount) {
                // TODO: needs to add proper customerId
                API.get('/supplier/extractMoney?supplierId=' + localStorage.getItem('id') + '&money=' + newAmount)
                    .then(response => this.money = response)
                    .catch(this.$toastr.error('hola', 'prueba'))
            },
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
                this.$router.push('/suplieropcion')
            },

        }
    }

</script>

<style scoped>

</style>