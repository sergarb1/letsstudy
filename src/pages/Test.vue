<template>
  <q-page class="flex flex-center column">
    <p>Mira la consola del navegador</p> 
    <p>En Firefox Ctrl+May+k</p>
    <p>En Chrome Ctrl+May+i</p>
    
  </q-page>
</template>

<script>
import probarClases from "../../test/TestClases.js"

export default {
  name: 'Test',
  mounted: function(){
    probarClases();
  }
}



</script>
