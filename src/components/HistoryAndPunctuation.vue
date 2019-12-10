<template>
<!--    <div class="container flex-column">
        <div class="justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class="labelColor text-center " > {{$t('history')}}  </h2>
                </div>
                <div class="card-body" v-for="p in purchases" :key="p.purchaseId">
                    <CardHistory :purchase="p" :menu="p.purchasedMenu" />
                </div>
                <div class="card-footer">
                    <input type="button" value="Back" class="btn float-right login_btn" v-on:click="back">
                    <input type="button" value="Log Out" class="btn float-right login_btn" v-on:click="logOut" >
                </div>
            </div>
        </div>
    </div>-->
    <div class="container flex-column">
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header">
                    <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                        <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                    </div>
                    <h2 class="labelColor text-center " > {{$t('history')}}  </h2>
                </div>
                <div class="card-body" v-for="p in getMenus()" :key="p.purchaseId">
                    <CardHistory :purchase="p" :menu="p.purchasedMenu" />
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
    import CardHistory from "./CardHistory";
    import chunk from "lodash/chunk" ;

    export default {
        name: "HistoryAndPunctuation",
        props:["user"],
        components: {CardHistory},

        mounted(){
            this.menuss()
        },
        data(){
            return{
                loading: false,
                page: 0,
                puntuationtoSend: 0,
                purchases: []
            }
        },
        methods:{
            menuss(){
                API.get("/customer/purchase?customerId="+ this.$store.state.user.id)
                    .then(res =>this.callBack(res))
            },
            callBack(r){
                //Ordenated from most recent to older
                this.purchases = chunk(r,2);
            },

            puntuate(_serviceId,_menuId){
                if( this.puntuationtoSend < 1 || 5 < this.puntuationtoSend ) return;
                let message = {
                    customerId: this.user.id,
                    serviceId: _serviceId,
                    menuId: _menuId,
                    punctuation: this.puntuationtoSend
                };
                API.post("/customer/score",message)
                    .then(()=>this.back())
                    //.catch(()=>)
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
                this.$router.push('/prueba')
            }
        }

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>