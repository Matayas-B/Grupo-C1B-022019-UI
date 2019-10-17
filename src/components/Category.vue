<template>
    <div class="container">

        <nav id="barra-principal" class="navbar fixed-top">
            <h2 class="text-white" id="ViendasYa">ViendasYa</h2>
            <form class="form-inline" action="/">
                <input type="search"  placeholder="search..">
                <button class="btn btn-success" type="submit">search</button>
            </form>
        </nav>
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>choose food category</h3>

                </div>
                <div class="card-body">

                        <div v-for="item in items" :key="item.message">
                            <list></list>
                        </div>

                </div>
                <div class="card-footer">
                    <input type="submit" value="My Account" class="btn float-right login_btn">
                </div>
            </div>
        </div>
        <div class="botonlogout">
                <boton></boton>

        </div>
    </div>

</template>

<script>
    //import theNavBAr from "./TheNavBAr";
    import boton from "./Boton";
    import list from "./List";
    export default {
        name: "Category",
        components: {
            list,
            boton
        },
        data() {
            return {
                items: [
                    {message: 'Foo'},
                    {message: 'Bar'},

                ]
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
        margin-top: auto%;
        margin-left: -20%;


    }
</style>