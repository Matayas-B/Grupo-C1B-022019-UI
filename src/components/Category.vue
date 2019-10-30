<template>
    <div class="col container">

        <nav id="barra-principal" class="navbar row fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>
            <h2 class="text-white" id="user">{{user.username}}</h2>
            <form class="form-inline" action="/">
                <input type="search"  placeholder="search..">
                <button class="btn btn-success" type="submit">search</button>
            </form>
        </nav>
        <div class="row">
        <div class="d-flex-box col-sm-7 h-100">
            <div class="card">
                <div class="card-header">
                    <h3>choose food category</h3>
                </div>
                <div class="card-body">
                    <div v-for="item in items" :key="item.message">
                        <list :title="item.message" />
                    </div>
                </div>
                <div class="card-footer">
                    <input type="submit" value="My Account" class="btn float-right login_btn">
                </div>
            </div>
        </div>
        <div class="d-flex-box col-sm-7 card" >
            <div class="card-body row" v-for="menu in this.menulimits(menues,menuindex, page)" :key="menu.title">
                <cardmenu :title="menu.title" :text="menu.text"/>
            </div>
            <paginate :page-count="page" :page-range="3" :margin-pages="2"
                              @click-handler="menuindex = index" :prev-text="'Prev' "
                              :next-text=" 'Next'" :container-class="'pagination'"
                              :page-class="'page-item'">
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
        </div>
        <div class="row justify-content-bottom botonlogout">
            <boton />
        </div>
        <falert :state="bottonalert" message="all ok"/>
    </div>

</template>

<script>
    import API from "../service/api";
    import paginate from 'vuejs-paginate'
//Vue.component('paginate', Paginate)
    import boton from "./Boton";
    import list from "./List";
    import cardmenu from "./Card";

    import falert from "./FloatingAlert";

    export default {
        name: "Category",
        components: {
            list,
            boton,
            cardmenu,
            paginate,
            falert
        },
        mounted() {
            let comp = this;
            
            function addCategories(res){
                    // eslint-disable-next-line
                    console.log("backend-categories:ok");
                    res.categories.forEach(element => {
                       comp.items.push(element); 
                    });
            }
            function handlError(e){
                if (!e.status) {
                    comp.bottonalert = e.toString(); 
                } else
                    comp.bottonalert = "network error"; 
            }
            let addmenu = (res)=> {
                // eslint-disable-next-line
                    console.log("backend-menu:ok");
                res.forEach(element => {
                       this.menues.push(element); 
                    })
                };

            API.get("/menues").then(addmenu);
            API.get("/categories").then( addCategories ).catch( handlError ); //.finally(() => this.loading = false);
        },
        data() {
            return {
                user: {
                    username: localStorage.getItem('name')
                },
                items: [],
                menues: [],
                bottonalert: "",
                page:3,menuindex:0
            }
        },
        methods: {
            clickCallback: (index) => { menuindex = index; },
            menulimits: (menues,menuindex,count) => { 
                return menues.slice(menuindex,count); /*
                if(menues.length != 0) 
                    return menues.filter( (elem,ix)  => { return !(ix >= menuindex && ix < (menuindex + count)); } )
                else return [];*/
            }
        }
    }
</script>

<style scoped>

    .container{
        height: 100%;
        align-content: center;
        margin-top: 15%;
    }

    .card{
        height: 50%;
        margin-top: auto;
        margin-bottom: auto;
        width: 30%;
        background-color: rgba(0,0,0,0.5) !important;
    }

    .card-header h3{
        color: white;
    }

    .login_btn{
        color: black;
        width: auto;
    }

    .login_btn:hover{
        color: black;
        background-color: #16ff4b;
    }

    .botonlogout{
        margin-top: auto;
        margin-left: -20%;
    }

</style>