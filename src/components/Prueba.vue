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
        <!--<b-container class="bv-example-row ">-->
            <div class="justify-content-md-center card-body row" id="map-canva" > 
                    <GmapMap class="col" :center="center" :zoom="10" map-type-id="terrain"  >
                                <!--<GmapMarker/>-->
                                <gmap-custom-marker 
                                    v-for="(m, index) in markers" :key="index"
                                    @click="center = m.position"
                                    :marker="m.position">
                                    <i :class="icons(category(m))"></i>
                                    <!--
                                    <my-component></my-component>
                                    <img src="../assets/empanada.png" />
                                    -->
                                </gmap-custom-marker>
                    </GmapMap>
            </div>
            <div class="card-footer" >
                <input type="button" value="mostrarDistancias" class="btn float-right login_btn"
                    v-on:click="distanceToServices">
            </div>
        <!--</b-container>-->
        </div>


        </div>
    </div>
</template>

<script>
    import CardMenu from "./CardMenu";
    import API from "../service/api";
    import chunk from "lodash/chunk" ;
    import GmapCustomMarker from 'vue2-gmap-custom-marker';
    import {gmapApi} from "vue2-google-maps"
    export default {
        name: "Prueba",
        components: {CardMenu, GmapCustomMarker},
        mounted(){
            //this.push directo a HistoryAndPunctuation
            this.menuss();
            this.geolocate();
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
                username: this.$store.state.user.name,
                center: { lat: -34.7273289, lng: -58.279851 },
                markers: []
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
                this.markersforMenus(this.menus);
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
            icons(category){
                const icons = {
                    Hamburguesa:"fas fa-hamburger",
                    Pizza:"fas fa-pizza-slice",
                };
                return icons[category];
            },
            category(m){
                //collapse menus and find correct service
                return this.menus
                            .reduce( (a,b) => a.concat(b), [] )
                            .find(menu=>menu.serviceId == m.id)
                            .category;
            },
            geolocate(){
                var self = this;
                var adress = 'Calle 58 nro.480';
                API.get(`/customer/getById?customerId=${localStorage.getItem('id')}`)
                    .then(res => {
                        var addressObj = {
                            address_line_1: res.adress?res.adress : adress,
                            city:           'Berazategui', //Not the real city, bruh
                            state:          'AR',               // province also valid
                            //zip_code:       '94043',             postal_code also valid
                            country:        'Argentina'
                        };

                        this.$geocoder.send(addressObj, response => {
                            self.center = response.results[0].geometry.location;
                            });
                    });
            },
            realgeolocate(){
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    };
                });
            },

            distanceToServices(){
                
                function addDistance(response, status) {
                    if (status == 'OK') {
                        var results = response.rows[0].elements;
                        for (var j = 0; j < results.length; j++) {
                            var element = results[j];
                            this.markers["duration"] = element.duration.text;
                            this.markers["distance"] = element.distance.text;
                            
                        }
                        console.log(this.markers)
                    }
                }
                
                let servicio = new gmapApi().maps.DistanceMatrixService();
                console.log(servicio)
                    servicio.getDistanceMatrix({
                        origins: [this.center],
                        destinations: this.markers.map( marker => marker.position),
                        travelMode: 'DRIVING',
                        //transitOptions: TransitOptions,
                        //drivingOptions: DrivingOptions,
                    }, (distance) => addDistance(distance) )
            },

            markersforMenus(menus){
                this.markers = [];

                if( typeof(menus) == undefined || menus==null ) return;
                //TODO:Make a better concatenation
                let menues = menus.reduce( (a,b) => a.concat(b), [] );
                //console.log(menues)
                let servicesId = new Set(menues.map(menu=>menu.serviceId));

                let self = this;
                API.get("/supplier")
                    .then(suppliers => { suppliers.forEach(supplier => {
                            //      
                            /*API.get("/supplier/getSupplierService?supplierId="+supplier.supplierId)
                                .then(service => {
                                    if(service.serviceId == serviceId){*/
                                    if(supplier.service==null) return;
                                    if(servicesId.has(supplier.service.serviceId)){
                                        var addressObj = {
                                            address_line_1: supplier.service.address.location,
                                            city:           supplier.service.address.town,
                                            state:          'AR', //zip_code: 'xx', postal_code also valid
                                            country:        'Argentina'
                                        };
                                        self.$geocoder.send(addressObj, response => {
                                            // eslint-disable-next-line no-console
                                            //console.log(response.results[0].geometry.location)
                                            self.markers.push(
                                                { 
                                                    position:   response.results[0].geometry.location,
                                                    id:         supplier.service.serviceId,
                                                });
                                            });
                                        }
                                //})
                            }
                            );
                        })
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
    #map_canvas_container {
        position: relative;
        width: 300px;
        height: 300px;
    }
    #map_canvas {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}

</style>