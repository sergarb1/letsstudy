<!-- Otro componente Vue, que mostrará la página de las
estadísticas de tiempo de estudio del usuario -->
<template>
  <div class="q-pa-md column items-center q-gutter-md">
    <!-- Aquí hacemos uso del componente de Quasar para crear
    tarjetas -->
    <q-card class="my-card">
      <q-card-section class="bg-grey-3">
        <h4>Estudiado hoy:</h4>
        <h3>{{ hoy }}</h3>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section class="bg-grey-3">
        <h4>Estudio semana:</h4>
        <h3>{{ semana }}</h3>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section  class="bg-grey-3">
        <h4>Total estudio:</h4>
        <h3>{{ total }}</h3>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Resumen',
  /* Creamos la función 'data' para hacer reactivas las
  variables que contienen los tiempos de estudio. Esto en un futuro
  se podría indicar como 'props' del componente. */
  data: function() {
    return {
      hoy: "2h. 59min.",
      semana: "8h. 22 min.",
      total: "55h. 25 min."
    };
  }
}
</script>

<!-- Aquí hacemos uso de la etiqueta 'style' usando lenguaje 'SASS'
 para dar algún formato más al html de arriba. Al indicar 'scoped'
 nos aseguramos que sólo afectará a este componente y ninguno más. -->
<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 500px
    
  h4
    text-align: center

  h3
    text-align: center

  div
    background-image: url('~assets/LETSSTUDY.png')
    background-repeat: no-repeat
    background-attachment: fixed
    background-size: cover
</style>