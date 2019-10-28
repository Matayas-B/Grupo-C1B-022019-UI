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
        <div class="d-flex col-sm-7 h-100">
            <div class="card" >
                
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
        <div class="d-flex col-sm-7 card" >
            <div class="card-body row" v-for="menu in menues" :key="menu.title">
                <cardmenu :title="menu.title"/>
            </div>
        </div>
        </div>
        <div class="row justify-content-bottom botonlogout">
            <boton />
        </div>
        <h6 > {{ bottonalert }} </h6>
        <!--Deberia moverse con la pantalla, no estar al fondo-->
    </div>

</template>

<script>
    import API from "../service/api";

    import boton from "./Boton";
    import list from "./List";
    import cardmenu from "./Card";

    export default {

        name: "Category",
        components: {
            list,
            boton,
            cardmenu,
        },
        mounted() {
            let comp = this;
            
            function addCategories(res){
                    // eslint-disable-next-line
                    console.log("ok: ") // + res);
                    //comp.items.push(res.categories);
            }
            function handlError(e){ 
                // eslint-disable-next-line
                console.log( process.env.VUE_APP_LOCALSERVER );
                if (e.status) {
                    // eslint-disable-next-line
                    console.log( e.toString() );
                    comp.bottonalert = true; 
                } else // eslint-disable-next-line
                    console.log( "network error");
            }
            
            API.get("/categories").then( addCategories ).catch( handlError ); //.finally(() => this.loading = false);
        },
        data() {
            return {
                user: {
                    username: localStorage.getItem('name')
                },
                items: [],
                menues: [
                    {title:'title1',text:"body",suplier:"service"},
                    {title:'title2',text:"body",suplier:"service"},
                    {title:'title3',text:"body",suplier:"service"},
                ],
                bottonalert: "", 
            }
        },
        methods: { }
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