<template>
    <div class="card" >
      <img class="card-img-top" :src="service.icon" alt="Card image">
      <div class="card-body">
        <h4 class="card-title"> {{service.serviceName}} </h4>
        <p class="card-text"> {{service.description}} </p>
        <button type="button" class="btn btn-primary" v-on:click="$emit('handleclick', service.menuId)">{{buttonValue}} </button>
        
        <!-- Next patch
        {{service.address}} ,{{service.email}}, {{service.phoneNumber}}
         List<OfficeDays> officeDays, List<OfficeHours> officeHours,
        .deliveryDistanceKm 
        .supplier
        .isValidService -->
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
  props:["service","buttonValue"]
}
        
</script>

<style scoped>

</style>