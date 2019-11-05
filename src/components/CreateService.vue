<template>
    <div class="container">

        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail1">Service Name</label>
                    <input type="text" class="form-control" id="inputEmail1" placeholder="serviceName" v-model="service.serviceName">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword1">Address Town</label>
                    <input type="text" class="form-control" id="inputPassword1" placeholder="addressTown" v-model="service.addressTown">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail2">Address Location</label>
                    <input type="text" class="form-control" id="inputEmail2" placeholder="addressLocation" v-model="service.addressLocation">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword2">Description</label>
                    <input type="text" class="form-control" id="inputPassword2" placeholder="description" v-model="service.description">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail3">Email</label>
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="service.email">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword3">Phone Number</label>
                    <input type="text" class="form-control" id="inputPassword3" placeholder="phoneNumber" v-model="service.phoneNumber">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail5">Office Days</label>
                    <input type="text" class="form-control" id="inputEmail5" placeholder="officeDays" v-model="service.officeDays">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword5">Office Hours</label>
                    <input type="text" class="form-control" id="inputPassword5" placeholder="officeHours" v-model="service.officeHours">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail6">Delivery Distance</label>
                    <input type="text" class="form-control" id="inputEmail6" placeholder="deliveryDistance" v-model="service.deliveryDistance">
                </div>
            </div>
            <div>
            <button type="submit" class="btn btn-primary " v-on:click="createService">Create</button>
            </div>
            <div class="d-flex  links">
                <router-link to="/suplieropcion">Back</router-link>
            </div>
            <div>
                <button type="submit" class="btn btn-primary ">Delete</button>
            </div>


        </form>
        <botonsupplier></botonsupplier>
    </div>
</template>

<script>
    import botonsupplier from "./BotonSupplier";
    import API from "../service/api";


    export default {
        name: "CreateMenus",
        components: {

            botonsupplier
        },
        computed:{
            userName(){
                return this.$store.state.userName;
            }
        },
        data() {
            return {
                service: {
                    supplierId: localStorage.getItem('id'),
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
                let self = this
                let servicee = self.service
                API.post("/supplier/addService", servicee)
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