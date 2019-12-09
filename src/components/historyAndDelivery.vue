<template>
    <div class="container flex-column">
        <div class="justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class="labelColor text-center " > {{$t('history')}} </h2>
                </div>
                <div class="card-body" v-for="p in purchases" :key="p.menuId">
                    <CardDelivery :purchase="p" :menu="p.purchasedMenu"
                        v-on:sendMenu="sendMenu"  v-on:finishMenu="finishMenu" />
                </div>
                <div class="card-footer">
                    <input type="button" value="Back" class="btn float-right login_btn" v-on:click="back">
                    <input type="button" value="Log Out" class="btn float-right login_btn" v-on:click="logOut" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from "../service/api";
    import CardDelivery from "./CardDelivery";

    export default {
        name: "historyAndDelivery",
        props:["user"],
        components:{CardDelivery},
        mounted(){
            this.refreshpurchases();
        },
        data(){
            return{
                //menues: this.user.service.validMenus.reduce( (a,b) => a.concat(b), [] ),
                purchases:[]
            }
        },
        methods:{
            refreshpurchases(){
                API.get("/supplier/purchase?supplierId="+this.user.id)
                    .then(res => this.callBack(res));
            },
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
                this.$router.go(-1);
            },
            callBack(r){
                //Ordenated from most recent to older
                this.purchases = r.reverse();
            },
            sendMenu(purchaseId){
                API.get("/supplier/startDelivery?purchaseId="+purchaseId)
                    .then(this.refreshpurchases());
            },
            finishMenu(purchaseId){
                API.get("/supplier/finishDelivery?purchaseId="+purchaseId)
                    .then(this.refreshpurchases());
            },
        }

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>