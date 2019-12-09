<template>
    <div class="card ">
        <img class="card-img-top responsibe" :src=post.imageUrl alt="Card image">
        <div class="card-body">
            <h4 class="card-text">{{post.name}}</h4>
            <h4 class="card-text">{{post.description}}</h4>
            <button type="button" class="btn btn-primary" v-on:click="buy">Buy</button>
        </div>
    </div>
</template>

<script>
    export default {

        name: "CardMenu",
        props: ['post'],
        data(){
            return {
                width: window.screen.width,
                heigth: window.screen.heigth,
            }
        },
        methods:{
                buy(){ this.$router.push({ name: 'buy', params: {post: this.post }})}
        }
    }
</script>

<style scoped>
    .card-title{
        color: white;
    }
    .card-text{
        color: white;
    }
    .btn  {

        width: auto;
    }

    .responsibe {
        width: 100%;
        max-width: 400px;
        align-items:center;
        height: auto;
        max-height: 300px;
    }

</style>