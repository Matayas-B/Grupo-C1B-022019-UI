<template>
    <div class="container">

<!--        <nav id="barra-principal" class="navbar fixed-top">-->
<!--            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>-->
<!--            <h2 class="text-white" id="user">My Account: {{user.name}}</h2>-->
<!--        </nav>-->
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class=" labelColor text-center " >My Account: {{user.name}}</h2>
                </div>
                <div class="card-header">
                    <h3>Funds: {{money}}</h3>

                </div>
                <div class="card-body">
                    <input type="number" min="0"  class="form-control" id="cant" placeholder="amount to account" autocomplete="off"
                           v-model="count">



                </div>
                <div class="card-footer">
                    <input type="submit" value="add Money" class="btn float-right login_btn" v-on:click="addMoney(count)" >
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
        name: "Account",

        mounted() {
            this.loadUser();
        },
        data() {
            return {
                loaduser: [],
                user: this.$store.state.user,// localStorage.getItem('name')
                money: 0,
                count: null
            }
        },
        methods: {
            loadUser() {

                API.get(`/customer/getById?customerId=${this.user.id}`)
                    .then(response => this.callBack(response))
                    .catch(e => alert(e));
            },
            callBack(r){
                this.loaduser = r;
                 this.money = r.account.funds
            },

            addMoney(newAmount) {
                // TODO: needs to add proper customerId
                API.get('/customer/depositMoney?customerId=' + this.user.id + '&money=' + newAmount)
                    .then(response => this.callback2(response))
                    .catch(() => this.$toastr.error('I couldnt add money',':('))
            },
            callback2(r){
                this.$toastr.success('Money could be added correctly',':)')
                this.money = r
            },
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
              this.$router.push('prueba')
            },

        }
    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>