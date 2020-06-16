<template>

  <q-page class="flex flex-center content-start" style="background-color: #00cfee">
    <div class="column justify-center q-gutter-sm">
        <img alt="Lets Study logo" src="~assets/logo_letsstudy.png" />
        </div>

    <q-intersection transition="scale">
      

      <q-card
      class="my-card q-mb-sm  bg-indigo-6 text-white text-left">
        <q-card-section>
        <h6>Proyecto realizado en el Hackaton 19/20 del CEEDCV.<br/> 
        Por unos cuantos alumnos y alumnas entregados al lado luminoso de 
          la programación
          y unos profesores armados de paciencia infinita.</h6>
        
        </q-card-section>

      </q-card>
    
      
    </q-intersection>

  </q-page>
  
</template>

<script>
export default {
  name: "AcercaDe"
};
</script>
<style lang="sass" scoped>
  .fondo
    background:#00cfee
</style>