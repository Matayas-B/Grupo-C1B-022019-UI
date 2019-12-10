<template>
    <div class="card" >
      <img class="card-img-top" :src="menu.imageUrl" alt="Card image" >
      <div class="card-body labelColor">
        <h4 class="card-title text-center"> {{menu.name}} </h4>
        <h5> {{menu.description}} </h5>
        <span>
          <h6> {{$t('purchaseamount')}}:{{purchase.purchaseAmount/menu.price}}</h6>
          <h6> {{$t('purchaseprice')}}:${{menu.price}}</h6>
        </span>
        <h6> {{$t('purchasedate')}}:{{purchase.purchasedDate}}</h6>
        <h6> {{$t('purchasestatus')}}:
          <i :class="status(purchase.purchaseStatus)"
              :title="$t('purchasestatus')"
              style="text-align:right" />
        </h6>
      </div>
      <span class="card-footer" >
        <input v-if="purchase.purchaseStatus == 'InProgress'"
          value="send" type="button" v-on:click="$emit('sendMenu',purchase.purchaseId)"/>
        <input v-if="purchase.purchaseStatus == 'InDelivery'"
          value="send" type="button" v-on:click="$emit('finishMenu',purchase.purchaseId)"/>
        <rate v-else :length="5" :value="purchase.punctuation" disabled/>
        <h4 class="labelColor text-right"> ${{purchase.purchaseAmount}} </h4>
      </span>
    </div>
</template>

<script>

export default {
  name: "CardDelivery",
  methods:{
    status: function(state) {
      const purchaseStatus = {
        InProgress: "fas fa-hotel",
        InDelivery: "fas fa-spinner",
        Finished:   "fas fa-check",
      };
      return purchaseStatus[state];
    },

  },
  computed: {
    theimage: function () {
      return '@/assets/iconfinder-hamburger.svg'
    }
  },
  props:["purchase","menu"],
  event:["sendMenu"]
}
        
</script>

<style scoped>
    .labelColor{
        color: rgb(255, 255, 255);
    }
    img{
      max-width:80%;
      height: auto;
      align-items:center;
      align-self: center;
      margin-top: 2%;
    }
</style>