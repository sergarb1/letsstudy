<template>
  <q-tabs class="bg-light-blue justify-around text-white shadow-2" v-model="tabBarra" dense>
    <q-route-tab name="resumen" icon="insert_chart" label="Resumen" to="/Resumen" />
    <q-route-tab name="crono" icon="timer" label="Crono" to="/Cronometro" />
    <q-route-tab name="historial" icon="date_range" label="Histórico" to="/Historico" />
    <q-route-tab name="Plan" icon="emoji_events" label="Plan" to="/PlanEstudio" />
  </q-tabs>
</template>


<script>
export default {
  name: "BarraNavegacion",
  data:{
    function(){
      return{
        tabBarra:"resumen"
      }
    }
  }
};
</script>
