<template>
    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                    <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                </div>
                <div class="card-header">
                    <h2 class=" labelColor text-center " >My Account: {{user.name}}</h2>
                </div>
                <div class="card-header">
                    <h3>Funds: {{money}}</h3>

                </div>
                <div class="card-body">
                    <input type="number" min="0"  class="form-control" id="cant" placeholder="amount to account" 
                        autocomplete="off" v-model="count" >
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
        data() {
            return {
                loading: false,
                user: this.$store.state.user,
                money: this.$store.state.user.account.funds,
                count: null
            }
        },
        methods: {
            addMoney(newAmount) {
                this.loading=true;
                API.get('/customer/depositMoney?customerId=' + this.user.id + '&money=' + newAmount)
                .then(response => {
                    this.$toastr.success('Money could be added correctly',':)');
                    this.money = response;
                    this.loading=false;
                    this.count=0;
                })
                .catch((message) => {
                    this.$toastr.error(message)
                    this.loading=false;
                    this.count=0;
                })
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