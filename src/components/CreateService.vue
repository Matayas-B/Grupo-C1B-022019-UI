<template>
    <div class="wrapper fadeInDown">
        <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
            <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
        </div>
        <div id="formContent">
            <form>
                <div class="form-row" >
                    <div class="form-group col-md-6">
                        <label class="labelColor">Service Name</label>
                        <input type="text" class="form-control" placeholder="serviceName" v-model="service.serviceName">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Address Town</label>
                        <input type="text" class="form-control"  placeholder="addressTown" v-model="service.addressTown">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Address Location</label>
                        <input type="text" class="form-control"  placeholder="addressLocation" v-model="service.addressLocation">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Description</label>
                        <input type="text" class="form-control"  placeholder="description" v-model="service.description">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Email</label>
                        <input type="email" class="form-control"  placeholder="Email" v-model="service.email">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Phone Number</label>
                        <input type="text" class="form-control"  placeholder="phoneNumber" v-model="service.phoneNumber">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Office Days</label>
                        <input type="text" class="form-control" placeholder="officeDays" v-model="service.officeDays">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Office Hours</label>
                        <input type="text" class="form-control"  placeholder="officeHours" v-model="service.officeHours">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor">Delivery Distance</label>
                        <input type="text" class="form-control" placeholder="deliveryDistance" v-model="service.deliveryDistance">
                    </div>
                </div>
            </form>

            <div class="d-flex  btn-group " >
                <button type="button" class="btn btn-primary boton " v-on:click="deleteService">Delete</button>
                <button type="button " class="btn btn-primary boton" v-on:click="createService">Create</button>
                <button type="button" class="btn btn-primary boton" v-on:click="back">Back</button>
            </div>
        </div>

    </div>
</template>

<script>
    import API from "../service/api";

    export default {
        name: "CreateMenus",
        components: {
            //botonsupplier
        },
        props: ['post'] ,
        data() {
            return {
                loading: false,
                service: {
                    supplierId: this.post.id,
                    serviceId: "",
                    serviceName: "Burguer King",
                    icon: "",
                    addressTown: "Quilmes",
                    addressLocation: "Rivadavia 123",
                    description: "Best Hamburguers in town",
                    email: "burguer@gmail.com",
                    phoneNumber: "123454545",
                    officeDays: ["Monday"],
                    officeHours:["Afternoon"],
                    deliveryDistance: "10"
                }
            }
        },
        methods: {
            createService(){
                this.loading = true;
                let self = this;
                let servicee = self.service;
                API.post("/supplier/addService", servicee)
                    .then(() => {
                        this.$toastr.success('Service :)','Service created successfully')
                        this.loading=false;
                    })
                    .catch(() => {
                        this.$toastr.error('Service :(','Error Create Service')
                        this.loading=false;
                    })
            },
            deleteService(){
                this.loading=true;
                API.get("/supplier/deleteService?supplierId=" + this.post.id)
                    .then(() => {
                        this.$toastr.success('Delete Service successfully','Service :)')
                        this.loading=false;
                    })
                    .catch(() => {
                        this.$toastr.error('Error Delete Service.','Service :(')
                        this.loading=false;
                    })
            },
            back(){
                this.$router.push({ name: 'suplieropcion', params: {post: this.post }})
            }
        }
    }
</script>

<style scoped>
    .labelColor{
        color: #1fffc5;
    }
    .boton{
        margin-right: 5px;
        margin-left: 5px;
    }
    #formContent{
        height: 100%;
        align-content: center;
        margin-top: 4%;
        background-color: rgba(0,0,0,0.5) !important;
    }
    /* STRUCTURE */

    .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: 100%;
        padding: 10px;
    }

    #formContent {
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        background: #fff;
        padding: 30px;
        width: 90%;
        max-width: 450px;
        position: relative;
        padding: 0px;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        text-align: center;
    }

    input[type=text] {
        background-color: #f6f6f6;
        border: none;
        color: #0d0d0d;
        padding: 10px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 5px;
        width: auto;
        border: 2px solid #f6f6f6;
        -webkit-transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out;
        -ms-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
    }

    input[type=text]:focus {
        background-color: #fff;
        border-bottom: 1px solid #5fbae9;
    }




    /* ANIMATIONS */

    /* Simple CSS3 Fade-in-down Animation */
    .fadeInDown {
        -webkit-animation-name: fadeInDown;
        animation-name: fadeInDown;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    @-webkit-keyframes fadeInDown {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    @keyframes fadeInDown {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    /* Simple CSS3 Fade-in Animation */
    @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    .fadeIn {
        opacity:0;
        -webkit-animation:fadeIn ease-in 1;
        -moz-animation:fadeIn ease-in 1;
        animation:fadeIn ease-in 1;

        -webkit-animation-fill-mode:forwards;
        -moz-animation-fill-mode:forwards;
        animation-fill-mode:forwards;

        -webkit-animation-duration:1s;
        -moz-animation-duration:1s;
        animation-duration:1s;
    }

    .fadeIn.first {
        -webkit-animation-delay: 0.4s;
        -moz-animation-delay: 0.4s;
        animation-delay: 0.4s;
    }


    .fadeIn.fourth {
        -webkit-animation-delay: 1s;
        -moz-animation-delay: 1s;
        animation-delay: 1s;
    }

    .labelColor{
        color: #1fffc5;
    }
    /*.container{*/
    /*    height: 100%;*/
    /*    align-content: center;*/
    /*    margin-top: 15%;*/
    /*}*/

    /*.card{*/
    /*    height: 50%;*/
    /*    margin-top: auto;*/
    /*    margin-bottom: auto;*/
    /*    width: 30%;*/
    /*    background-color: rgba(0,0,0,0.5) !important;*/
    /*}*/

    /*.card-header h3{*/
    /*    color: white;*/
    /*}*/

    /*.login_btn{*/
    /*    color: black;*/
    /*    width: auto;*/
    /*}*/

    /*.login_btn:hover{*/
    /*    color: black;*/
    /*    background-color: #16ff4b;*/
    /*}*/

    /*.botonlogout{*/
    /*    margin-top: auto;*/
    /*    margin-left: -20%;*/


    /*}*/
</style>