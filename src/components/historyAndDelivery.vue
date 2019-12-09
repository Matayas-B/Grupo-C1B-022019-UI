<template>
    <div class="container flex-column">
        <div class="justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class="labelColor text-center " > {{$t('history')}}  </h2>
                </div>
                <div class="card-body" v-for="p in this.user.service.validMenus" :key="p.menuId">
                    <CardDelivery :purchase="p" />
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
            console.log(this.user.service.validMenus)
            //TODO:Need to join the object
        },
        data(){
            return{
                purchases: []
            }
        },
        methods:{
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
                this.$router.go(-1);
            },
            callBack(res){
                //Ordenated from most recent to older
                //this.purchases = res.reverse();
            },

        }

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>