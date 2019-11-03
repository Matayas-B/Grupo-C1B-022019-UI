<template>
    <div class="d-flex-box col-sm-7 card" >
            <div class="card-body row" v-for="menu in this.menulimits(menues,menuindex, page)" :key="menu.serviceId">
                <cardmenu :service="menu"/>
            </div>
            <paginate :page-count="page" :page-range="3" :margin-pages="2"
                              @click-handler="paginationclickCallback" :prev-text="'Prev' "
                              :next-text=" 'Next'" :container-class="'pagination'"
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
//Vue.component('paginate', Paginate)
import cardmenu from "./Card";

export default {
    name: "Category",
    components: {
            cardmenu, paginate
    },
    props:["menues", "page", "menuindex"],
    methods: {
            paginationclickCallback: (index) => { 
                this.menuindex = index;
                //this.menues.$emit();
            },
            menulimits: (menues,menuindex,count) => { 
                return menues.slice(menuindex,count); /*
                if(menues.length != 0) 
                    return menues.filter( (elem,ix)  => { return !(ix >= menuindex && ix < (menuindex + count)); } )
                else return [];*/
            }
    }
}
</script>