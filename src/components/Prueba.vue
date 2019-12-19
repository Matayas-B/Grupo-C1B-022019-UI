<template>
    <div class="container flex-column">
        <form class="form-inline justify-content-end prueba py-5" >
            <div class="form-group ">
                <input  v-model="info.servicetown"  class="form-control" placeholder="Locate search..">
                <input  v-model="info.menuname"  class="form-control" placeholder="Name search..">
                <select v-model="info.menucategory" class="form-control" id="exampleFormControlSelect1">
                    <option value="All"> todas las Categorias</option>
                    <option>Pizza</option>
                    <option>Cerveza</option>
                    <option>Hamburguesa</option>
                    <option>Empanadas</option>
                    <option>Green</option>
                    <option>Vegano</option>
                </select>
                <button class="btn btn-success" type="button" v-on:click="menuss">search</button>
            </div>
        </form>
<<<<<<< HEAD

        <div class="container flex-row">
=======
>>>>>>> ba29338bf3d04dbc95f7b3f3f6b77bc3adea496e
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header">
                    <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                        <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                    </div>
                    <h3 class=" labelColor text-center " >{{username}}</h3>
                </div>
                <div class="card-container">
                    <div class="card-footer" v-for="p in getMenus()" :key="p.menuId">
                        <CardMenu :post="p"></CardMenu>
                    </div>
                </div>
                <div class="card-footer" >
                    <div class="flex-sm-column">
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item"  v-for="(k, index) in menus" :key="index"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
                                    <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        <div class="card d-flex justify-content-right">
            <div class="justify-content-md-center card-body row" id="map-canva" > 
                <Gmaps :menues="getMenus()" v-on:comprar="comprar"/>
            </div>
            <div class="card-footer" >
                <input type="button" value="mostrarDistancias" class="btn float-right login_btn">
            </div>
        </div> 
        </div>
        </div>
    </div>
</template>

<script>
    import CardMenu from "./CardMenu";
    import API from "../service/api";
    import chunk from "lodash/chunk";
    import Gmaps from "./Gmaps";

    export default {
        name: "Prueba",
        components: {CardMenu,Gmaps},
        mounted(){
            this.menuss();
        },
        data(){
            return{
                loading: false,
                menus: [],
                info: {
                    menuname : "",
                    menucategory : "All",
                    servicetown : "",
                },
                page: 0,
                username: this.$store.state.user.name
            }
        },
        methods: {
               menuss(){
                this.loading= true;
                let self = this;
                let m = self.info;
               API.post('/search', m )
                   .then(res => {
                       this.callBack(res)
                       this.loading=false;
                   })
                   .catch(res => {
                       this.$toastr.error(res,':(')
                       this.loading=false;
                   })
            },
            callBack(r){
                this.menus = chunk(r,2)
                // eslint-disable-next-line no-console
                console.log(r.length)
                // eslint-disable-next-line no-console
                console.log(this.menus.length)
            },
            setPage(r){
                return this.page=r
            },
            getMenus(){
                return this.menus[this.page]
            },
            previus(){
                if (this.page !== 0) this.page = this.page -1
            },
            nextt(){
                if (this.page !== this.menus.length -1 ) this.page ++
            },
            comprar(id){
                let menusr = this.menus.reduce( (a,b) => a.concat(b), [] );;
                let menu = menusr[0];
                this.$router.push({ name: 'buy', params: {post: menu }})
            }
        },

    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
    .prueba{
        margin-top: -20%;
    }
    .btn  {

        width: auto;
    }
</style>