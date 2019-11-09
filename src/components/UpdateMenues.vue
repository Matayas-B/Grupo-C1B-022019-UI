<template>
    <div class="d-flex-box col-sm-7 card" >
            <div class="card-body row" v-for="menu in menulimits(menues, page)" :key="menu.menuId">
                <cardmenu :service="menu" buttonValue="Update" v-on:handleclick="clickCallBack"/>
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
import API from "../service/api";
import paginate from "vuejs-paginate";
import cardmenu from "./Card";

export default {
    name: "UpdateMenues",
    props:["s"],
    components: { cardmenu, paginate },
    event:['handleclick'],
    mounted(){
        this.setIndex(1);
        this.menues = this.menuesfromservice(this.serviceId);
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
                this.$router.push( `/adddmenusupplier/` + menuid );//{ path: `/adddmenusupplier`, query: { m:menuid}} );
            },
            menuesfromservice: (serviceId) => {
        var menues = [];
                
        function handlError(e){
            var error = (!e.status)? e.toString() : 'network error';
            // eslint-disable-next-line
            console.log(error);    
        }
        let addmenu = (res)=> {
            // eslint-disable-next-line
            console.log('backend-menu:ok');
            res.forEach(element => {
                menues.push(element); 
            });
        };
        API.get('/service/getMenus?serviceId='+serviceId).then(addmenu).catch( handlError );
        return menues;
    }

    },
    computed: {
      index() {
        return this.$store.state.menuindex;
      },
                  userName(){
                return this.$store.state.userName;
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