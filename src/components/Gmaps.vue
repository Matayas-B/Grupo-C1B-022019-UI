<template>
    <GmapMap class="col" id="map" :center="center" :zoom="10" 
                        map-type-id="terrain" :options="options" >
            <GmapMarker :position="center" 
                :clickable="true" :draggable="true" @dragend="mover"/>

            <gmap-custom-marker 
                v-for="(m, index) in markers" :key="index"
                 :marker="m.position"
                >
                <i class="fas fa-hamburger"
                    :title="m.serviceName"
                    v-on:click="toggleInfoWindow(center,'<strong>Marker 1</strong>')"
                />
                
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
        this.markersforMenus(newVal);
            //this.realgeolocate();
            //this.initgmaps(); gmaps
    },
    watch:{
        //immediate: true,
        menues: function(newVal, oldVal) {
            if(newVal.length > 0){
                //this.menus = newVal;
                this.changemarkers(newVal);
            }
        }
    },
    data(){
        return{
            center:{ lat: -34.7230745 ,lng: -58.2585693 },
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
                height: -35
                }
            },
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
            geolocate(){
                var self = this;                
                API.get(`/customer/getById?customerId=${localStorage.getItem('id')}`)
                    .then(res => {
                        
                        var addressObj = {
                            address: res.adress,
                            //state:          'AR',               // province also valid
                            //country:        'Argentina'
                        };
                        self.$geocoder.send(addressObj, response => {
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
                        // eslint-disable-next-line no-console
                        console.log(this.markers)
                    }
                    else console.log(status)
                }
                
                var servicio = new gmapApi().maps.DistanceMatrixService();
                // eslint-disable-next-line no-console
                
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
                if( typeof(menus) == undefined || menus==null ) return;
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
                                    serviceName: servicio.serviceName
                                };
                                self.allmarkers.push(mark);
                                if(servicesId.has(servicio.serviceId)){
                                    self.markers.push(mark);
                                }
                            });
                        
                    })
                ).catch( r => console.log("error"+r))
            },
            changemarkers(menues){
                let servicesId = new Set(menues.map(menu=>menu.serviceId));
                this.markers = this.allmarkers.filter(m => servicesId.has(m.id) );
            },
            initgmaps(){
                let map = document.getElementById('map');
                var centerControlDiv = document.createElement('div');
                var centerControl = new centerControl(centerControlDiv, map);

                centerControlDiv.index = 1;

                // eslint-disable-next-line no-console
                console.log(gmapApi)
                map.controls[gmapApi.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
            },
            centerControl(controlDiv, map) {
                // Set CSS for the control border.
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '3px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '22px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to recenter the map';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.lineHeight = '38px';
                controlText.style.paddingLeft = '5px';
                controlText.style.paddingRight = '5px';
                controlText.innerHTML = 'Center Map';
                controlUI.appendChild(controlText);

                // Setup the click event listeners: simply set the map to Chicago.
                controlUI.addEventListener('click', function() {
                map.setCenter(this.center);
                });
            },

            mover(event){
                this.center = { lat: event.latLng.lat() ,lng: event.latLng.lng() };
                //console.log(this.center)
                this.distanceToServices();
                
            },
            allowDrop(event) {
                event.preventDefault();
            },
            drop(event) {
                event.preventDefault();
                var data = event.dataTransfer.getData("Text");
                event.target.appendChild(document.getElementById(data));
                console.log("se termino de mover")
            },
            icons(categorys){
                const icons = {
                    Hamburguesa:"fas fa-hamburger",
                    Pizza:"fas fa-pizza-slice",
                    Sushi:"fas fa-pizza-slice",
                };
                return categorys.map( categ => icons[categ]);
            },
            category(service){
                return service.validMenus.map(menu => menu.category );
            },
    }
}
</script>