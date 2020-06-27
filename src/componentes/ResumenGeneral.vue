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
          <q-linear-progress size="20px" :value="progressSemana" color="light-blue-3">
            <div class="absolute-full flex flex-center">
              <!--He dejado el fondo blanco por si os parece que se ve más 
                claro, pero se puede dejar como el de arriba, cambiando el atributo
              color de q-badge de white a cyan-3-->
              <q-badge color="light-blue-3" text-color="blue-grey-10 Oswald">{{tiempoSemana}}</q-badge>
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
          <q-linear-progress size="20px" :value="progressMes" color="light-blue-3">
            <div class="absolute-full flex flex-center">
              <q-badge color="light-blue-3" text-color="blue-grey-10 Oswald">{{tiempoMes}}h</q-badge>
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
      // Tenemos la fecha de hoy, semana y mes
      tiempoHoy: FuncionesAuxiliares.segundosToText(this.hoy()),
      tiempoSemana: FuncionesAuxiliares.segundosToText(this.semana()),
      tiempoMes: FuncionesAuxiliares.segundosToText(this.mes()),
      // Tenemos el objetivo de Hoy, Semana y Mes
      objetivoHoy: this.getObjetivoDiario(),
      objetivoSemana: this.getObjetivoSemanal(),
      objetivoMes: this.getObjetivoMensual()
    };
  },
  mounted: function() {},
  methods: {
    // Metodo que devuelve el objetivo general de hoy
    getObjetivoDiario() {
      let listaObjetivos = Usuario.$usuarioLocal.planEstudio.objetivos;
      // Recorremos los objetivos generales y devolvemos el diario
      for (let x in listaObjetivos) {
        let objetivo = listaObjetivos[x];
        if (objetivo.frecuencia === "diario") {
          return objetivo.duracion;
        }
      }
      // Si no lo encuentra, pone un 0h
      return 0;
    },
    // Metodo que devuelve el objetivo general de esta semana
    getObjetivoSemanal() {
      let listaObjetivos = Usuario.$usuarioLocal.planEstudio.objetivos;

      // Recorremos los objetivos generales y devolvemos el semanal
      for (let x in listaObjetivos) {
        let objetivo = listaObjetivos[x];
        if (objetivo.frecuencia === "semanal") {
          return objetivo.duracion;
        }
      }

      // Si no lo encuentra, pone un 0h
      return 0;
    },
    // Metodo que devuelve el objetivo general de este mes
    getObjetivoMensual() {
      let listaObjetivos = Usuario.$usuarioLocal.planEstudio.objetivos;

      
      // Recorremos los objetivos generales y devolvemos el mensual
      for (let x in listaObjetivos) {
        let objetivo = listaObjetivos[x];
        if (objetivo.frecuencia === "mensual") {
          return objetivo.duracion;
        }
      }
      // Si no lo encuentra, pone un 0h
      return 0;
    },
    // Funcion que devuelve el tiempo estudiado hoy
    hoy: function() {
      const ahora = new Date();
      // Obtenemos las sesiones de estudio de hoy
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesDia(ahora);
      let sumaSegundos = 0;
      // Sumamos los segundos de todas las sesiones de estudios
      arraySesiones.forEach(sesion => {
        sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        );
      });
      return sumaSegundos;
    },
    // Funcion que devuelve el tiempo estudiado esta semana
    semana: function() {
      const ahora = new Date();
      // Obtenemos las sesiones de estudio de esta semana
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesSemana(ahora);
      let sumaSegundos = 0;
      // Sumamos los segundos de todas las sesiones de estudios
      arraySesiones.forEach(sesion => {
        sumaSegundos += FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        );
      });
      return sumaSegundos;
    },
    // Funcion que devuelve el tiempo estudiado esta mes
    mes: function() {
      const ahora = new Date();
      // Obtenemos las sesiones de estudio de ese mes
      const arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesionesMes(ahora);
      let sumaSegundos = 0;
      // Sumamos los segundos de todas las sesiones de estudios
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