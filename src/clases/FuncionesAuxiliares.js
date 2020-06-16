import Usuario from './Usuario.js';
import SesionEstudio from './SesionEstudio.js';
import {
  Loading,
  QSpinnerComment
} from 'quasar';
import FrasesMotivadoras from './FrasesMotivadoras.js';

// Definición de clase para funciones auxiliares estáticas
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

  // Guarda la variable estatica Usuario.$usuarioLocal en LocalStorage
  static guardarEstadoLocalStorage() {
    localStorage.setItem("usuarioLocal", JSON.stringify(Usuario.$usuarioLocal));
  }
  // Restaura la variable estatica Usuario.$usuarioLocal desde LocalStorage
  static restaurarEstadoLocalStorage() {


    //traemos los datos desde localStorage y los ponemos en formato
    //json para trabajar con ellos.
    let datos = JSON.parse(localStorage.getItem("usuarioLocal"));

    // Si no existia en localStorage usuarioLocal por ser la primera vez, creamos el objeto con nuestro constructor
    if (!localStorage["usuarioLocal"]) {
      Usuario.$usuarioLocal = new Usuario("User");
    } else {
      // creamos el usuario
      Usuario.$usuarioLocal = new Usuario(datos.nombre);
    }
    //le asignamos el estado de sesion
    // si no es null lo asignamos como fecha.
    Usuario.$usuarioLocal.sesionEstudioIniciada = (datos.sesionEstudioIniciada != null) ? new Date(datos.sesionEstudioIniciada) : null;
    //Le asignamos sus sesiones
    let datosDeSesiones = datos.coleccionSesiones.arraySesionesEstudio;
    for (let i = 0; i < datosDeSesiones.length; i++) {
      //establecemos la fecha de inicio  y fin
      let tempInitDate = new Date(datosDeSesiones[i].inicioSesion);
      let tempEndDate = new Date(datosDeSesiones[i].finSesion);
      //re-creamos la sesion
      let tempSesion = new SesionEstudio(tempInitDate, tempEndDate);
      //la añadimos a la coleccion
      Usuario.$usuarioLocal.getColeccionSesiones().addSesion(tempSesion);
    }
  }
  //añade un componente Loader a la pantalla con mensaje motivador al iniciar la pagina.
  static pantallaCargaIniciar() {
    //mostrar componente
    Loading.show({
      //configuracion del componente
      spinner: QSpinnerComment,
      message: '<h5>' + FrasesMotivadoras.mostrarSaludo() + '</h5>',
      messageColor: 'white',
      backgroundColor: 'primary',
      spinnerSize: 250, // in pixels    
      spinnerColor: 'yellow',
    });
    //Tras 4 segundos se ocultara
    setTimeout(function () {
      Loading.hide();
    }, 4000);

  }

}

// Esto si lo comentais para probar, luego des-comentarlo
export default FuncionesAuxiliares
