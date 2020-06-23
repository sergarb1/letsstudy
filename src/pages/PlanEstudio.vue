<template>
  <q-page class="flex column q-pa-md col-8 q-a-md">
    <h3 class="doc-heading doc-h3 q-ma-xs">Plan de estudio</h3>
    <div class="flex flex-center q-mt-md">
      <h4 class="doc-heading doc-h4 q-ma-xs text-weight-light">Objetivos</h4>
    </div>
    <!-- Lista de objetivos, cada q-item representa un objetivo -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">Objetivo diario:</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-input v-model="objetivoDiario" />
        </q-item-section>

        <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top>
          <q-icon size="xs" name="settings" color="gray" @click="modificaObjetivo('diario')" class="cursor-pointer"/>
        </q-item-section>
        <q-item-section side top>
          <q-icon size="xs" name="delete_forever" color="red" @click="eliminarObjetivo('diario')" class="cursor-pointer"/>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">Objetivo semanal:</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-input v-model="objetivoSemanal" />
        </q-item-section>

        <q-item-section side top>
          <q-icon size="xs" name="settings" color="gray" @click="modificaObjetivo('semanal')" class="cursor-pointer"/>
        </q-item-section>
        <q-item-section side top>
          <q-icon size="xs" name="delete_forever" color="red" @click="eliminarObjetivo('semanal')" class="cursor-pointer"/>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">Objetivo mensual:</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-input v-model="objetivoMensual" />
        </q-item-section>

        <q-item-section side top>
          <q-icon size="xs" name="settings" color="gray" @click="modificaObjetivo('mensual')" class="cursor-pointer"/>
        </q-item-section>
        <q-item-section side top>
          <q-icon size="xs" name="delete_forever" color="red" @click="eliminarObjetivo('mensual')" class="cursor-pointer"/>
        </q-item-section>
      </q-item>
      <div v-if="errorObjetivo">
        Introduce un valor numérico
      </div>
    </q-list>

    <div class="flex flex-center q-mt-md">
      <h4 class="doc-heading doc-h4 q-ma-xs text-weight-light">Asignaturas</h4>
    </div>
    <!-- Lista de asignaturas, 
    Usamos planEstudio.asignaturas.slice(1) para que no salga la primera, que es
    Estudio general-->
    <q-list>
      <q-item v-for="asig in planEstudio.asignaturas.slice(1)" :key="asig.nombre">
        <!-- El v-if es para que la asignatura nula no la muestre -->
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">{{asig.nombre}}</q-item-label>
        </q-item-section>
        <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top>
          <q-icon size="xs" name="settings" color="gray" class="cursor-pointer"/>
        </q-item-section>

        <q-item-section side top>
          <q-icon
            size="xs"
            name="delete_forever"
            color="red"
            @click="eliminarAsignaturaNombre(asig.nombre)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-btn color="primary" label="Añadir asignatura" @click="ventanaNuevaAsignatura = true" />
    <q-dialog v-model="ventanaNuevaAsignatura" full-width>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-light">Nueva asignatura</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input v-model="nombreAsignatura" label="Asignatura" />
          <q-toggle v-model="anadirObjetivoAsignatura" label="Añadir objetivo a la asignatura" />
          <div v-if="anadirObjetivoAsignatura">
            <q-slider
              v-model="duracionAsignatura"
              :min="1"
              :max="120"
              label
              :label-value="'Objetivo: ' + duracionAsignatura + 'h'"
              label-always
              class="q-mt-md"
            />
            <q-select
              v-model="frecuencia"
              :options="optionsFrecuencia"
              :option-label="etiqueta => (etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1))"
              label="Frecuencia"
            />
          </div>
          <q-btn
            color="primary"
            label="Añadir asignatura"
            @click="anyadirAsignatura"
            class="q-mt-md"
            :disable="nombreAsignatura.length===0"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Usuario from "../clases/Usuario.js";
import Asignatura from "../clases/Asignatura.js";
import Objetivo from "../clases/Objetivo.js";
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";

