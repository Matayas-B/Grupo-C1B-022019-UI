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
                user: this.$store.state.user,
                money: this.$store.state.user.account.funds,
                count: null
            }
        },
        methods: {
            addMoney(newAmount) {
                API.get('/customer/depositMoney?customerId=' + this.user.id + '&money=' + newAmount)
                .then(response => {
                    this.$toastr.success('Money could be added correctly',':)');
                    this.money = response;
                })
                .catch((message) => this.$toastr.error(message))
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