<template>
    <div class="card" >
      <div class="card-body labelColor">
        <h4 class="card-title text-center"> 
          {{menu.name}}
          <i :class="status(purchase.purchaseStatus)"
             :title="$t('purchasestatus')"
             style="text-align:right" /> <!--Not working aligment -->
        </h4>
        <p> {{menu.description}} </p>
        <h4> {{$t('purchaseamount')}}:{{purchase.purchaseAmount}} </h4>
        <h4> {{$t('purchasedate')}}:{{purchase.purchasedDate}}</h4>
        
        
        <h3>
          <span>
          {{$t('userpuntuation')}}:
          <h3 v-if="typeof(purchase.punctuation) == 'undefined'">
          - 
          </h3><h3 v-else> {{purchase.punctuation}} </h3>
          </span>
        </h3> 
        

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
  methods:{
    status: function(state) {
      const purchaseStatus = {
        InProgress: "fas fa-hotel",
        InDelivery: "fas fa-spinner",
        Finished:   "fas fa-check",
      };
      return purchaseStatus[state];
    }
  },
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