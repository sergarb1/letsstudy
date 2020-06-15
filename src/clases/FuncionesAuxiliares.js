// Definición de clase para funciones auxiliares estáticas

import Usuario from './Usuario';

class FuncionesAuxiliares {

  // Convierte una cantidad de segundos a formato texto 'hh:mm:ss'
  // s: segundos (nº entero) entre 0 y 86399
  // return: cadena de texto entre '00:00:00' y '23:59:59', null si 's' no es válido
  static segundosToText(s) {
    // Controlamos los límites posibles de los datos y nos aseguramos que sea un número entero
    if (s < 0 || s > 86399 || !Number.isInteger(s)) return null

    let segundos = '00'
    let minutos = '00'
    let horas = '00'

    // Con esta asignación nos aseguramos que siempre devuelva un cero primero si es un valor inferior a 10
    segundos = ('0' + s % 60).slice(-2)

    if (s >= 60) {
      s = parseInt(s / 60)
      minutos = ('0' + s % 60).slice(-2)

      if (s >= 60) {
        s = parseInt(s / 60)
        horas = ('0' + s % 60).slice(-2)
      }
    }

    return horas + ":" + minutos + ":" + segundos
  }

  // Devuelve los minutos que han pasado entre dos fechas, truncado
  static minutosEntreFechas(fechaA, fechaB) {
    let dateA = new Date(fechaA).getTime();
    let dateB = new Date(fechaB).getTime();
    let difS = Math.abs(dateA - dateB);
    let toMin = difS / 60000;
    return Math.trunc(toMin);
  }

  // Devuelve los segundos que han pasado entre dos fechas, truncado
  static segundosEntreFechas(fechaA, fechaB) {
    let dateA = new Date(fechaA).getTime();
    let dateB = new Date(fechaB).getTime();
    let difS = Math.abs(dateA - dateB);
    let toSecs = difS / 1000;
    return Math.trunc(toSecs);
  }
  //guarda el estado del usuario
  static guardarEstadoLocalStorage(user) {
    //Transformamos los datos del usuario a formato JSON 
    let jUser = JSON.stringify(user);
    //guardamos el objeto (json friendly) con la clave "usuario"
    localStorage.setItem("usuario", jUser);
    alert("Guardado" + JSON.parse(localStorage.getItem("usuario")).nombre);
  }
  //Funcion que restaura los datos de usuario a partir de la key de localStorage y devuelve el usuario
  static restaurarEstadoLocalStorage(userKey) {
    //traemos los datos desde localStorage y los ponemos en formato
    //json para trabajar con ellos.
    let datos = JSON.parse(localStorage.getItem(userKey));
    // creamos el usuario
    let usuario = new Usuario(datos.nombre);
    //le asignamos el estado de sesion
    // si no es null lo asignamos como fecha.
    usuario.sesionEstudioIniciada = (datos.sesionEstudioIniciada != null) ? new Date(datos.sesionEstudioIniciada) : null;
    //Le asignamos sus sesiones
    let datosDeSesiones = datos.coleccionSesiones.arraySesionesEstudio;
    for (let i = 0; i < datosDeSesiones; i++) {
      //establecemos la fecha de inicio  y fin
      let tempInitDate = new Date(datosDeSesiones[i].inicioSesion);
      let tempEndDate = new Date(datosDeSesiones[i].finSesion);
      //re-creamos la sesion
      let tempSesion = new SesionEstudio(tempInitDate,tempEndDate);
      //la añadimos a la coleccion
      usuario.coleccionSesiones.addSesion(tempSesion);
    }
    return usuario;
  }

}

// Esto si lo comentais para probar, luego des-comentarlo
export default FuncionesAuxiliares