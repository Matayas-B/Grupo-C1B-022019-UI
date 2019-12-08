<template>
    <div class="container flex-column">
        <div class="justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h2 class="labelColor text-center " > {{$t('history')}}  </h2>
                </div>
                <div class="card-body" v-for="p in purchases" :key="p.purchaseId">
                    <CardHistory :purchase="p" :menu="p.purchasedMenu" />
                    <!-- {{user.customerScores}}
                    <span class="card-body" v-for="score in user.customerScores" v-bind:key="score.customerScoreId">
                        
                        <h4 class="card-text labelColor ">{{score.menuId}}</h4>
                        <h4 class="card-text labelColor" v-if="score.finished">{{score.punctuation}}</h4>
                        <span v-else>        
                            <input type="number" class="form-control" 
                                v-model="puntuationtoSend" min="1" max="5">
                                {{user.customerId}}
                            <input type="button" value="Puntuate" class="btn float-right login_btn" v-on:click="puntuate(score.serviceId, score.menuId)">
                        </span>
                            
                           <h4 class="card-text labelColor" v-else>{{score.finished}}</h4> 
                    </span>-->
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
    import CardHistory from "./CardHistory";

    export default {
        name: "HistoryAndPunctuation",
        components: {CardHistory},

        mounted(){
            API.get("/customer/purchase?customerId="+ this.$store.state.user.id)
                .then(this.callBack)
        },
        data(){
            return{
                user: this.$store.state.user,
                puntuationtoSend: 0,
                purchases: []
            }
        },
        methods:{
            logOut (){
                localStorage.clear();
                this.$router.push('/');
            },
            back(){
                this.$router.push('prueba')
            },
            callBack(res){
                //Ordenated from most recent to older
                this.purchases = res.reverse();
            },

            puntuate(_serviceId,_menuId){
                if( this.puntuationtoSend < 1 || 5 < this.puntuationtoSend ) return;
                let message = {
                    customerId: this.user.id,
                    serviceId: _serviceId,
                    menuId: _menuId,
                    punctuation: this.puntuationtoSend
                };
                console.log(this.user)
                API.post("/customer/score",message)
                    .then(()=>this.back())
                    .catch(()=>console.log("error"))
            }
        }

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
</style>