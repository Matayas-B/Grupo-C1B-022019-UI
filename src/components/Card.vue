<template>
    <div class="card" >
      <img class="card-img-top" :src="service.icon" alt="Card image">
      <div class="card-body">
        <h4 class="card-title"> {{service.serviceName}} </h4>
        <p class="card-text"> {{service.description}} </p>
        <a href="#" class="btn btn-primary">See Contact</a>
        {{service.address}} ,{{service.email}}, {{service.phoneNumber}}
        <!-- Next patch
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
    props:["service"]
}
        
</script>

<style scoped>

</style>