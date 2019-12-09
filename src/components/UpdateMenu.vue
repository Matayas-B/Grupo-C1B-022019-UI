<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <form>
                <div class="form-row" >
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Menu Name</label>
                        <input type="text" class="form-control" placeholder="name" v-model="service.name">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Description</label>
                        <input type="text" class="form-control" placeholder="description" v-model="service.description">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Category</label>
                        <input type="text" class="form-control" placeholder="category" v-model="service.category">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Delivery Fee</label>
                        <input type="text" class="form-control"  placeholder="deliveryFee" v-model="service.deliveryFee">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor"  >Start Date</label>
                        <input type="text" class="form-control" id="inputEmail3" placeholder="startDate" v-model="service.startDate">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >End Date</label>
                        <input type="text" class="form-control" id="inputPassword3" placeholder="endDate" v-model="service.endDate">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Delivery Hours</label>
                        <input type="text" class="form-control" placeholder="deliveryHours" v-model="service.deliveryHours">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Average Delivery Minutes</label>
                        <input type="text" class="form-control" placeholder="averageDeliveryMinutes" v-model="service.averageDeliveryMinutes">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Price</label>
                        <input type="text" class="form-control" placeholder="price" v-model="service.price">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Min Quantity</label>
                        <input type="text" class="form-control" placeholder="minQuantity" v-model="service.minQuantity">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Min QuantityPrice</label>
                        <input type="text" class="form-control"  placeholder="minQuantityPrice" v-model="service.minQuantityPrice">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Max Daily Sales</label>
                        <input type="text" class="form-control" placeholder="maxDailySales" v-model="service.maxDailySales">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="labelColor" >Menu Id</label>
                        <input type="text" class="form-control"  placeholder="menuId" v-model="service.menuId">
                    </div>
                </div>
                <div class=" d-flex links">
                    <button type="button" class="btn btn-primary" v-on:click="updateMenu">Update</button>
                    <router-link to="/deleteandupdate"></router-link>
                    <button type="button" class="btn btn-primary" v-on:click="back">Back</button>

                </div>
            </form>
        </div>
    </div>

</template>
<script>
    import API from "../service/api";
    export default {
        name: "UpdateMenu",
        props: ['post', 'prueba'],
        data() {
            return {
                service: {
                    menuId: this.post.menuId,
                    serviceId:this.post.serviceId,
                    name: this.post.name,
                    description: this.post.description,
                    category: this.post.category,
                    deliveryFee: this.post.deliveryFee,
                    startDate: "2017-05-04",
                    endDate: "2017-05-04",
                    deliveryHours: this.post.deliveryHours,
                    averageDeliveryMinutes: this.post.averageDeliveryMinutes,
                    price: this.post.price,
                    minQuantity: this.post.minQuantity,
                    minQuantityPrice: this.post.minQuantityPrice,
                    maxDailySales: this.post.maxDailySales
                }
            }
        },
        methods:{
            back(){
                //this.$router.push('/deleteandupdate')
                this.$router.push({ name: 'deleteandupdate', params: {post: this.prueba }})
            },
            updateMenu(){
                let self = this;
                //let menus = self.service;
                API.post("/service/updateMenu", self.service)
                    .then( () => this.$toastr.success('Menu modified successfully',' :)'))
                    .catch( () => this.$toastr.error('Error modified Menu ',' :('))
                // eslint-disable-next-line no-console
                console.log(self.service)
            }
        }
    }
</script>

<style scoped>

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