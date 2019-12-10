<template>
<!--    <div class="container flex-column" style="height: 50%; width: 50%;">-->
<!--        <div class="justify-content-center py-5" >-->
<!--            <div class="card">-->
<!--                <div class="card-header">-->
<!--                    <h2 class="labelColor text-center " > {{$t('history')}} </h2>-->
<!--                </div>-->
<!--                <div class="card-body" v-for="p in purchases" :key="p.menuId">-->
<!--                    <CardDelivery :purchase="p" :menu="p.purchasedMenu"-->
<!--                        v-on:sendMenu="sendMenu"  v-on:finishMenu="finishMenu" />-->
<!--                </div>-->
<!--                <div class="card-footer">-->
<!--                    <input type="button" value="Back" class="btn float-right login_btn" v-on:click="back">-->
<!--                    <input type="button" value="Log Out" class="btn float-right login_btn" v-on:click="logOut" >-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="container flex-column">
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header">
                    <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                        <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                    </div>
                    <h2 class="labelColor text-center " > {{$t('history')}} </h2>

                </div>
                <div class="card-container" v-for="p in getMenus()" :key="p.menuId">
                    <CardDelivery :purchase="p" :menu="p.purchasedMenu"
                        v-on:sendMenu="sendMenu"  v-on:finishMenu="finishMenu" />
                </div>
                <div class="card-footer" >

                    <div class="flex-sm-column">
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item"  v-for="(k, index) in purchases" :key="index"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="back">back</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import API from "../service/api";
    import CardDelivery from "./CardDelivery";
    import chunk from "lodash/chunk" ;

    export default {
        name: "historyAndDelivery",
        props:['user'],
        components:{CardDelivery},
        mounted(){
            this.refreshpurchases();
        },
        data(){
            return{
                loading: false,
                //menues: this.user.service.validMenus.reduce( (a,b) => a.concat(b), [] ),
                purchases:[],
                page: 0,
            }
        },
        methods:{
            refreshpurchases(){
                this.loading=true;
                API.get("/supplier/purchase?supplierId="+this.user.id)
                    .then(res => {
                        this.callBack(res)
                        this.loading = false;
                    })
                    .catch( () => {
                    this.$toastr.error('Error ',' :(')
                    this.loading = false;
                })
            },
            callBack(r){
                //Ordenated from most recent to older
                this.purchases = chunk(r,2)
            },
            sendMenu(purchaseId){
                API.get("/supplier/startDelivery?purchaseId="+purchaseId)
                    .then(this.refreshpurchases());
            },
            finishMenu(purchaseId){
                API.get("/supplier/finishDelivery?purchaseId="+purchaseId)
                    .then(this.refreshpurchases());
            },
            setPage(r){
                return this.page=r
            },
            getMenus(){
                return this.purchases[this.page]
            },
            previus(){
                if (this.page !== 0) this.page = this.page -1
            },
            nextt(){
                if (this.page !== this.purchases.length -1 ) this.page ++
            },
            back(){
                this.$router.push({ name: 'suplieropcion', params: {post: this.user }})
            }
        }

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>