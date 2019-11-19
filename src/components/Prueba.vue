<template>
<!--    <div class="container flex-column" >-->

<!--            <form class="form-inline justify-content-end prueba py-5">-->
<!--                <div class="form-group">-->
<!--                    <input  v-model="info.menuname"  class="form-control" placeholder="search..">-->
<!--                    <select v-model="info.menucategory" class="form-control" id="exampleFormControlSelect1">-->
<!--                        <option value="All"> todas las Categorias</option>-->
<!--                        <option>Pizza</option>-->
<!--                        <option>Cerveza</option>-->
<!--                        <option>Hamburguesa</option>-->
<!--                        <option>Empanadas</option>-->
<!--                        <option>Green</option>-->
<!--                        <option>Vegano</option>-->
<!--                    </select>-->
<!--                    <button class="btn btn-success" type="button" v-on:click="menuss">search</button>-->

<!--                </div>-->
<!--            </form>-->

<!--        <div class="d-flex justify-content-center">-->
<!--            <div class="card">-->
<!--                <div class="card-header">-->
<!--&lt;!&ndash;                    <p class="labelColor">Customer User: {{this.post.name}}</p>&ndash;&gt;-->
<!--                </div>-->
<!--                <div class="card-container">-->
<!--                    <div class="card-footer" v-for="p in getMenus()" :key="p.menuId">-->
<!--                        <CardMenu :post="p"></CardMenu>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="card-footer" >-->
<!--                    <div class="flex-sm-column">-->
<!--                        <ul class="pagination" >-->
<!--                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>-->
<!--                            <li class="page-item"  v-for="(k, index) in menus" :key="k"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>-->
<!--                            <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>-->

<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--        </div>-->
<!--    </div>-->
    <div class="container flex-column">

        <form class="form-inline justify-content-end prueba py-5" >
            <div class="form-group ">
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

        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-header">

                </div>
                <div class="card-container">
                    <GmapMap :center="center" :zoom="10" map-type-id="terrain"
                                style="width: 100%; height: 80%">
                        <GmapMarker
                            v-for="(m, index) in markers"
                            :key="index"
                            :position="m.position"
                            @click="center = m.position"
                        />
                    </GmapMap>
                    <div class="card-footer" v-for="p in getMenus()" :key="p.menuId">
                        <CardMenu :post="p"></CardMenu>
                    </div>
                </div>
                <div class="card-footer" >
                    <div class="flex-sm-column">
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item"  v-for="(k, index) in menus" :key="k"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
                                    <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import CardMenu from "./CardMenu";
    import API from "../service/api";
    import chunk from "lodash/chunk" ;
    import Boton from "./Boton";
    import Vue from "vue";
    import * as VueGoogleMaps from "vue2-google-maps";


    import axios from 'axios';

    export default {
        name: "Prueba",
        components: {CardMenu},
        mounted(){
            this.menuss();
            this.geolocate();
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

                center: { lat: -34.7273289, lng: -58.279851 },
                markers: [ 
                    { position:{ lat: -34.72733, lng: -58.28 } }
                
                ]
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
            geolocate(){
                let gkey = process.env.VUE_APP_GOOGLEKEY,
                    query="Calle 58 nro.480".replace(" ","+");
                axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${gkey}`).then(response => response.data)
                    .then(r=>console.log(r));
            },
            realgeolocate(){
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    };
                });
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