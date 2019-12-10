<template>

    <div class="container flex-column">

        <form class="form-inline justify-content-end prueba py-5" >
            <div class="form-group ">
                <input  v-model="info.servicetown"  class="form-control" placeholder="Locate search..">
                <input  v-model="info.menuname"  class="form-control" placeholder="Name search..">
                <select v-model="info.menucategory" class="form-control" id="exampleFormControlSelect1">
                    <option value="All"> All Categories</option>
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

        <div class="d-flex justify-content-center row">

            <div class="card">
                <div class="card-header">
                    <h3 class=" labelColor text-center " >{{username}}</h3>
                </div>
                <div class="card-body"> 
                    <div class="card-body" v-for="p in getMenus()" :key="p.menuId">
                        <CardMenu :post="p"></CardMenu>
                    </div>
                </div>
                <div class="card-footer" >
                    <div class="flex-sm-column">
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item" v-for="(k, index) in menus" :key="k"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        <div class="card" id="map_canvas_container">
            <div class="justify-content-md-center card-body row" id="map-canva" > 
                <Gmaps :menues="getMenus()" />
            </div>
            <div class="card-footer" >
                <input type="button" value="mostrarDistancias" class="btn float-right login_btn">
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
            API.get(`/customer/getById?customerId=${localStorage.getItem( 'id' )}`)
                    .then(res => this.username = res.name );
            this.menuss();
        },
        data(){
            return{
                menus: [],
                shopping:[],
                info: {
                    menuname : "",
                    menucategory : "All",
                    servicetown : "",
                },
                page: 0,
                username:"Client",
            }
        },
        methods: {
            async   menuss(){
                let self = this
                let m = self.info
                let p = await API.post('/search', m )
                this.callBack(p)
                //.then(response => {this.callBack(response)})
                //.catch(e => alert(e));
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
        }
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
    #map_canvas_container {
        position: relative;
        width: 300px;
        height: 300px;
    }
    #map_canvas {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}

</style>