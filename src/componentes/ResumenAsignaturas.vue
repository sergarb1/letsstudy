<!-- Componente que mostrará la Configuracion de Pomodoro -->
<template>
  <q-card flat>
    <!-- Lista de objetivos, cada q-item representa un objetivo -->
    <q-card-section>
      <div class="q-mr-md text-center Oswald">Resumen asignaturas</div>
    </q-card-section>

    <q-card-section class="col items-center">
      <q-badge color="secondary">Asignatura 1</q-badge>
    </q-card-section>
    <q-card-section class="col items-center">
      <q-badge color="secondary">Asignatura 2</q-badge>
    </q-card-section>
  </q-card>
</template>
<script>
import Usuario from "../clases/Usuario";
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares";
export default {
  name: "ResumenAsignaturas",
  data() {
    return {};
  },
  mounted: function() {},
  methods: {}
};
</script>