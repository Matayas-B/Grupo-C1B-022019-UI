<template>
    <div class="container">

        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class=" labelColor text-center " >My Account: {{this.post.name}}</h2>

                </div>
                <div class="card-header">
                    <h3>Founds: {{money}}</h3>
                </div>
                <div class="card-body">
                    <input type="text "  class="form-control" placeholder="amount to account" v-model="count">
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
        mounted() {
            this.loadUser()
        },
        data() {
            return {
                loaduser: [],
                user: {
                    username: this.post.name,//localStorage.getItem('name')
                    id: this.post.id,
                },
                cuenta: '',
                money: 0,// this.loaduser.account,
                count: 0,
            }
        },
        methods: {
            loadUser() {

                API.get(`/supplier/getById?supplierId=${this.user.id}`)
                    .then(response => this.callBack(response))
                    .catch(e => alert(e));
            },
            callBack(r){
                this.loaduser = r;
                this.cuenta = r.account
                this.money = this.cuenta.funds
            },

            extractMoney(newAmount) {
                API.get('/supplier/extractMoney?supplierId=' + this.user.id + '&money=' + newAmount)
                    .then(res => this.prueba(res))
                    .catch(() => this.$toastr.error('has no funds in the account', ':('))
            },
            prueba(r){
                // eslint-disable-next-line no-console
                console.log(r)
                this.loadUser()
                this.$toastr.success('correct extraction',':)')
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
    .labelColor{
        color: #1fffc5;
    }
</style>