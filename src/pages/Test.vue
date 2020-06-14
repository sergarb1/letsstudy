<template>
  <q-page class="flex flex-center column">
    <img
      class="shadow-24"
      alt="Lets Study logo"
      src="~assets/LETSSTUDY.png"
    >
    <h3>¡ ESTUDIA !</h3>
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
