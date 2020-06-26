<!-- Componente que mostrará la Configuracion de Pomodoro -->
<template>
  <q-card flat>
    <q-intersection transition="fade">
      <div v-if="hayObjetivos == false">
        <div class="q-my-md">
          <div class="text-h6 text-center text-black Oswald">No hay objetivos para las asignaturas,<br>¡Crea uno desde la pestaña de Plan!</div>
        </div>
      </div>
      <div v-else>
        <div class="q-my-md" v-for="asig in misAsig" :key="asig.nombre">
          <div v-if="asig.objetivo!=null">
            <!-- Caso objetivo diario -->
            <div v-if="asig.objetivo.frecuencia==='diario'">
              <div class="row justify-between">
                <div class="col-4 text-body1 text-left text-black Oswald">
                  {{asig.nombre}}
                </div>
                <div class="col-4 text-body1 text-right text-grey-7 Oswald">
                  Objetivo: {{asig.objetivo.duracion}} horas
                </div>
              </div>
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
              <div class="row justify-between">
                <div class="col-4 text-body1 text-left text-black Oswald">
                  {{asig.nombre}}
                </div>
                <div class="col-4 text-body1 text-right text-grey-7 Oswald">
                  Objetivo: {{asig.objetivo.duracion}} horas
                </div>
              </div>
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
              <div class="row justify-between">
                <div class="col-4 text-body1 text-left text-black Oswald">
                  {{asig.nombre}}
                </div>
                <div class="col-4 text-body1 text-right text-grey-7 Oswald">
                  Objetivo: {{asig.objetivo.duracion}} horas
                </div>
              </div>
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
      misAsig: Usuario.$usuarioLocal.planEstudio.asignaturas,
      hayObjetivos: false
    };
  },
  mounted: function() {
    this.misAsig.forEach(asignatura => {
      if(asignatura.objetivo != null){
        this.hayObjetivos = true;
      }
    });
  },
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