<template>
    <div class="d-flex-box col-sm-7 card" >
            <div class="card-body row" v-for="menu in this.menulimits(menues, page)" :key="menu.serviceId">
                <cardmenu :service="menu" buttonValue="See Contact"/>
            </div>
            <paginate :page-count="page" :page-range="3" :margin-pages="2"
                              @click-handler="this.setIndex" :prev-text="'Prev'"
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
    </div>
</template>

<script>
import paginate from "vuejs-paginate";
import cardmenu from "./Card";
import Vue from "vue";

export const store = Vue.observable({
  count: 0
});

export const mutations = {
  setCount(count) {
    store.count = count;
  }
};

/*
import Vue from "vue";
export const store = Vue.observable({
  count: 0
});
export const mutations = {
  setCount(count) {
    store.count = count;
  }
};
Change to Vuex
*/

export default {
    name: "Category",
    components: {
            cardmenu, paginate
    },
    props:["menues", "page"],  
    mounted(){
        this.setIndex(0);
    },
    methods: {
            setIndex: (index) => { 
                this.$store.commit("setMenuIndex", index);
            },
            menulimits: (menues,count) => {
                let menuindex = this.$store.state.menuindex; 
                return menues.slice(menuindex,count);
                /*
                if(menues.length != 0) 
                    return menues.filter( (elem,ix)  => { return !(ix >= menuindex && ix < (menuindex + count)); } )
                else return [];*/
            }
    },
    computed: {
      index() {
        return store.count;
      }
    }
}
</script>