<template>
    <div class="card wrapper " id="formContent">
        <menupagination :menues="menues" :page="3" 
            buttonValue="Update" v-on:handleclick="clickCallBack"/>
        <a @click="$router.go(-1)"> Go back </a>
    </div>
</template>

<script>
import menupagination from "./MenuPagination";
import query from "../service/querys";

export default {
    name: "UpdateMenues",
    event:['handleclick'],
    components: { menupagination },
    mounted(){
        this.menues = query.menuesfromservice(this.serviceId);
    },
    methods: {
            clickCallBack(menuid){
                this.$router.push( `/adddmenusupplier/` + menuid );//{ path: `/adddmenusupplier`, query: { m:menuid}} );
            }
    },
    computed: {
        serviceId(){
            return this.$store.state.serviceId;
        },
    },
    data() {
            return {
                menues: [],
                page: 3
            }
    }
}
</script>


<style scoped>
    #formContent{
        height: 100%;
        align-content: center;
        margin-top: 10%;
        background-color: rgba(0,0,0,0.5) !important;
    }
    /* STRUCTURE */

    .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: 100%;
        padding: 20px;
    }

    #formContent {
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        background: #fff;
        padding: 30px;
        width: 90%;
        max-width: 450px;
        position: relative;
        padding: 0px;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        text-align: center;
    }
</style>