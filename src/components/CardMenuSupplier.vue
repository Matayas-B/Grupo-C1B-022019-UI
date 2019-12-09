<template>
    <div class="card " :key="p">
        <img class="card-img-top responsibe" :src=post.imageUrl alt="Card image">
        <div class="card-body">
            <h4 class="card-text">{{post.name}}</h4>
            <h4 class="card-text" >{{post.description}}</h4>
            <div class="prueba">
                <a class="distancia" data-toggle="tooltip" data-placement="top" >
                    <i class="fa fa-pen-square estilodeboton"  v-on:click="update"></i></a>
                <a data-toggle="tooltip" data-placement="top" >
                    <i class="fa fa-trash estilodeboton "  v-on:click="deletee"></i></a>
            </div>
        </div>
    </div>
</template>
<script>
    import API from "../service/api";
    export default {

        name: "CardMenuSupplier",
        props: ['post', 'prueba'],
        data(){
            return {
                id: this.post.serviceId,
                p: this.post.menuId
            }
        },
        methods:{
            deletee(){
                API.get(`/service/deleteMenu?serviceId=${this.id}&menuId=${this.p}`)
                    .then( () => this.$toastr.success(':)',' Menu Borrado correctamente'))
                    .catch(() => this.$toastr.error(':(', 'No se Pudo Borrar el Menu favor de probar nuevamente'))
            },
            update(){
                this.$router.push({ name: 'updatemenu', params: {post: this.post, prueba: this.prueba }})
            }
        }

    }
</script>

<style scoped>

    .prueba{
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .estilodeboton{
        font-size: 2rem;
        color: #16ff4b;
        padding: 3%;
    }
    .card-text{
        color: white;

    }
    .responsibe {
        width: 100%;
        max-width: 400px;
        align-items:center;
        height: auto;
        max-height: 300px;
    }
</style>