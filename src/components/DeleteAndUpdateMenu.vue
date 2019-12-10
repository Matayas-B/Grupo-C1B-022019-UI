<template>
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
                    <p  class="text-center labelColor">  {{this.post.name}}</p>
                </div>
                <div class="card-container">
                    <div class="card-footer" v-for="p in getMenus()" :key="p.menuId">
                        <CardMenu :post="p" :prueba='post' ></CardMenu>
                    </div>
                </div>
                <div class="card-footer" >
                    <div class="flex-sm-column">
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item"  v-for="(k, index) in menus" :key="index"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="nextt">Next</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="back">back</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import CardMenu from "./CardMenuSupplier";
    import API from "../service/api";
    import chunk from "lodash/chunk" ;
    export default {
        name: "DeleteAndUpdateMenu",
        components: {CardMenu},
        props: ['post'],
        mounted(){
            this.menuss()
        },
        updated(){
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
                loaduser: '',
                serviceId: this.post.service.serviceId,
                prueba: this.post,
            }
        },
        methods: {
            menuss(){
                 API.get("/service/getMenus?serviceId="+this.serviceId )
                     .then(response => this.callBack(response))
            },
            callBack(r){
                this.menus = chunk(r,2)
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
            back(){
                this.$router.push({ name: 'suplieropcion', params: {post: this.post }})
            }

        },
    }
</script>

<style scoped>
    .prueba{
margin-top: -20%;
    }

    .card-text{
        color: white;
    }
    .btn  {

        width: auto;
    }
    .labelColor{
        color: #1fffc5;}
</style>