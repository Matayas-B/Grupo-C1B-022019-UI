<template>
    <div class="container">

        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail1">Menu Name</label>
                    <input type="text" class="form-control" id="inputEmail1" placeholder="menu name" v-model="menu.name" >
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword1">description</label>
                    <input type="text" class="form-control" id="inputPassword1" placeholder="description"  v-model="menu.description">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail2">category</label>
                    <input type="text" class="form-control" id="inputEmail2" placeholder="category" v-model="menu.category">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword2">deliveryFee</label>
                    <input type="text" class="form-control" id="inputPassword2" placeholder="deliveryFee" v-model="menu.deliveryFee" >
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail3">startDate</label>
                    <input type="text" class="form-control" id="inputEmail3" placeholder="startDate" v-model="menu.startDate">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword3">endDate</label>
                    <input type="text" class="form-control" id="inputPassword3" placeholder="endDate" v-model="menu.endDate">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail5">deliveryHours</label>
                    <input type="text" class="form-control" id="inputEmail5" placeholder="deliveryHours" v-model="menu.deliveryHours" >
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword5">averageDeliveryMinutes</label>
                    <input type="text" class="form-control" id="inputPassword5" placeholder="averageDeliveryMinutes" v-model="menu.averageDeliveryMinutes">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail6">price</label>
                    <input type="text" class="form-control" id="inputEmail6" placeholder="price" v-model="menu.price" >
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail6">minQuantity</label>
                    <input type="text" class="form-control" id="inputEmail7" placeholder="minQuantity" v-model="menu.minQuantity" >
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail6">minQuantityPrice</label>
                    <input type="text" class="form-control" id="inputEmail8" placeholder="price" v-model="menu.minQuantityPrice" >
                </div>
                <div class="form-group col-md-6">
                    <label for="inputEmail6">maxDailySales</label>
                    <input type="text" class="form-control" id="inputEmail9" placeholder="maxDailySales" v-model="menu.maxDailySales" >
                </div>
            </div>
            <div>
                <label  v-on:click="createMenu" > AAAA {{this.$store.state.serviceId}}  </label>
                <button type="submit" class="btn btn-primary" v-on:click="createMenu">Create</button>
            </div>
            <div class="d-flex  links">
                <a @click="$router.go(-1)">back</a>
                <router-link to="/suplieropcion">Back</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import API from "../service/api";
    import query from "../service/querys";
    
    export default {
        name: "AdddMenuSupplier",
        mounted() {
            if(this.hasPreviusHistory())
                this.loadUser();
        },
        data() {
            return {
                menu: {
                    serviceId: this.$store.state.serviceId,
                    name: "Whopper",
                    description: "Hamburguer riquisima ! ! !",
                    category: "Hamburguesa",
                    deliveryFee: "10",
                    startDate: "2017-05-04",
                    endDate: "2017-05-04",
                    deliveryHours: "Afternoon",
                    averageDeliveryMinutes: "10",
                    price: "100",
                    minQuantity: "10",
                    minQuantityPrice: "35",
                    maxDailySales: "10"
                }
            }
        },
        methods: {
            loadUser() {
                this.menu = query.getMenu(this.$route.params.m);
            },
            createMenu(){
                if(this.hasPreviusHistory()){ //remove the previus menu
                    query.deleteMenu(this.menu.serviceId,this.$route.params.m)
                         .catch( () => alert("Already deleted"));
                }
                
                API.post('/service/addMenu',this.menu)
                    .then( () => {alert("Done"); this.$router.go(-1);})
                    .catch(e=>alert("No created:" + e));
            },
            hasPreviusHistory(){
                return typeof(this.$route.params.m) != 'undefined';
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