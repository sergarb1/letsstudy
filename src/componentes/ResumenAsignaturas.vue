<!-- Componente que mostrará la Configuracion de Pomodoro -->
<template>
  <q-card flat>
    <q-intersection transition="fade">
      <div class="q-my-md" v-for="asig in misAsig" :key="asig.nombre">
        <div v-if="asig.objetivo!=null">
          <div class="text-body1 text-left text-black Oswald">{{asig.nombre}}</div>
          <!-- Caso objetivo diario -->
          <div v-if="asig.objetivo.frecuencia==='diario'">
            <div
              class="text-body1 text-right text-grey-7 Oswald"
            >Objetivo: {{asig.objetivo.duracion}} horas</div>
            <div>
              <q-linear-progress size="20px" :value="hoyAsignatura(asig.nombre)/(asig.objetivo.duracion*3600)" color="light-blue-3">
                <div class="absolute-full flex flex-center">
                  <q-badge color="light-blue-3" class="Oswald" text-color="blue-grey-10">{{secToText(hoyAsignatura(asig.nombre))}}h</q-badge>
                </div>
              </q-linear-progress>
            </div>
          </div>
          <!-- Fin caso objetivo diario -->
          <!-- Caso objetivo senana -->
          <div v-if="asig.objetivo.frecuencia==='semanal'">
            <div
              class="text-body1 text-right text-grey-7 Oswald"
            >Objetivo: {{asig.objetivo.duracion}} horas</div>
            <div>
              <q-linear-progress size="20px" :value="semanaAsignatura(asig.nombre)/(asig.objetivo.duracion*3600)" color="light-blue-3">
                <div class="absolute-full flex flex-center">
                  <q-badge color="light-blue-3" class="Oswald" text-color="blue-grey-10">{{secToText(semanaAsignatura(asig.nombre))}}h</q-badge>
                </div>
              </q-linear-progress>
            </div>
          </div>
          <!-- Fin caso objetivo semana -->
          <!-- Caso objetivo mes -->
          <div v-if="asig.objetivo.frecuencia==='mensual'">
            <div
              class="text-body1 text-right text-grey-7 Oswald"
            >Objetivo: {{asig.objetivo.duracion}} horas</div>
            <div>
              <q-linear-progress size="20px" :value="mesAsignatura(asig.nombre)/(asig.objetivo.duracion*3600)" color="light-blue-3">
                <div class="absolute-full flex flex-center">
                  <q-badge color="light-blue-3" class="Oswald" text-color="blue-grey-10">{{secToText(mesAsignatura(asig.nombre))}}h</q-badge>
                </div>
              </q-linear-progress>
            </div>
          </div>
          <!-- Fin caso objetivo mes -->
        </div>
      </div>
    </q-intersection>
  </q-card>
</template>
<script>
import Usuario from "../clases/Usuario";
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares";
export default {
  name: "ResumenAsignaturas",
  data() {
    return {
      misAsig: Usuario.$usuarioLocal.planEstudio.asignaturas
    };
  },
  mounted: function() {},
  methods: {
    hoyAsignatura: function(nombreAsig) {
      const ahora = new Date();
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesDia(ahora);
      let sumaSegundos = 0;
      arraySesiones.forEach(sesion => {
        if (
          sesion.asignatura != null &&
          sesion.asignatura.nombre === nombreAsig
        ) {
          sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
            sesion.getFinSesion(),
            sesion.getInicioSesion()
          );
        }
      });
      return sumaSegundos;
    },
    semanaAsignatura: function(nombreAsig) {
      const ahora = new Date();
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesSemana(ahora);
      let sumaSegundos = 0;
      arraySesiones.forEach(sesion => {
        if (
          sesion.asignatura != null &&
          sesion.asignatura.nombre === nombreAsig
        ) {
          sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
            sesion.getFinSesion(),
            sesion.getInicioSesion()
          );
        }
      });
      return sumaSegundos;
    },
    mesAsignatura: function(nombreAsig) {
      const ahora = new Date();
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesMes(ahora);
      let sumaSegundos = 0;
      arraySesiones.forEach(sesion => {
        if (
          sesion.asignatura != null &&
          sesion.asignatura.nombre === nombreAsig
        ) {
          sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
            sesion.getFinSesion(),
            sesion.getInicioSesion()
          );
        }
      });
      return sumaSegundos;
    },
    secToText: function (tiempo){
      return FuncionesAuxiliares.segundosToText(tiempo);
    }
  }
};
</script>