<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="q-mr-md text-right Oswald text-weight-bold">Let's Study</q-toolbar-title>

        <q-avatar class="no-border-radius">
          <img src="~assets/logo_header.png" alt="logo" />
        </q-avatar>
      </q-toolbar>

      <BarraNavegacion />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list class="Oswald">
        <q-item-label header class="text-grey-8">Opciones</q-item-label>

        <!-- Item Resumen -->
        <q-item clickable to="Resumen">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Resumen</q-item-label>
            <q-item-label caption>Tiempo de estudio</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Item Cronometro. La propiedad "to" indica que informacion mandara a router
        para poder localizar el destino de este click-->
        <q-item clickable to="Cronometro">
          <q-item-section avatar>
            <q-icon name="timer" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cronómetro</q-item-label>
            <q-item-label caption>Comienza a estudiar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="Historico">
          <q-item-section avatar>
            <q-icon name="date_range" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Histórico</q-item-label>
            <q-item-label caption>Compara tu progreso</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="PlanEstudio">
          <q-item-section avatar>
            <q-icon name="emoji_events" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Plan de estudio</q-item-label>
            <q-item-label caption>Establece tus objetivos</q-item-label>
          </q-item-section>
        </q-item>
        <!--
        <q-item clickable to="ConfigurarPomodoro">
          <q-item-section avatar>
            <q-icon name="psychology" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Pomodoro</q-item-label>
            <q-item-label caption>Configuralo a tu medida</q-item-label>
          </q-item-section>
        </q-item>
        -->
        <q-item clickable to="AcercaDe">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Acerca de nosotros</q-item-label>
            <q-item-label caption>Hackaton CEEDCV</q-item-label>
          </q-item-section>
        </q-item>
        <!--
        <q-item clickable to="Debug">
          <q-item-section avatar>
            <q-icon name="warning" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Debug</q-item-label>
            <q-item-label caption>Sección para debuguear la app</q-item-label>
          </q-item-section>
        </q-item>
        -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import BarraNavegacion from "../componentes/BarraNavegacion.vue";
export default {
  name: "MainLayout",

  components: {
    BarraNavegacion
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  created: function() {
    // Al iniciar la APP, cargamos el valor de LocalStorage en Usuario.$usuarioLocal
    FuncionesAuxiliares.restaurarEstadoLocalStorage();
  },
  mounted() {
    FuncionesAuxiliares.pantallaCargaIniciar();
  }
};
</script>
