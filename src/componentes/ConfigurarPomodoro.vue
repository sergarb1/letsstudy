<!-- Componente que mostrará la Configuracion de Pomodoro -->
<template>
  <q-card flat>
    <q-card-section class="row items-center" style="wdith: 1000px; max-width:1500px">
      <div class="flex flex-center column justify-center" style="height:50px">
        <img alt="Lets Study logo" src="../assets/logo_historico_s.png" />
      </div>
    </q-card-section>

    <!-- Lista de objetivos, cada q-item representa un objetivo -->
    <q-card-section>
      <div class="q-mr-md text-center Oswald">
        Técnica Pomodoro
        <q-icon name="help" />
      </div>
    </q-card-section>

    <q-card-section class="col items-center">
      <q-badge color="secondary">Número de ciclos: {{ miUsuaro.pomodoro.numeroCiclos }}</q-badge>
      <q-slider
        v-model="miUsuaro.pomodoro.numeroCiclos"
        markers
        :min="1"
        :max="15"
        @change="guardar();"
      />
      <q-badge color="secondary">Rondas por ciclos: {{ miUsuaro.pomodoro.numeroRondas }}</q-badge>
      <q-slider
        v-model="miUsuaro.pomodoro.numeroRondas"
        markers
        :min="1"
        :max="15"
        @change="guardar();"
      />
      <q-badge color="secondary">Minutos por ronda: {{ miUsuaro.pomodoro.duracionRonda }}</q-badge>
      <q-slider
        v-model="miUsuaro.pomodoro.duracionRonda"
        markers
        :min="1"
        :max="60"
        @change="guardar();"
      />
      <q-badge
        color="secondary"
      >Minutos descanso por rondas: {{ miUsuaro.pomodoro.duracionDescansoCorto }}</q-badge>
      <q-slider
        v-model="miUsuaro.pomodoro.duracionDescansoCorto"
        markers
        :min="1"
        :max="60"
        @change="guardar();"
      />
      <q-badge
        color="secondary"
      >Minutos descanso por ciclos: {{ miUsuaro.pomodoro.duracionDescansoLargo }}</q-badge>
      <q-slider
        v-model="miUsuaro.pomodoro.duracionDescansoLargo"
        markers
        :min="1"
        :max="60"
        @change="guardar();"
      />
    </q-card-section>

    <q-card-actions align="right" v-if="visibleListo">
      <q-btn flat label="Listo" icon="check" color="primary" @click="guardar();" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script>
import Usuario from "../clases/Usuario";
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares";
export default {
  name: "ConfigurarPomodoro",
  data() {
    return {
      visibleListo: this.botonListo,
      miUsuaro: Usuario.$usuarioLocal
    };
  },
  mounted: function() {},
  // Propiedades que se le pasan
  props: {
    botonListo: Boolean
  },
  methods: {
    guardar: function() {
      FuncionesAuxiliares.guardarEstadoLocalStorage();
    }
  }
};
</script>