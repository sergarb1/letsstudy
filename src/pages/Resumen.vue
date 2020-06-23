<!-- Otro componente Vue, que mostrará la página de las
estadísticas de tiempo de estudio del usuario -->
<template>
  <div class="q-pa-md col-8 q-gutter-md" v-touch-swipe.mouse.horizontal="userHasSwiped">
    <div class="flex column total_estudiado">
      <!--Muestra el total estudiado-->
      <div class="text-h5 text-white horas">{{ total }}</div>
      <!-- falta enlazar objetivo,
      de momento está con texto para ver como queda-->
      <div class="text-subtitle2 objetivo text-grey-8">120H</div>
    </div>
    <!--Botones para ir cambiando a las vistas: por totales o por asignaturas
    y botón de settings que lleva al plan de estudio-->
    <div class="flex flex-center q-gutter-md">
      <q-btn 
        align="between" 
        class="btn-fixed-width" 
        color="yellow-14" 
        label="TOTALES" 
        clickable to="PlanEstudio"
      />
      <!--falta configurar totales por asignaturas-->
      <q-btn 
        align="between" 
        class="btn-fixed-width" 
        color="teal-9" 
        label="ASIGNATURAS" 
      />
      <!--boton de settings que lleva a plan de estudio-->
      <q-btn 
        align="between" 
        class="btn-fixed-width" 
        color="grey-8" 
        icon="settings" 
        clickable to="PlanEstudio"
        />
    </div>
    <!-- Faltaría enlazar los objetivos. De momento he enlazado dia, 
    semana y mes. También faltaría configurar el avance de la 
    barra segun el porcenaje de objetivo conseguido-->
    <!--Se añade una sutil animacion al entrar en la pagina -->
    <q-intersection transition="fade">
      <div class="q-mb-sm">
          <div class="text-h6">Estudiado hoy</div>
          <div class="text-body1 text-right text-grey-7">Objetivo: 2 horas</div>
          <div>
            <q-linear-progress size="20px" :value="progress" color="light-blue-3">
              <div class="absolute-full flex flex-center">
                <q-badge color="light-blue-3" text-color="blue-grey-10">
                  {{hoy}}h
                </q-badge>
              </div>
            </q-linear-progress>
          </div>
      </div>
      <div class="q-mb-sm">
          <div class="text-h6">Semana</div>
          <div class="text-body1 text-right text-grey-7">Objetivo: 15 horas</div>
          <div>
            <q-linear-progress size="20px" :value="progress1" color="cyan-3">
              <div class="absolute-full flex flex-center">
                <!--He dejado el fondo blanco por si os parece que se ve más 
                claro, pero se puede dejar como el de arriba, cambiando el atributo
                color de q-badge de white a cyan-3-->
                <q-badge color="white" text-color="blue-grey-9">
                  {{semana}}
                </q-badge>
              </div>
            </q-linear-progress>
          </div>
      </div>
      <div class="q-mb-sm">
          <div class="text-h6">Mes</div>
          <div class="text-body1 text-right text-grey-7">Objetivo: 80 horas</div>
          <div>
            <q-linear-progress size="20px" :value="progress2" color="teal-3">
              <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="blue-grey-9">
                  {{mes}}h
                </q-badge>
              </div>
            </q-linear-progress>
          </div>
      </div>
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
    return { 
      //progreso de las barras de dia, semana, mes
      progress: 0.65,
      progress1: 0.75,
      progress2: 0.20 };
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
.total_estudiado
  height: 200px
  width: 250px
  background-image: url("~assets/logo_totales.png")
  background-repeat: no-repeat
  margin: 0 auto
  .horas
    margin-top: 67px
    text-align: right
    margin-right: 55px
  .objetivo
    text-align: right
    margin-right: 50px
    margin-top: 5px
</style>