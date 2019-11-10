<template>
<div class="card">
      <img class="card-img-top" :src="menu.icon" alt="Barger">
      <h5 class="card-title text-white"> {{menu.name}}</h5>
      <h6 class="card-subtitle font-italic mb-2 text-muted"> {{menu.description}} </h6>
      <p class="card-text"> {{menu.officeDays}};{{menu.officeHours}} </p>
      <div slot="footer">
        <button type="button" variant="primary" class="btn btn-light"
          v-on:click="$emit('handleclick', menu.menuId)" block> {{buttonValue}} </button>
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
  props:["menu","buttonValue"]
}
        
</script>

<style scoped>

</style>