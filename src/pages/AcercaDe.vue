<template>

  <q-page class="flex flex-center">
    

    <q-intersection transition="scale">
      <q-card
        class="my-card q-mb-sm .shadow-3 bg-teal-6 text-white text-center">
        <q-card-section>
        <div class="column justify-center">
        <img alt="Lets Study logo" src="~assets/logo_letsstudy.png" />
        </div>
        </q-card-section>
      </q-card>

      <q-card
      class="my-card q-mb-sm .shadow-3 bg-teal-6 text-white text-center">
        <q-card-section>
        <div class="text-h6">Proyecto realizado en el Hackaton 19/20 del CEEDCV</div>
        
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