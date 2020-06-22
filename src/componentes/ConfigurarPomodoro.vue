<!-- Componente que mostrará la Configuracion de Pomodoro -->
<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="flex flex-center column" style="height: 50px">
        <img alt="Lets Study logo" src="../assets/logo_historico_s.png" />
      </div>
    </q-card-section>

    <!-- Lista de objetivos, cada q-item representa un objetivo -->
    <q-card-section>
      <div class="Oswald text-center">
        <h5>Técnica Pomodoro
        <q-icon name="help" /></h5>
      </div>
    </q-card-section>

    <q-card-section class="col items-center">
      <q-badge color="secondary">Número de ciclos: {{ numCiclos }}</q-badge>
      <q-slider v-model="numCiclos" markers :min="1" :max="15" />
      <q-badge color="secondary">Rondas por ciclos: {{ numRondas }}</q-badge>
      <q-slider v-model="numRondas" markers :min="1" :max="15" />
      <q-badge color="secondary">Minutos por ronda: {{ minPorRondas }}</q-badge>
      <q-slider v-model="minPorRondas" markers :min="1" :max="60" />
      <q-badge color="secondary">Descanso rondas: {{ descansoRondas }}</q-badge>
      <q-slider v-model="descansoRondas" markers :min="1" :max="60" />

      <q-badge color="secondary">Descanso ciclos: {{ descansoCiclos }}</q-badge>
      <q-slider v-model="descansoCiclos" markers :min="1" :max="60" />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Listo" icon="check" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  name: "ConfigurarPomodoro",
  data() {
    return {
      numCiclos: 2,
      numRondas: 2,
      minPorRondas: 15,
      descansoRondas: 5,
      descansoCiclos: 20
    };
  },
  mounted: function() {},
  //metodos para cambiar el color de las card  y que no sean todos del mismo color
  methods: {}
};
</script>