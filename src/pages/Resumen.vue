<template>
  <div class="q-pa-md column items-center q-gutter-md">
    <q-card class="my-card">
      <q-card-section class="bg-grey-3">
        <h4>Estudiado hoy:</h4>
        <h3>2h. 59min.</h3>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section class="bg-grey-3">
        <h4>Estudio semana:</h4>
        <h3>8h. 22 min.</h3>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section  class="bg-grey-3">
        <h4>Total estudio:</h4>
        <h3>55h. 25 min.</h3>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Resumen'
}
</script>

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