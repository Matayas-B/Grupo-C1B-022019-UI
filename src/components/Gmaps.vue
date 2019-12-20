<template>
    <GmapMap class="col" id="map" :center="center" :zoom="10" 
                        map-type-id="terrain" :options="options" >
            <GmapMarker :position="center" 
                :clickable="true" :draggable="true" @dragend="mover"/>

            <gmap-custom-marker 
                v-for="(m, index) in allmarkers" :key="index"
                 :marker="m.position"
                >
                <GmapMarker :position="m.position" :clickable="true" 
                    :title="m.distance" v-on:click="() => toggleInfoWindow(m,m.id) /*comprar(m)*/"
                    :id="m.id" v-bind:icon="m.icon"/>
                
                <!--@click="center = m.position"  
                    <input type="button" value="mostrarDistancias" class="btn float-right login_btn"
        v-on:click="toggleInfoWindow(center,'<strong>Marker 1</strong>')">
                <my-component></my-component>
                                    v-on:click="toggleInfoWindow(center,'<strong>Marker 1</strong>')"
                                    
                                    <span v-for="(iconos, index) in icons(category(m))" :key="index">
                
                </span>
                                    -->
           </gmap-custom-marker>
           <GmapInfoWindow :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false" />
    </GmapMap>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import {gmapApi} from "vue2-google-maps";
import API from "../service/api";

export default {
    name: "Gmaps",
    components: { GmapCustomMarker},
    props:["menues"],
    mounted(){
        this.geolocate();
        this.markersforMenus(this.menues);
    },
    watch:{
        //immediate: true,
        menues: function(newVal) { //, oldVal
            if(newVal.length > 0){
                //this.menus = newVal;
                this.changemarkers(newVal);
            }
        }
    },
    data(){
        return{
            center:{ lat: -34.7230745 ,lng: -58.25857 },
            markers: [],
            allmarkers:[],
            
            infoWindowPos: null,
            infoWinOpen: false,
            currentMidx: null,
            infoOptions: {
                content: '',
                //optional: offset infowindow so it visually sits nicely on top of our marker
                pixelOffset: {
                width: 0,
                height: -35,
                }
            },
            mindistServId: -1,
            options:{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false
            }
        }
    },
    methods:{
            color(color){
                return  {url:"http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"};
            },
            selectcolor(markid,idservcercano){
                return idservcercano == markid? this.color("green"): this.color("blue");
            },
            cercano(){
                let ord = this.allmarkers.sort( (a,b) => a.distance < b.distance);
                this.mindistServId = ord[0].id;
            },
            comprar(menuId,serviceId){
                //return () =>
                // eslint-disable-next-line no-console
                console.log(menuId,serviceId)
                //this.$emit("comprar",m.id);
            },
            toggleInfoWindow: function(marker, idx) {
                this.infoWindowPos = marker.position;
                this.infoOptions.content = marker.infoText;
                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                this.infoWinOpen = true;
                this.currentMidx = idx;
                }
            },
            createInfoText(serviceName,serviceMenues,func){
                const parameters = serviceMenues.map( m => 
                    `<p> ${m.name} <i class="${this.icons(m.category)}" title="m.category"> </i> </p>
                     <button type="button" onclick=" ${ func(m.menuId,m.serviceId) } ">Buy</button>`)
                    .reduce((a,b)=>a+b,"");
                return `<h4>${serviceName}</h4> <div>${parameters}</div>`;
            },
            update(response, status) {
                if (status == 'OK') {
                    var results = response.rows[0].elements;
                    for (var j = 0; j < results.length; j++) {
                            var element = results[j];
                            //this.$set(this.allmarkers, 'icon', this.color( "green"))
                            this.allmarkers[j].duration = element.duration.text;
                            this.allmarkers[j].distance = element.distance.text;
                    }
                    // eslint-disable-next-line no-console
                    console.log("prevID:" + this.mindistServId);
                    this.cercano();
                    // eslint-disable-next-line no-console
                    console.log("nextId:"+this.mindistServId);
                    this.allmarkers.forEach( mark => mark.icon = this.selectcolor(this.mindistServId,mark.id));
                }
                else this.$toastr.error("Error on calculating distances to services")
            },
            geolocate(){
                var self = this;                
                API.get(`/customer/getById?customerId=${localStorage.getItem('id')}`)
                    .then(res => {
                        var addressObj = {
                            address: res.adress,
                            state:          'CABA',
                            country:        'Argentina'
                        };
                        self.$geocoder.send(addressObj, response => {
                            //console.log(response)
                            self.center = response.results[0].geometry.location;
                            });
                    })
                    .catch( () => {
                        self.$toastr.error("Cannot get access to gmaps locations for user")
                        self.realgeolocate();
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
                const googlemaps = gmapApi().maps;
                var servicio = new googlemaps.DistanceMatrixService();
                servicio.getDistanceMatrix({
                        origins: [this.center],
                        destinations: this.allmarkers.map( marker => marker.position),
                        travelMode: 'DRIVING',
                        //transitOptions: TransitOptions,
                        //drivingOptions: DrivingOptions,
                    }, (distance,status) => this.update(distance,status) )
            },
            markersforMenus(menus){
                if( typeof(menus) == undefined || menus==null ) menus = [];
                let menues = menus;
                let servicesId = new Set(menues.map(menu=>menu.serviceId));

                let self = this;
                API.get("/service/")
                    .then( servicios => servicios.forEach(servicio => {
                            var addressObj = {
                                address_line_1: servicio.address.location,
                                city:           servicio.address.town,
                                state:          'AR',
                                country:        'Argentina'
                            };
                            self.$geocoder.send(addressObj, response => {
                                const mark = { 
                                    position:   response.results[0].geometry.location,
                                    id:         servicio.serviceId,
                                    serviceName: servicio.serviceName,
                                    menus : servicio.validMenus,
                                    infoText: self.createInfoText(servicio.serviceName,servicio.validMenus,this.comprar),
                                    duration    : "?",
                                    distance : "?",
                                    icon : self.color("blue")
                                };
                                self.allmarkers.push(mark);
                                if(servicesId.has(servicio.serviceId)){
                                    self.markers.push(mark);
                                }
                            });
                    })
                ).catch( self.$toastr.error("Cannot get access to gmaps locations for service"));
            },
            changemarkers(menues){
                let servicesId = new Set(menues.map(menu=>menu.serviceId));
                this.markers = this.allmarkers.filter(m => servicesId.has(m.id) );
            },
            mover(event){
                this.center = { lat: event.latLng.lat() ,lng: event.latLng.lng() };
                this.distanceToServices();
            },
            allowDrop(event) {
                event.preventDefault();
            },
            drop(event) {
                event.preventDefault();
                var data = event.dataTransfer.getData("Text");
                event.target.appendChild(document.getElementById(data));
            },
            icons(categ){
                const icons = {
                    Hamburguesa:"fas fa-hamburger",
                    Pizza:"fas fa-pizza-slice",
                    Sushi:"fas fa-pizza-slice",
                    Empanadas:"fas fa-pizza-slice",
                    Green:"fas fa-pizza-slice",
                };
                return icons[categ];
            },
    }
}
</script>