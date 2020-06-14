<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-light-blue">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Let's Study</q-toolbar-title>

        <div>Let's Study</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Opciones</q-item-label>

        <!-- Item Resumen -->
        <q-item clickable to="Resumen">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Estadísticas del usuario</q-item-label>
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
            <q-item-label>Cronometro</q-item-label>
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
        <q-item clickable to="AcercaDe">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Acerca de nosotros</q-item-label>
            <q-item-label caption>Hackaton CEEDCV</q-item-label>
          </q-item-section>
        </q-item>

        
        <q-item clickable to="Test">
          <q-item-section avatar>
            <q-icon name="dev-to" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Test</q-item-label>
            <q-item-label caption>Para pruebas unitarias</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
