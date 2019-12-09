<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
        <form >
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label class="labelColor">Menu Name</label>
                    <input type="text" class="form-control"  placeholder="menu name" v-model="menu.name" >
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">description</label>
                    <input type="text" class="form-control"  placeholder="description"  v-model="menu.description">
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">category</label>
                    <input type="text" class="form-control"  placeholder="category" v-model="menu.category">
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">deliveryFee</label>
                    <input type="text" class="form-control" placeholder="deliveryFee" v-model="menu.deliveryFee" >
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">startDate</label>
                    <input type="text" class="form-control" placeholder="startDate" v-model="menu.startDate">
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">endDate</label>
                    <input type="text" class="form-control"  placeholder="endDate" v-model="menu.endDate">
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">deliveryHours</label>
                    <input type="text" class="form-control" placeholder="deliveryHours" v-model="menu.deliveryHours" >
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">averageDeliveryMinutes</label>
                    <input type="text" class="form-control"  placeholder="averageDeliveryMinutes" v-model="menu.averageDeliveryMinutes">
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">price</label>
                    <input type="text" class="form-control"  placeholder="price" v-model="menu.price" >
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">minQuantity</label>
                    <input type="text" class="form-control" placeholder="minQuantity" v-model="menu.minQuantity" >
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">minQuantityPrice</label>
                    <input type="text" class="form-control" placeholder="price" v-model="menu.minQuantityPrice" >
                </div>
                <div class="form-group col-md-6">
                    <label class="labelColor">maxDailySales</label>
                    <input type="text" class="form-control"  placeholder="maxDailySales" v-model="menu.maxDailySales" >
                </div>
                <div class="form-group col-md-12">
                    <label class="labelColor">Image</label>
                    <input type="text" class="form-control"  placeholder="ImageUrl" v-model="menu.imageurl" >
                </div>
            </div>
            <div class="d-flex links">

                <button type="button" class="btn btn-primary " v-on:click="createMenu">Create</button>
                <router-link to="suplieropcion"></router-link>
                <button type="button" class="btn btn-primary" v-on:click="back">Back</button>

            </div>

        </form>
    </div>
    </div>
</template>

<script>
    import API from "../service/api";

    export default {
        name: "AdddMenuSupplier",
        mounted() {
            //this.loadUser()
        },
        props: ['post'],
        data() {
            return {
                loaduser: [],
                serid: '',
                menu: {
                    serviceId: this.post.service.serviceId,
                    menuId: 3,
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
                    maxDailySales: "10",
                    imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF2udKVIiFT1OC5U5uYhqBuQklq3h6WBnYPWim4nHOup97u9FQ&s"
                }
            }
        },
        methods: {

            createMenu(){
                let self = this;
                let menus = self.menu;
                API.post("/service/addMenu", menus)
                    .then( () => this.$toastr.success('Menu created successfully',' :)'))
                    .catch(e => this.$toastr.error(e,'error :('))
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
</style>