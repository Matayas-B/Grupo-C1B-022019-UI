<template>
    <div class="container">
        <nav id="barra-principal" class="navbar fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>
            <h2 class="text-white" id="user">My Account: {{this.post.name}}</h2>
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
        props:['post'],

        updated() {
            this.callBack();
        },
        data() {
            return {
                loaduser: [],
                user: {
                    username: this.post.name//localStorage.getItem('name')
                },
                money: 0,
                count: null
            }
        },
        methods: {
            callBack(){
                this.loaduser = this.post;
                this.money = this.post.account.funds
            },

            extractMoney(newAmount) {
                API.get('/supplier/extractMoney?supplierId=' + this.post.id + '&money=' + newAmount)
                    .then(() => this.$toastr.success('correct extraction',':)'))
                    .catch(() => this.$toastr.error('has no funds in the account', ':('))
            },
            logOut (){
                //localStorage.clear();
                this.$router.push('/');
            },
            back(){
               // this.$router.push('/suplieropcion')
                this.$router.push({ name: 'suplieropcion', params: {post: this.post }})
            },
        }
    }

</script>

<style scoped>

</style>