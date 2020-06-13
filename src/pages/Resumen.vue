<!-- Otro componente Vue, que mostrará la página de las
estadísticas de tiempo de estudio del usuario -->
<template>
  <div class="q-pa-md col-8 q-gutter-md">
    <div class="flex flex-center column">
      <img alt="Lets Study logo" src="~assets/LETSSTUDY_RESUMEN.png" />
    </div>
    <!-- Aquí hacemos uso del componente de Quasar para crear
    tarjetas-->
    <q-btn align="between" class="btn-fixed-width" color="yellow-14" label="PROGRESO" icon="history" />
    <q-card class="my-card bg-light-blue text-white text-center">
      <q-card-section>
        <div class="text-h5">Estudiado hoy:</div>
        <div class="text-h6">{{ hoy }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card bg-light-green-14 text-white text-center">
      <q-card-section>
        <div class="text-h5">Estudiado semana:</div>
        <div class="text-h6">{{ semana }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card bg-purple text-white text-center">
      <q-card-section>
        <div class="text-h5">Total estudio:</div>
        <div class="text-h6">{{ total }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Resumen",
  /* Creamos la función 'data' para hacer reactivas las
  variables que contienen los tiempos de estudio. Esto en un futuro
  se podría indicar como 'props' del componente. */
  data: function() {
    return {
      hoy: "2h 59min",
      semana: "8h 22 min",
      total: "55h 25 min"
    };
  }
};
</script>

<!-- Aquí hacemos uso de la etiqueta 'style' usando lenguaje 'SASS'
 para dar algún formato más al html de arriba. Al indicar 'scoped'
 nos aseguramos que sólo afectará a este componente y ninguno más. -->
<style lang="sass" scoped>
</style>