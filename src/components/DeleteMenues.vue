<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
        <menupagination :menues="menues" :page="page" 
            buttonValue="Delete" v-on:handleclick="clickCallBack"/>
        <a @click="$router.go(-1)"> Go back </a>
        </div>
    </div>
</template>

<script>
import menupagination from "./MenuPagination";
import query from "../service/querys";

export default {
    name: "DeleteMenues",
    event:['handleclick'],
    components: { menupagination },
    mounted(){
        this.menues = query.menuesfromservice(this.serviceId);
    },
    methods: {
            clickCallBack(menuid){
                query.deleteMenu(this.serviceId,menuid)
                    .then( () => { alert("Done");this.$router.go(-1);})
                    .catch( (r) => alert(r + " or Already deleted"));
            }
    },
    computed: {
      serviceId(){
        return this.$store.state.serviceId;
      },
      page(){
        return this.menues / this.elements;
      },
    },
    data() {
            return {
                menues: [],
                elements: 3
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