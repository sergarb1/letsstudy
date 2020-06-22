// Importamos los modulos necesarios
import FuncionesAuxiliares from "./FuncionesAuxiliares.js"

// La clase Objetivo representa un objetivo de tiempo de estudio a alcanzar.
class Objetivo {
  constructor(duracion = 2, frecuencia = 'diario', asignatura = null) {
    // Tiempo de estudio a alcanzar (minutos)
    this.duracion = duracion
    // Frecuencia del objetivo. Puede ser 'diario', 'semanal' o 'mensual'
    this.frecuencia = frecuencia
    // Nombre de la asignatura
    this.asignatura = asignatura
    // Si se ha conseguido el objetivo (true/false)
    this.conseguido = false
    // Cuantas veces seguidas se ha conseguido (nº entero)
    this.racha = 0
    // ?????
    this.periodoConseguido = null
    // Tiempo restante hasta alcanzar objetivo (minutos)
    this.tiempoRestante = this.duracion
  }

  getDuracion() {
    return this.duracion
  }
  setDuracion(tiempo) {
    this.duracion = tiempo
  }

  getFrecuencia() {
    return this.frecuencia
  }
  setFrecuencia(tiempo) {
    this.frecuencia = tiempo
  }

  getAsignatura() {
    return this.asignatura
  }
  setAsignatura(asignatura) {
    this.asignatura = asignatura
  }

  getIsConseguido() {
    return this.conseguido
  }
  getRacha() {
    return this.racha
  }
  getPeriodoConseguido() {
    return this.periodoConseguido
  }
  getTiempoRestante() {
    return this.tiempoRestante
  }

  // Método auxiliar para calcular nº semana del año
  getNumSemana(d) {
    d.setHours(0, 0, 0, 0); //Nos aseguramos de limpiar la hora.
    d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
    //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
  }

  // Método a ejecutar después de cada sesión de estudio
  update(coleccionDeSesiones) {
    this.conseguido = false  // inicializamos siempre a false
    const sesiones = null;
    const periodo = null;
    const ahora = new Date()  // indicamos la fecha de hoy
    // Según la frecuencia calculamos las sesiones a tener en cuenta y el periodo que estamos tratando
    switch (this.frecuencia) {
      case 'diario':
        sesiones = coleccionDeSesiones.getSesionesDia(ahora)
        periodo = ahora.getDate()  // número del día
      case 'semanal':
        sesiones = coleccionDeSesiones.getSesionesSemana(ahora)
        periodo = this.getNumSemana(ahora)  // número de la semana (año)
      case 'mensual':
        sesiones = coleccionDeSesiones.getSesionesMes(ahora)
        periodo = ahora.getMonth()  // número del mes
    }
    // Sumamos el tiempo y calculamos el tiempoRestante
    this.tiempoRestante = this.duracion // inicializamos siempre tiempoRestante a duracion
    let sumaTiempo = 0
    if(this.getAsignatura() === null) {  // si el objetivo no pertenece a ninguna asignatura se cogerán todas las sesiones
      sesiones.forEach(sesion => {
        sumaTiempo += FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        )
      })
    } else {  // si el objetivo está asignado a una asignatura, sólo se cogerán las sesiones de esa asignatura
      sesiones.forEach(sesion => {
        sumaTiempo += sesion.getAsignatura() === this.getAsignatura() ? FuncionesAuxiliares.segundosEntreFechas(
          sesion.getFinSesion(),
          sesion.getInicioSesion()
        ) : 0
      })
    }
    this.tiempoRestante -= sumaTiempo / 60 // pasamos sumatiempo a minutos y restamos de tiempoRestante

    // si se cumple el objetivo
    if (this.tiempoRestante <= 0) {
        // si NO se había conseguido antes o se consiguió el periodo justo anterior
      if (this.periodoConseguido == null || (periodo - this.periodoConseguido == 1)) {
        this.conseguido = true  // conseguido!
        this.periodoConseguido = periodo  // registramos periodo de consecución
        this.racha += 1  // aumentamos la racha en uno
        // si se consiguió hace más de un periodo atrás
      } else if (periodo - this.periodoConseguido > 1) {
        this.conseguido = true  // conseguido
        this.periodoConseguido = periodo  // registramos periodo de consecución
        this.racha = 1  // la racha queda en uno
      }
    // si NO se cumple el objetivo y ha pasado más de un periodo desde que se cumplió
    } else if (this.tiempoRestante > 0 && (periodo - this.periodoConseguido > 1)) {
      this.racha = 0  // anulamos la racha
    }

    return this.getIsConseguido // si true notificar CONSEGUIDO! YA LLEVAS racha VECES SEGUIDAS CONSEGUIDO
  }
}

export default Objetivo;

/**Hay que tener en cuenta que el cálculo del objetivo se realiza después de casa sesión. En ese momento
 * puede haber acabado el periodo de duración del objetivo o no, que és lo que determina la racha.
 * - Si se cumple y no se había cumplido anteriormente o se cumplió justo el periodo anterior, aumentamos la racha.
 * - Si se cumple y se había cumplido hace más de un periodo atrás, quiere decir que nos hemos pasado un periodo
 *   sin hacer sesiones, entonces la racha la establecemos en 1.
 * - Si no se cumple y ha pasado más de un periodo desde que se cumplió, quitamos la racha.
 * - Si no se cumple y, o bien estamos en el mismo periodo o ha pasado sólo 1 periodo, no hacemos
 *   nada...si había racha se mantiene y si no pues nada.
 * - Finalmente, si se cumple y estamos en el mismo periodo que se cumplió anteriormente devuelve false, pq no hace
 *   nada ya que ya se informó en su día cuando se cumplió.
 */