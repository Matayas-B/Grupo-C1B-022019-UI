<template>
    <div class="d-flex-box col-sm-7 card" >
            <div class="card-body row" v-for="menu in menulimits(menues, page)" :key="menu.menuId">
                <cardmenu :service="menu" buttonValue="Delete" v-on:handleclick="clickCallBack"/>
            </div>
            <paginate :page-count="page" :page-range="3" :margin-pages="2"
                              :click-handler="setIndex" :prev-text="'Prev'"
                              :next-text="'Next'" :container-class="'pagination'"
                              :page-class="'page-item'" >
                <span slot="prevContent">Changed previous button</span>
                <span slot="nextContent">Changed next button</span>
                <span slot="breakViewContent">
                    <svg width="16" height="4" viewBox="0 0 16 4">
                    <circle fill="#999999" cx="2" cy="2" r="2" />
                    <circle fill="#999999" cx="8" cy="2" r="2" />
                    <circle fill="#999999" cx="14" cy="2" r="2" />
                    </svg>
                </span>
            </paginate>
    <a href="/suplierOpcion"> Go back </a>
    </div>
</template>

<script>
import paginate from "vuejs-paginate";
import query from "../service/querys";
import cardmenu from "./Card";

export default {
    name: "DeleteMenues",
    components: { cardmenu, paginate },
    event:['handleclick'],
    mounted(){
        this.setIndex(1);
        this.menues = query.menuesfromservice(this.serviceId); 
    },
    methods: {
            setIndex(newindex) {
                this.$store.commit("setMenuIndex", newindex);
            },
            menulimits(menues,count){
                let menuindex = (this.index-1)*this.page;
                return this.menues.slice(menuindex,count+menuindex);
            },
            clickCallBack(menuid){
                console.log("ServiceId:"+ this.serviceId+ " menu:" +menuid)
                query.deleteMenu(this.serviceId,menuid)
                    .then( () => alert("Done"))
                    .catch( (r) => alert(r + " or Already deleted"));
            }
    },
    computed: {
      index() {
        return this.$store.state.menuindex;
      },
      serviceId(){
        return this.$store.state.serviceId;
      }
    },
    data() {
            return {
                menues: [],
                page: 3
            }
    }
}
</script>