<template>
  <div>
    <div class="q-pa-md col-8 q-gutter-md">
      <div class="flex flex-center column">
        <img alt="Lets Study logo" src="~assets/LETSSTUDY_RESUMEN.png" style="height:150px;" />
      </div>
    </div>
    <q-intersection transition="scale">
      <q-card
        class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-left no-border-radius Oswald"
      >
        <q-card-section>
          <h5>Proyecto realizado en el Hackaton 19/20 del CEEDCV</h5>
          <div class="text-subtitle1">
            Por unos cuantos alumnos y alumnas entregados al lado luminoso de
            la programación y unos profesores armados de paciencia infinita.
          </div>
        </q-card-section>

        <q-card-section>
          <q-list style="max-width:70vh">
            <q-item class="justify-start">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="code"
                label="Proyecto Let's Study en Github"
                @click="abrirURL('https://github.com/sergarb1/letsstudy')"
              />
            </q-item>
            <q-item class="justify-start">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="get_app"
                label="Let's Study en Google Play"
                @click="abrirURL('https://github.com/sergarb1/letsstudy-downloads')"
              />
            </q-item>
            <q-item class="justify-start">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="cloud"
                label="Let's Study (Online)"
                @click="abrirURL('https://apuntesfpinformatica.es/letsstudy')"
              />
            </q-item>
            <q-item class="justify-start">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="desktop_windows"
                label="Let's Study para Escritorio"
                @click="abrirURL('https://github.com/sergarb1/letsstudy-downloads')"
              />
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
</template>

<script>
// Para poder usar OpenURl que gestione el abrir enlaces en cada contexto
import { openURL } from "quasar";
export default {
  name: "AcercaDe",
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que recibe un URL y la abre
    abrirURL(url) {
      openURL(url);
    }
  }
};
</script>


<style lang="sass" scoped>
.fondo
  background: #00cfee
</style>