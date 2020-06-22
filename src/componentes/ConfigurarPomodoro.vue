<!-- Componente que mostrará el Histórico de un usuario -->
<!-- Componente que mostrará el Histórico de un usuario -->
<template>
  <q-page class="flex column q-pa-md col-8 q-a-md">
      <q-card dark bordered class="bg-white-9">
      <div class="q-pa-md col-8 q-gutter-md">
        <div class="flex flex-center column" style="height: 250px">
          <img alt="Lets Study logo" src="../assets/logo_historico_s.png" />
        </div>
      </div>
      <!-- Lista de objetivos, cada q-item representa un objetivo -->
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 text-weight-light justify-end">
             Numero de ciclos: 
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      </q-card>
  </q-page>
</template>
<script>

export default {
  name: "ConfigurarPomodoro",
  data() {
    return {
    };
  },
  mounted: function() {
  },
  //metodos para cambiar el color de las card  y que no sean todos del mismo color
  methods: {
  }
};
</script>