<!-- Otro componente Vue, que mostrará la página de las
estadísticas de tiempo de estudio del usuario -->
<template>
  <div class="q-pa-md col-8 q-gutter-md" v-touch-swipe.horizontal="userHasSwiped">
    <div class="flex flex-center column">
      <img alt="Lets Study logo" src="~assets/LETSSTUDY_RESUMEN.png" />
    </div>
    <!-- Aquí hacemos uso del componente de Quasar para crear
    tarjetas-->
    <q-btn
      align="between"
      class="btn-fixed-width"
      color="yellow-14"
      label="PROGRESO"
      icon="history"
    />
    <!-- Se añade una sutil animacion al entrar en la pagina -->
    <q-intersection transition="fade">
      <q-card class="my-card q-mb-sm .shadow-3 bg-light-blue-3 text-white text-center">
        <q-card-section>
          <div class="text-h6">Estudiado hoy:</div>
          <div class="text-h5">{{ hoy }}</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card q-mb-sm .shadow-3 bg-light-blue-4 text-white text-center">
        <q-card-section>
          <div class="text-h6">Estudiado durante la semana:</div>
          <div class="text-h5">{{ semana }}</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card q-mb-sm .shadow-3 bg-light-blue-5 text-white text-center">
        <q-card-section>
          <div class="text-h6">Estudiado durante el mes:</div>
          <div class="text-h5">{{ mes }}</div>
        </q-card-section>
      </q-card>
      <q-card class="my-card q-mb-sm .shadow-3 bg-light-blue-6 text-white text-center">
        <q-card-section>
          <div class="text-h6">Total de tiempo estudiado:</div>
          <div class="text-h5">{{ total }}</div>
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
</template>

<script>
// Importo la clase FuncionesAuxiliares
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import Usuario from "../clases/Usuario.js";

export default {
  name: "Resumen",
  /* Creamos la función 'data' */
  data: function() {
    return {};
  },
  methods: {
    userHasSwiped(obj) {
      if (obj.direction == "left") {
        this.$router.push("/Cronometro");
      }
    }
  },
  /* Creamos variables 'computadas' que hacen un cálculo cada vez que entramos en el
  componente, dándonos los datos de tiempos de estudios siempre actualizados */
  computed: {
    hoy: function() {
      const ahora = new Date();
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesDia(ahora);
      let sumaSegundos = 0;
      arraySesiones.forEach(sesion => {
        sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        );
      });
      return FuncionesAuxiliares.segundosToText(sumaSegundos);
    },
    semana: function() {
      const ahora = new Date();
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesSemana(ahora);
      let sumaSegundos = 0;
      arraySesiones.forEach(sesion => {
        sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        );
      });
      return FuncionesAuxiliares.segundosToText(sumaSegundos);
    },
    mes: function() {
      const ahora = new Date();
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesMes(ahora);
      let sumaSegundos = 0;
      arraySesiones.forEach(sesion => {
        sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        );
      });
      return FuncionesAuxiliares.segundosToText(sumaSegundos);
    },
    total: function() {
      const calculoTotal = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .tiempoTotalEstudio();
      return FuncionesAuxiliares.segundosToText(calculoTotal);
    }
  }
};
</script>

<!-- Aquí hacemos uso de la etiqueta 'style' usando lenguaje 'SASS'
 para dar algún formato más al html de arriba. Al indicar 'scoped'
 nos aseguramos que sólo afectará a este componente y ninguno más. -->
<style lang="sass" scoped>
</style>