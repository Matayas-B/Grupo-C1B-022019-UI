<template>
    <div class="card" >
      <img class="card-img-top" :src="imagen" alt="Card image">
      <div class="card-body">
        <h4 class="card-title"> {{title}} </h4>
        <p class="card-text"> {{text}} </p>
        <a href="#" class="btn btn-primary">See Profile</a>
      </div>
    </div>
</template>

<script>

export default {
  
     computed: {
       theimage: function () {
        
        return '@/assets/iconfinder-hamburger.svg'
       }
     
        },
    props:["title", "text", "imagen"]
}
        
</script>

<style scoped>

</style>