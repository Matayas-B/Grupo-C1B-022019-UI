<template>
    <div class="card" >
      <div class="card-body labelColor">
        <h4 class="card-title text-center"> {{menu.name}} </h4>
        <p> {{menu.description}} </p>
        <h4> Amount:{{purchase.purchaseAmount}} </h4>
        <h4> From {{purchase.purchasedDate}}...{{purchase.purchaseStatus}}</h4>
        <h3 v-if="typeof(purchase.punctuation) == 'undefined'"> Nop </h3>
        <h3 v-else> {{purchase.punctuation}} </h3>
        <!-- Purchase
         1:
punctuation: 1
purchaseAmount: 1000
purchaseId: 2
purchaseStatus: "InProgress"
purchasedDate: "19-11-2019"
purchasedMenu:{
averageDeliveryMinutes: 10
category: "Hamburguesa"
deliveryFee: 10
deliveryHours: "Afternoon"
description: "Hamburguer riquisima ! ! !"
endDate: "04-05-2017"
maxDailySales: 10
menuId: 4
menuScores: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
minQuantity: 10
minQuantityPrice: 35
name: "Whopper3"
price: 100
scoreAverage: 1.9
serviceId: 1
startDate: "04-05-2017"
validMenu: true
}

          Next patch
         List<OfficeDays> officeDays, List<OfficeHours> officeHours,
        .deliveryDistanceKm
        .supplier
        .isValidService -->
      </div>
    </div>
</template>

<script>

export default {
  name: "CardHistory",
  computed: {
    theimage: function () {
      return '@/assets/iconfinder-hamburger.svg'
    }
  },
  props:["purchase","menu"]
}
        
</script>

<style scoped>
    .labelColor{
        color: rgb(255, 255, 255);
    }
</style>