<template>
  <div>
    <div class="barra1">
      <TheNavBar></TheNavBar>
    </div>
    <div>
      <Boton></Boton>
    </div>    
    
  </div>  
</template>

<script>
import TheNavBar  from './components/TheNavBAr'
import Boton from './components/Boton'

export default {
  name: 'app',
  components: {
    TheNavBar,
    Boton
  }
}
</script>

<style>
body{
      background: url("./assets/fondo.jpg") no-repeat fixed center center;
      margin: 10% 0 0 40%;
      background-size: cover;
      background-position: top;
}


</style>
