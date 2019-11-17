<template>
    <div class="col container">

        <nav id="barra-principal" class="navbar row fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>
            <h2 class="text-white" id="user">{{this.userName}}</h2>
            <form class="form-inline" action="/">
                <input type="search"  placeholder="search..">
                <button class="btn btn-success" type="submit">search</button>
            </form>
            <span v-if="purchases.length>0">
                <h6>They are "{{purchases.length}}" element in the carrito </h6>
                <button class="btn btn-success" v-on:click="purchase"> Purchase </button>
                <button class="btn btn-danger" v-on:click="purchases = []"> Drop All </button>   
            </span>            
        </nav>
        <div class="col">
        <div class="d-flex-box col-sm-4 h-100">
            <div class="card">
                <div class="card-header">
                    <h3>choose food category</h3>
                </div>
                <div class="card-body">
                    <div v-for="(item,index) in items" :key="index">
                        <list :title="item" />
                    </div>
                </div>
                <div class="card-footer">
                    <input type="submit" value="My Account" class="btn float-right login_btn">
                </div>
            </div>
        </div>
        <div class="d-flex-box col-sm-7">
            <paginate :menues="menues" :page="3" buttonValue="Add to carrito" v-on:handleclick="clickCallBack"/>
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
    import paginate from "./MenuPagination";
    import boton from "./Boton";
    import list from "./List";
    import falert from "./FloatingAlert";

    export default {
        name: "Category",
        components: {
            list,
            boton,
            paginate,
            falert
        },
        mounted() {
            let comp = this;
            
            function addCategories(res){
                    // eslint-disable-next-line
                    console.log("backend-categories:ok");
                    res.forEach(element => {
                        if(!comp.items.includes(element.category))
                            comp.items.push(element.category);
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
            let categoryInLocation = (location) => {return {
                menuname : "",
                menucategory : "All",
                servicetown : location
            }};
            let categories = categoryInLocation("");

            API.post("/search", categories ).then(addmenu).catch( handlError );
            API.post("/search",categories).then( addCategories ).catch( handlError ); //.finally(() => this.loading = false);
        },
    methods: {
            clickCallBack(idmenu){
                this.purchases.push(idmenu);
            },
            purchase(){
                                                                               
            }
    },
    data() {
            return {
                items: [],
                bottonalert: "",
                purchases:[],
                menues: [],
                page: 3
            }
        }
    }
</script>

<style scoped>

</style>