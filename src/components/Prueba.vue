<template>
    <div class="container">

        <nav id="barra-principal" class="navbar fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>

            <form class="form-inline" action="/">
                <div class="form-group">
                    <input  v-model="info.menuname"  class="form-control" placeholder="search..">
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
        </nav>
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header">
                </div>
                <div class="card-container">
                    <div class="card-footer" v-for="p in getMenus()" :key="p.menuId">
                        <CardMenu :post="p"></CardMenu>
                    </div>
                </div>
                <div class="card-footer" >
                    <div >
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item"  v-for="(k, index) in menus" :key="k"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>

                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <boton></boton>
    </div>
</template>

<script>
    import CardMenu from "./CardMenu";
    import API from "../service/api";
    import chunk from "lodash/chunk" ;
    import Boton from "./Boton";
    export default {
        name: "Prueba",
        components: {Boton, CardMenu},
        mounted(){
            this.menuss()
        },
        data(){
            return{

                menus: [],
                info: {
                    menuname : "",
                    menucategory : "All",
                    servicetown : "",
                },
                page: 0,
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
            }
        },

    }
</script>

<style scoped>

</style>