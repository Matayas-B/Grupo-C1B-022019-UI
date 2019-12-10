<template>
  <div class="card" >
    <div class="card-body labelColor">
      <h4 class="card-title text-center">
        {{menu.name}}

        <i :class="status(purchase.purchaseStatus)"
           :title="$t('purchasestatus')"
           style="text-align:right" /> <!--Not working aligment -->
      </h4>
    </div>
    <div class="card-body">
      <img class="card-img-top" :src="menu.imageUrl" alt="Card image" >
    </div>
    <div class="card-body" style="color: white">

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