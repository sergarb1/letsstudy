<!-- Otro componente Vue, que mostrará la página de las
estadísticas de tiempo de estudio del usuario -->
<template>
  <div v-touch-swipe.mouse.horizontal="userHasSwiped">
    <div class="q-pa-md col-8 q-gutter-md">
      <div class="flex flex-center column" >
        <img alt="Lets Study logo" src="~assets/Tus_metas.png" style="height:150px;" />
      </div>
    </div>
    <div>
      <q-tabs
        inline-label
        v-model="tabObjetivos"
        active-color="white"
        indicator-color="blue"
        dense
        class="text-white shadow-2"
        align="justify"
      >
        <q-tab
          name="general"
          label="General"
          align="between"
          class="bg-yellow-14"
          icon="track_changes"
        />
        <q-tab
          name="asignaturas"
          label="Por asignaturas"
          align="between"
          class="bg-teal-14"
          icon="fact_check"
        />
      </q-tabs>

      <q-tab-panels v-model="tabObjetivos" animated class="text-white">
        <q-tab-panel name="general">
          <ResumenGeneral />
        </q-tab-panel>

        <q-tab-panel name="asignaturas">
          <ResumenAsignaturas />
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- Faltaría enlazar los objetivos. De momento he enlazado dia, 
    semana y mes. También faltaría configurar el avance de la 
    barra segun el porcenaje de objetivo conseguido-->
    <!--Se añade una sutil animacion al entrar en la pagina -->
  </div>
</template>

<script>
// Importo la clase FuncionesAuxiliares
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import Usuario from "../clases/Usuario.js";
import ResumenAsignaturas from "../componentes/ResumenAsignaturas.vue";
import ResumenGeneral from "../componentes/ResumenGeneral.vue";

export default {
  name: "Resumen",
  // Para incluir el componente Resumen asignaturas
  components: {
    ResumenAsignaturas,
    ResumenGeneral
  },
  /* Creamos la función 'data' */
  data: function() {
    return {
      // Pestaña
      tabObjetivos: "general",
      tiempoTotal: this.total()
    };
  },
  methods: {
    userHasSwiped(obj) {
      // Si el gesto no dura un minimo, lo quitamos
      if (obj.duration < 100) {
        return;
      }
      // Comprobamos direccion del gesto y actuamos
      if (obj.direction === "left") {
        this.$router.push("/Cronometro");
      }
    },
    total: function() {
      const calculoTotal = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .tiempoTotalEstudio();
      return FuncionesAuxiliares.segundosToText(calculoTotal);
    }
  },
  /* Creamos variables 'computadas' que hacen un cálculo cada vez que entramos en el
  componente, dándonos los datos de tiempos de estudios siempre actualizados */
  computed: {}
};
</script>

<!-- Aquí hacemos uso de la etiqueta 'style' usando lenguaje 'SASS'
 para dar algún formato más al html de arriba. Al indicar 'scoped'
 nos aseguramos que sólo afectará a este componente y ninguno más. -->
<style lang="sass" scoped>
.horas
  margin-top: 67px
  text-align: right
  margin-right: 55px

</style>