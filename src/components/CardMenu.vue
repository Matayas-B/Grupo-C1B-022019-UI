<template>

<!--    <div class="container">-->
<!--        <div class="d-flex">-->

<!--    <div class="card" >-->
<!--        <img class="mb-2"-->
<!--             src=../assets/cerdo.jpg-->

<!--             img-alt="Image"-->
<!--             img-top-->
<!--             tag="article"-->
<!--             style="max-width: 20rem;"-->
<!--        >-->
<!--        <div class="card-body">-->
<!--            <h4 class="card-title">John Doe</h4>-->
<!--            <p class="card-text">Some example text.</p>-->
<!--            <a href="#" class="btn btn-primary">See Profile</a>-->
<!--        </div>-->
<!--    </div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="card ">
        <div class="card-body">
            <h4 class="card-text">{{title}}</h4>
            <h4 class="card-text">{{text}}</h4>
            <button type="button" class="btn btn-primary">Primary</button>
        </div>
    </div>
</template>


<script>
    export default {
        name: "CardMenu",
        props: ['title','text'],

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

        width: auto%;
    }
</style>