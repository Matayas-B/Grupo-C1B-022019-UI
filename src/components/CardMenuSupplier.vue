<template>
    <div class="card " :key="p">
        <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
            <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
        </div>
        <img class="card-img-top" :src=post.imageUrl alt="Card image">
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
                loading: false,
                id: this.post.serviceId,
                p: this.post.menuId
            }
        },
        methods:{
            deletee(){
                this.loading = true;
                API.get(`/service/deleteMenu?serviceId=${this.id}&menuId=${this.p}`)
                    .then( () => {
                        this.$toastr.success(':)',' Menu Borrado correctamente')
                        this.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.$toastr.error(':(', 'No se Pudo Borrar el Menu favor de probar nuevamente')
                    })
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

</style>