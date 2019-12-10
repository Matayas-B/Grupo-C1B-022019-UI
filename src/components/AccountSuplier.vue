<template>
    <div class="container">>
        <div class="d-flex justify-content-center h-100">

            <div class="card">
                <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                    <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                </div>
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
                loading: false,
                loaduser: [],
                user: {
                    username: this.post.name,
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
                this.loading=true;
                API.get('/supplier/extractMoney?supplierId=' + this.user.id + '&money=' + newAmount)
                    .then(res => {
                        this.prueba(res)
                        this.loading=false;
                        this.count= 0;
                    })
                    .catch(() => {
                        this.$toastr.error('has no funds in the account', ':(')
                        this.loading=false;
                    })
            },
            prueba(r){
                // eslint-disable-next-line no-console
                console.log(r)
                this.loadUser()
                this.$toastr.success('correct extraction',':)')
            },
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
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