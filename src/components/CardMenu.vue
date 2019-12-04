<template>
    <div class="card ">
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
</style>