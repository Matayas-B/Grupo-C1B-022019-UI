<template>
    <div class="card" >
      <img class="card-img-top" src="" alt="Card image">
      <div class="card-body">
        <h4 class="card-title">John Doe</h4>
        <p class="card-text">Some example text.</p>
        <a href="#" class="btn btn-primary">See Profile</a>
      </div>
    </div>
</template>

<script>

export default {
  
     computed: {
       theimage: function () {
        
        return '@/assets/Bache1.jpg'
       }
     
        },
    props:['imagen']
}
        
</script>

<style scoped>

</style>