<!-- Componente que mostrará la Configuracion de Pomodoro -->
<template>
  <q-card flat>
    <q-intersection transition="fade">
      <div class="q-my-md">
        <div class="row justify-between">
          <div class="col-3 text-body1 text-left text-black Oswald">
            Día
          </div>
          <div class="col-5 text-body1 text-right text-grey-7 Oswald">
            Objetivo: {{objetivoHoy}} horas
          </div>
        </div>
        <div>
          <q-linear-progress size="20px" :value="progressDia" color="light-blue-3">
            <div class="absolute-full flex flex-center">
              <q-badge
                color="light-blue-3"
                class="Oswald"
                text-color="blue-grey-10"
              >{{ tiempoHoy }}h</q-badge>
            </div>
          </q-linear-progress>
        </div>
      </div>
      <div class="q-my-md">
        <div class="row justify-between">
          <div class="col-3 text-body1 text-left text-black Oswald">
            Semana
          </div>
          <div class="col-5 text-body1 text-right text-grey-7 Oswald">
            Objetivo: {{objetivoSemana}} horas
          </div>
        </div>
        <div>
          <q-linear-progress size="20px" :value="progressSemana" color="cyan-3">
            <div class="absolute-full flex flex-center">
              <!--He dejado el fondo blanco por si os parece que se ve más 
                claro, pero se puede dejar como el de arriba, cambiando el atributo
              color de q-badge de white a cyan-3-->
              <q-badge color="cyan-3" text-color="blue-grey-9 Oswald">{{tiempoSemana}}</q-badge>
            </div>
          </q-linear-progress>
        </div>
      </div>
      <div class="q-my-md">
        <div class="row justify-between">
          <div class="col-3 text-body1 text-left text-black Oswald">
            Mes
          </div>
          <div class="col-5 text-body1 text-right text-grey-7 Oswald">
            Objetivo: {{objetivoMes}} horas
          </div>
        </div>
        <div>
          <q-linear-progress size="20px" :value="progressMes" color="teal-3">
            <div class="absolute-full flex flex-center">
              <q-badge color="cyan-3" text-color="blue-grey-9 Oswald">{{tiempoMes}}h</q-badge>
            </div>
          </q-linear-progress>
        </div>
      </div>
    </q-intersection>
  </q-card>
</template>
<script>
import Usuario from "../clases/Usuario";
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares";
export default {
  name: "ResumenGeneral",
  data() {
    return {
      //progreso de las barras de dia, semana, mes
      progressDia: this.hoy() / (this.getObjetivoDiario() * 3600),
      progressSemana: this.semana() / (this.getObjetivoSemanal() * 3600),
      progressMes: this.mes() / (this.getObjetivoMensual() * 3600),

      tiempoHoy: FuncionesAuxiliares.segundosToText(this.hoy()),
      tiempoSemana: FuncionesAuxiliares.segundosToText(this.semana()),
      tiempoMes: FuncionesAuxiliares.segundosToText(this.mes()),

      objetivoHoy: this.getObjetivoDiario(),
      objetivoSemana: this.getObjetivoSemanal(),
      objetivoMes: this.getObjetivoMensual()
    };
  },
  mounted: function() {},
  methods: {
    //Métodos que recogen el objetivo correspondiente
    //Si lo encuentra, establece la variable como el tiempo + h
    getObjetivoDiario() {
      let listaObjetivos = Usuario.$usuarioLocal.planEstudio.objetivos;
      for (let x in listaObjetivos) {
        let objetivo = listaObjetivos[x];
        if (objetivo.frecuencia === "diario") {
          return objetivo.duracion;
        }
      }
      // Si no lo encuentra, pone un 0h
      return 0;
    },
    getObjetivoSemanal() {
      let listaObjetivos = Usuario.$usuarioLocal.planEstudio.objetivos;

      for (let x in listaObjetivos) {
        let objetivo = listaObjetivos[x];
        if (objetivo.frecuencia === "semanal") {
          return objetivo.duracion;
        }
      }

      // Si no lo encuentra, pone un 0h
      return 0;
    },
    getObjetivoMensual() {
      let listaObjetivos = Usuario.$usuarioLocal.planEstudio.objetivos;
      for (let x in listaObjetivos) {
        let objetivo = listaObjetivos[x];
        if (objetivo.frecuencia === "mensual") {
          return objetivo.duracion;
        }
      }
      // Si no lo encuentra, pone un 0h
      return 0;
    },
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
      return sumaSegundos;
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
      return sumaSegundos;
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
      return sumaSegundos;
    }
  }
};
</script>