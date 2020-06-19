<template>
  <q-page class="flex flex-center content-start">
    <div class="column justify-center q-gutter-sm" style="height: 250px">
      <img alt="Lets Study logo" src="~assets/LETSSTUDY_2.png" />
    </div>

    <q-intersection transition="scale">
      <q-card
        class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-left no-border-radius"
      >
        <q-card-section>
          <h5>Proyecto realizado en el Hackaton 19/20 del CEEDCV</h5>
          <div class="text-subtitle1">
            Por unos cuantos alumnos y alumnas entregados al lado luminoso de
            la programación y unos profesores armados de paciencia infinita.
          </div>
          <br>
          <a href="https://github.com/sergarb1/letsstudy">Proyecto en Github</a>
          <br>
          <a href="https://github.com/sergarb1/letsstudy-downloads">Descarga LetsStudy</a>
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
  background: #00cfee
</style>