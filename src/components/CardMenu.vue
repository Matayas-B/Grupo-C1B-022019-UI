<template>
    <div class="card ">
        <div class="card-body">
            <h4 class="card-text">{{post.name}}</h4>
            <h4 class="card-text">{{post.description}}</h4>
            <button type="button" class="btn btn-primary">Primary</button>
        </div>
    </div>
</template>


<script>
    export default {

        name: "CardMenu",
        //props: ['title','text'],
        props: ['post']

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