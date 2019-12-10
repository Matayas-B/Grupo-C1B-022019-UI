<template>
    <div class="container flex-column">
        <form class="form-inline justify-content-end prueba py-5" >
            <div class="form-group ">
                <input  v-model="info.servicetown"  class="form-control" placeholder="Locate search..">
                <input  v-model="info.menuname"  class="form-control" placeholder="Name search..">
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
                    <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
                        <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
                    </div>
                    <h3 class=" labelColor text-center " >{{username}}</h3>
                </div>
                <div class="card-container">
                    <div class="card-footer" v-for="p in getMenus()" :key="p.menuId">
                        <CardMenu :post="p"></CardMenu>
                    </div>
                </div>
                <div class="card-footer" >
                    <div class="flex-sm-column">
                        <ul class="pagination" >
                            <li class="page-item"><a class="page-link"  v-on:click="previus">Previous</a></li>
                            <li class="page-item"  v-for="(k, index) in menus" :key="index"><a class="page-link" value="0" v-on:click="setPage(index)">{{index}}</a></li>
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
    export default {
        name: "Prueba",
        components: {CardMenu},
        mounted(){
            this.menuss()
        },
        data(){
            return{
                loading: false,
                menus: [],
                info: {
                    menuname : "",
                    menucategory : "All",
                    servicetown : "",
                },
                page: 0,
                username: this.$store.state.user.name
            }
        },
        methods: {
               menuss(){
                this.loading= true;
                let self = this;
                let m = self.info;
               API.post('/search', m )
                   .then(res => {
                       this.callBack(res)
                       this.loading=false;
                   })
                   .catch(res => {
                       this.$toastr.error(res,':(')
                       this.loading=false;
                   })
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