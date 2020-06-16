<template>
  <q-tabs class="bg-light-blue justify-around text-white shadow-2" dense>
    <q-route-tab name="resumen" icon="insert_chart" label="Resumen" to="/Resumen" />
    <q-route-tab name="cronometro" icon="timer" label="Cronómetro" to="/Cronometro" />
    <q-route-tab name="historial" icon="date_range" label="Histórico" to="/Historico" />
  </q-tabs>
</template>


<script>
export default {
  name: "BarraNavegacion",
  props: {}
};
</script>