export default {
  name: "PlanEstudio",
  data: function() {
    return {
      planEstudio: Usuario.$usuarioLocal.planEstudio,
      objetivoDiario: "-",
      objetivoSemanal: "-",
      objetivoMensual: "-",
      ventanaNuevaAsignatura: false,
      anadirObjetivoAsignatura: false,
      duracionAsignatura: 1,
      nombreAsignatura: "",
      frecuencia: "diario",
      optionsFrecuencia: ["diario", "semanal", "mensual"],
      errorObjetivo: false,
      errorAsignatura: false
    };
  },
  // Usamos created, porque si usamos mounted se monta con el plan de estudios nulo
  created: function() {
    // Llamadas a los métodos para mostrar los objetivos creados
    this.getObjetivoDiario();
    this.getObjetivoSemanal();
    this.getObjetivoMensual();
  },
  methods: {
    // Metodo que anayade una asignatura, usnado nombre de "this.nombreAsignatura"
    // y objetivo si procede
    anyadirAsignatura() {
      // En primer lugar comprobamos si esta duplicado el nombre (no se permiten duplicados)
      let nombreDuplicado = false;
      // Recorremos la lista de asignaturas
      for (let x in Usuario.$usuarioLocal.planEstudio.asignaturas) {
        // Duplicado detectado
        if (
          this.nombreAsignatura ===
          Usuario.$usuarioLocal.planEstudio.asignaturas[x].nombre
        ) {
          nombreDuplicado = true;
          break;
        }
      }

      //Comprueba que exista un nombre en el textfield (en teoria Vue evita pulsar el boton vacio)
      // O si esta duplicado
      if (nombreDuplicado === true || this.nombreAsignatura === "") {
        //Si es '', muestra el error y sale del método
        this.errorAsignatura = true;
        // Notificamos error duplicado
        this.$q.notify({
          type: "negative",
          message: "Nombre de asignatura duplicado"
        });
        return;
      } else {
        //Si es correcto, elimina el mensaje de error
        this.errorAsignatura = false;
        //Crea objeto asignatura
        let asignatura = new Asignatura(this.nombreAsignatura, null);
        //Si se ha marcado el toggle de objetivo para la asignatura
        if (this.anadirObjetivoAsignatura) {
          //Crear el objeto Objetivo con la duración y la frecuencia elegida
          let objetivo = new Objetivo(this.duracionAsignatura, this.frecuencia);
          //Se asigna el objetivo a la asignatura
          asignatura.setObjetivo(objetivo);
        }

        //Se guarda en la variable Usuario y en localStorage
        Usuario.$usuarioLocal.getPlanEstudio().addAsignatura(asignatura);
        // Guardamos en el LocalStorage
        FuncionesAuxiliares.guardarEstadoLocalStorage();
        // Vaciamos el nombre de la asignatura
        this.nombreAsignatura = "";
      }
    },
    modificaObjetivo(obj) {
      let encontrado = false;
      let duracion = null;

      switch (obj) {
        case "diario":
          duracion = this.objetivoDiario;
          break;
        case "semanal":
          duracion = this.objetivoSemanal;
          break;
        case "mensual":
          duracion = this.objetivoMensual;
          break;
      }

      if (!Number.isInteger(Number.parseInt(duracion))) {
        this.errorObjetivo = true;
        switch (obj) {
          case "diario":
            this.objetivoDiario = '-';
            break;
          case "semanal":
            this.objetivoSemanal = '-';
            break;
          case "mensual":
            this.objetivoMensual = '-';
            break;
        }
        return;
      } else {
        duracion = Number.parseInt(duracion);
        this.errorObjetivo = false;
      }

      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === obj) {
          encontrado = true;
          Usuario.$usuarioLocal
            .getPlanEstudio()
            .getObjetivos()
            .forEach(o => {
              if (o.getFrecuencia() === obj) {
                o.setDuracion(duracion);
              }
            });
        }
      });

      if (!encontrado) {
        let objetivo = new Objetivo(duracion, obj);
        Usuario.$usuarioLocal.getPlanEstudio().addObjetivo(objetivo);
      }
      FuncionesAuxiliares.guardarEstadoLocalStorage();
    },
    // Funcion que recibe el nombre de una asignatura y la elimina del Plan de estudios
    eliminarAsignaturaNombre(nombreAsig) {
      for (let x in this.planEstudio.asignaturas) {
        if (this.planEstudio.asignaturas[x].nombre === nombreAsig) {
          this.planEstudio.asignaturas.splice(x, 1);
        }
      }
      // Guardamos el estado de LocalStorage
      FuncionesAuxiliares.guardarEstadoLocalStorage();
    },

    eliminarObjetivo(obj) {
      //Recorre los objetivos
      this.planEstudio.objetivos.forEach(objetivo => {
        //Comprobación si es el objetivo que estamos buscando, y no tiene asignatura asignada
        if (objetivo.frecuencia === obj && objetivo.asignatura === null) {
          //Se elimina la frecuencia de ese objetivo en el objeto
          objetivo.frecuencia = null;

          //Se actualiza el objeto Usuario y se guarda
          Usuario.$usuarioLocal.getPlanEstudio().removeObjetivos(objetivo);
          FuncionesAuxiliares.guardarEstadoLocalStorage();
          return;
        }
      });
    },

    //Métodos que recogen el objetivo correspondiente
    getObjetivoDiario() {
      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === "diario") {
          this.objetivoDiario = objetivo.duracion;
          return;
        }
      });
    },
    getObjetivoSemanal() {
      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === "semanal") {
          this.objetivoSemanal = objetivo.duracion;
          return;
        }
      });
    },
    getObjetivoMensual() {
      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === "mensual") {
          this.objetivoMensual = objetivo.duracion;
          return;
        }
      });
    }
  },
  computed: {}
};
</script>

<style lang="sass" scoped>
</style>