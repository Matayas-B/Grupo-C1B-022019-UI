<template>
<div class="d-flex-box col-sm-7">
            <div class="card-body row" v-for="menu in menulimits(menues, page)" :key="menu.menuId">
                <cardmenu :service="menu" :buttonValue="buttonValue" v-on:handleclick="clickCallBack"/>
            </div>
            <paginate :page-count="page" :page-range="range" :margin-pages="2"
                              :click-handler="setIndex" 
                              :container-class="'pagination'"
                              :page-class="'page-item'" class="card-foot">
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
    </div>
    <!-- :prev-text="'Prev'" :next-text="'Next'"-->
</template>

<script>
import paginate from "vuejs-paginate";
import cardmenu from "./Card";

export default {
    name: "Category",
    event:['handleclick'],
    components: {
            cardmenu, paginate
    },
    props:["menues", "page", "buttonValue"],
    mounted(){
        this.setIndex(1);
        this.page = 1 + this.menues.length / 3;
    },
    methods: {
            setIndex(newindex) {
                this.$store.commit("setMenuIndex", newindex);
            },
            menulimits(menues,count){
                let menuindex = (this.index-1)*this.page;
                return this.menues.slice(menuindex,count+menuindex);
            },
            clickCallBack(cbValue){
              this.$emit('handleclick', cbValue);
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
            return { range: 1 }
    }
}
</script>