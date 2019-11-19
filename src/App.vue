<template>
    <div>
<!--      <Name></Name>-->
        <router-view></router-view>
    </div>


</template>

<script>

//import Name from "./components/Name";
export default {
  name: 'app',
  components: {
    //Name
  }
}
</script>

<style>
  body{
    background: url("./assets/fondo.jpg") no-repeat fixed center center;
    margin: 10% 0 0 40%;
    background-size: cover;
    /*background-position: top;*/
  }

</style>
