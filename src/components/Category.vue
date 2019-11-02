<template>
    <div class="col container">

        <nav id="barra-principal" class="navbar row fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>
            <h2 class="text-white" id="user">{{user.username}}</h2>
            <form class="form-inline" action="/">
                <input type="search"  placeholder="search..">
                <button class="btn btn-success" type="submit">search</button>
            </form>
        </nav>
        <div class="row">
        <div class="d-flex-box col-sm-7 h-100">
            <div class="card">
                <div class="card-header">
                    <h3>choose food category</h3>
                </div>
                <div class="card-body">
                    <div v-for="item in items" :key="item.message">
                        <list :title="item.message" />
                    </div>
                </div>
                <div class="card-footer">
                    <input type="submit" value="My Account" class="btn float-right login_btn">
                </div>
            </div>
        </div>
        <div class="d-flex-box col-sm-7">
            <paginate :menues="menues" :menuindex="menuindex" :page="3"/>
        </div>
        </div>
        <div class="row justify-content-bottom botonlogout">
            <boton />
        </div>
        <falert :state="bottonalert" message="all ok"/>
    </div>

</template>

<script>
    import API from "../service/api";
    import paginate from "./MenuPagination";
    import boton from "./Boton";
    import list from "./List";
    import falert from "./FloatingAlert";

    export default {
        name: "Category",
        components: {
            list,
            boton,
            paginate,
            falert
        },
        mounted() {
            let comp = this;
            
            function addCategories(res){
                    // eslint-disable-next-line
                    console.log("backend-categories:ok");
                    res.categories.forEach(element => {
                       comp.items.push(element); 
                    });
            }
            function handlError(e){
                if (!e.status) {
                    comp.bottonalert = e.toString(); 
                } else
                    comp.bottonalert = "network error"; 
            }
            let addmenu = (res)=> {
                // eslint-disable-next-line
                    console.log("backend-menu:ok");
                res.forEach(element => {
                       this.menues.push(element); 
                    })
                };

            API.get("/menues").then(addmenu).catch( handlError );
            API.get("/categories").then( addCategories ).catch( handlError ); //.finally(() => this.loading = false);
        },
        data() {
            return {
                user: {
                    username: localStorage.getItem('name')
                },
                items: [],
                bottonalert: "",

                menues: [],
                page: 3,
                menuindex: 0
            }
        }
    }
</script>

<style scoped>

</style>