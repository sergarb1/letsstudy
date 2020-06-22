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
          <q-item-label class="text-h6 text-weight-light">
            Objetivo diario:
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-input v-model="objetivoDiario"/>
        </q-item-section>

        <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top>
          <q-icon 
            name="settings"
            color="gray"
            @click="modificaObjetivo('diario')"
          />
        </q-item-section>
        <q-item-section side top>
          <q-icon
            name="delete_forever"
            color="red"
            @click="eliminarObjetivo('diario')" 
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Objetivo semanal:
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-input v-model="objetivoSemanal"/>
        </q-item-section>

        <q-item-section side top>
          <q-icon 
            name="settings"
            color="gray"
            @click="modificaObjetivo('semanal')"
          />
        </q-item-section>
        <q-item-section side top>
          <q-icon
            name="delete_forever"
            color="red"
            @click="eliminarObjetivo('semanal')"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Objetivo mensual:
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-input v-model="objetivoMensual"/>
        </q-item-section>

        <q-item-section side top>
          <q-icon 
            name="settings"
            color="gray"
            @click="modificaObjetivo('mensual')"
          />
        </q-item-section>
        <q-item-section side top>
          <q-icon
            name="delete_forever"
            color="red"
            @click="eliminarObjetivo('mensual')"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="flex flex-center q-mt-md">
      <h4 class="doc-heading doc-h4 q-ma-xs text-weight-light">Asignaturas</h4>
    </div>
    <!-- Lista de asignaturas, habría que hacer un bucle for con el q-item -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">Sistemas informáticos</q-item-label>
        </q-item-section>
        <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top>
          <q-icon name="settings" color="gray" />
        </q-item-section>
        <q-item-section side top>
          <q-icon name="delete_forever" color="red" />
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
            <q-select v-model="frecuencia" :options="optionsFrecuencia" label="Frecuencia" />
          </div>
          <div
            v-if="errorAsignatura"
            class="text-weight-light"
          >Por favor, rellena los campo asignatura</div>
          <q-btn
            color="primary"
            label="Añadir asignatura"
            @click="anadirAsignatura"
            class="q-mt-md"
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
      planEstudio: null,
      objetivoDiario: '-',
      objetivoSemanal: '-',
      objetivoMensual: '-',
      ventanaNuevaAsignatura: false,
      anadirObjetivoAsignatura: false,
      duracionAsignatura: 0,
      nombreAsignatura: "",
      frecuencia: "diario",
      optionsFrecuencia: ["diario", "semanal", "mensual"],
      errorAsignatura: false
    };
  },
  mounted: function() {
    //Rellenammos el objeto planEstudio
    console.log(Usuario.$usuarioLocal)
    this.planEstudio = Usuario.$usuarioLocal.getPlanEstudio();
    // Llamadas a los métodos para mostrar los objetivos creados
    this.getObjetivoDiario();
    this.getObjetivoSemanal();
    this.getObjetivoMensual();
  },
  methods: {
    anadirAsignatura() {
      //Comprueba que exista un nombre en el textfield
      if (this.nombreAsignatura == "") {
        //Si es '', muestra el error y sale del método
        this.errorAsignatura = true;
        return;
      } else {
        //Si es correcto, elimina el mensaje de error
        this.errorAsignatura = false;
        //Crea objeto asignatura
        let asignatura = new Asignatura(this.nombreAsignatura);
        //Si se ha marcado el toggle de objetivo para la asignatura
        if (this.anadirObjetivoAsignatura) {
          //Crear el objeto Objetivo con la duración y la frecuencia elegida
          let objetivo = new Objetivo(this.duracionAsignatura, this.frecuencia);
          //Se asigna la asignatura al objetivo y el objetivo a la asignatura
          objetivo.setAsignatura(asignatura);
          asignatura.setObjetivo(objetivo);
        }
        //Se guarda en la variable Usuario y en localStorage
        Usuario.$usuarioLocal.getPlanEstudio().addAsignaturas(asignatura);
        FuncionesAuxiliares.guardarEstadoLocalStorage();
      }
    },
    modificaObjetivo(obj){
      let encontrado = false;
      let duracion = null

      switch (obj) {
        case 'diario':
          duracion = this.objetivoDiario;
          break;
        case 'semanal':
          duracion = this.objetivoSemanal;
          break;
        case 'mensual':
          duracion = this.objetivoMensual;
          break;
      }

      if(!Number.isInteger(Number.parseInt(duracion))){
        return
      }else{
        duracion = Number.parseInt(duracion);
      }

      this.planEstudio.objetivos.forEach(objetivo => {
        if(objetivo.frecuencia == obj){
          encontrado = true;
          objetivo.duracion = duracion;

          Usuario.$usuarioLocal.getPlanEstudio().getObjetivos().forEach(o => {
            if(o.getFrecuencia() == obj){
              o.setDuracion(duracion)
            }
          });
        }
      });

      if(!encontrado){
        let objetivo = new Objetivo(duracion, obj);
        this.planEstudio.objetivos.push(objetivo);
        Usuario.$usuarioLocal.getPlanEstudio().addObjetivos(objetivo);
      }

      FuncionesAuxiliares.guardarEstadoLocalStorage();
    },
    eliminarObjetivo(obj) {
      //Recorre los objetivos
      this.planEstudio.objetivos.forEach(objetivo => {
        //Comprobación si es el objetivo que estamos buscando, y no tiene asignatura asignada
        if(objetivo.frecuencia == obj && objetivo.asignatura == null){
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
      if (this.planEstudio != null) {
        this.planEstudio.objetivos.forEach(objetivo => {
          if (objetivo.frecuencia == "diario" && objetivo.asignatura == null) {
            this.objetivoDiario = objetivo.duracion;
          }
        });
      }
      this.objetivoDiario = "-";
    },
    getObjetivoSemanal() {
      if (this.planEstudio != null) {
        this.planEstudio.objetivos.forEach(objetivo => {
          if (objetivo.frecuencia == "semanal" && objetivo.asignatura == null) {
            this.objetivoSemanal = objetivo.duracion;
          }
        });
      }
      this.objetivoSemanal = "-";
    },
    getObjetivoMensual() {
      if (this.planEstudio != null) {
        this.planEstudio.objetivos.forEach(objetivo => {
          if (objetivo.frecuencia == "mensual" && objetivo.asignatura == null) {
            this.objetivoMensual = objetivo.duracion;
          }
        });
      }
      this.objetivoMensual = "-";
    }
  },
  computed: {
    
  }
};
</script>

<style lang="sass" scoped>
</style>