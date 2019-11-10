<template>
<div class="d-flex-box col-sm-4 card-body gocenter">
            <span deck v-for="menu in menulimits(menues, page)" :key="menu.menuId">
                  <cardmenu class="col card-custom" :menu="menu" :buttonValue="buttonValue" />
                  <div/>
            </span>
            <paginate :page-count="menues.length/page" :page-range="1 + this.menues.length / 3" :margin-pages="2"
                              :click-handler="setIndex" 
                              :container-class="'pagination'"
                              :page-class="'page-item'" class="card-footer">
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
    <!-- :prev-text="'Prev'" :next-text="'Next'"
    
            <div class="row" v-for="menu in menulimits(menues, page)" :key="menu.menuId">
                <cardmenu :service="menu" :buttonValue="buttonValue"  v-on:handleclick="clickCallBack" />
                <md-divider name="-"></md-divider>
            </div>-->
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
    }
}
</script>

<style scoped>
  .gocenter{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
  }

.card-custom {
  max-width: 128px;
  margin:0 auto;
}
</style>