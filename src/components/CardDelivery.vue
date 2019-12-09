<template>
    <div class="card" >
      <div class="card-body labelColor">
        <h4 class="card-title text-center"> 
            Something
        </h4>
        <p> {{menu.description}} </p>
        <h4> {{$t('purchaseamount')}}:</h4>
        <h4> {{$t('purchasedate')}}:</h4>
        
      </div>
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
    }
  },
  computed: {
    theimage: function () {
      return '@/assets/iconfinder-hamburger.svg'
    }
  },
  props:["purchase"]
}
        
</script>

<style scoped>
    .labelColor{
        color: rgb(255, 255, 255);
    }
</style>