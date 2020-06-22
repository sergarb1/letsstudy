<template>
  <q-page class="flex flex-center content-start">
    <ConfigurarPomodoro :botonListo="false" />
  </q-page>
</template>

<script>
// Importamos componente ConfigurarPomodoro

import ConfigurarPomodoro from "../componentes/ConfigurarPomodoro.vue";

export default {
  name: "PaginaConfigurarPomodoro",
  components: {
    ConfigurarPomodoro
  }
};
</script>
