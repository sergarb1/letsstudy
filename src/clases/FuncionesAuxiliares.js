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
    // Si no existia en localStorage usuarioLocal por ser la primera vez, creamos el objeto con nuestro constructor
    if (!localStorage["usuarioLocal"]) {
      Usuario.$usuarioLocal = new Usuario("User");
    }
    // Caso de que existe
    else {

      //traemos los datos desde localStorage y los ponemos en formato
      //json para trabajar con ellos.
      let datos = JSON.parse(localStorage.getItem("usuarioLocal"));

      // creamos el usuario

      Usuario.$usuarioLocal = new Usuario(datos.nombre);
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
      customClass: 'bg-primary',
      spinnerSize: 250, // in pixels    
      spinnerColor: 'yellow',
    });
    //Tras 3 segundos se ocultara
    setTimeout(function () {
      Loading.hide();
    }, 3000);

  }

  //Función que recibe el tiempo de inicio y fin del cronómetro y devuelve un array
  //con las sesiones. Si el tiempo pasa de las 00:00h, se crean dos sesiones, hasta
  //las 00:00h y otra a partir de las 00:00h
  static sesionesTiempoCronometro(inicio, fin) {
    //Array de sesiones que devolveremos
    let arraySesiones = [];
    //Tiempo en milisegundos entre fecha inicio y fecha fin
    let tiempoSesion = fin.getTime() - inicio.getTime();
    //00:00h del día de inicio de la sesión
    let doceHoras = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate(),
      23, 59, 59).getTime();

    //Si el tiempo de sesion es superior al tiempo entre el inicio y las doce se
    //deben hacer dos sesiones
    if (tiempoSesion > doceHoras - inicio.getTime()) {
      //Primera sesión desde el inicio hasta las 23:59:59 creada antes
      let sesion1 = new SesionEstudio(inicio, new Date(doceHoras));
      //Segunda sesión desde las 00:00:00 hasta la fecha de fin
      let sesion2 = new SesionEstudio(new Date(doceHoras + 1000), fin);

      arraySesiones.push(sesion1);
      arraySesiones.push(sesion2);
    } else {
      let sesion1 = new SesionEstudio(inicio, fin);
      arraySesiones.push(sesion1);
    }

    return arraySesiones;
  }

  //Función para establecer como máximo x horas de estudio seguidas en una sesión
  //Recibe el tiempo máximo en horas de estudio, una hora de inicio, de fin, y devuelve la hora de fin correcta 
  static tiempoMaximoSesion(horasMax, inicio, fin) {
    //Las horas en milisegundos
    let horasMil = horasMax * 3600000;
    //Tiempo de la sesion en milisegundos
    let tempSesion = fin.getTime() - inicio.getTime();

    //Si el tiempo de la sesión es menor que x Horas, devuelve el fin que se pasó por parametro
    if (tempSesion < horasMil) {
      return fin;
    } else {
      //Si no devuelve el inicio de la sesión + el tiempo máximo
      return new Date(inicio.getTime() + horasMil);
    }

  }

}
//a partir de dos fechas crea array con una o dos sesiones
function deFechaASesiones(initDate, endDate) {
  //comprueba si me pasan un String o un objeto Date y devuelve el objeto Date
  let toDate = fecha => {
    let isDate = fecha instanceof Date ? true : false;
    return isDate ? fecha : new Date(fecha);
  }
  let fechaInicio = toDate(initDate);
  let fechaFin = toDate(endDate);
  //comprueba si están en el mismo día o no 
  //(damos por hecho que no vamos a dejar que una sesión dure más de un día
  //si pudiera haber sesiones de un mes habria que comprobar otras cosas)
  if (fechaInicio.getDate() == fechaFin.getDate()) {
    //si es igual devuelve un array con la sesión sin más.
    return [new SesionEstudio(fechaInicio, fechaFin)];
  } else {
    //si no es igual... 
    //creamos una funcion que nos genere una fecha de fin (al final del dia) a partir de la fecha de inicio.
    let generaFechaFinSesion = fecha => new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 23, 59, 59);
    //creamos otra función que a partir de una fecha de inicio, sumandole 1 segundo a la fecha fin,
    // te de el inicio del dia siguiente.
    let generaFechaInicioSesion = fecha => new Date(generaFechaFinSesion(fecha).getTime() + 1000);
    //creamos la sesion del primer dia
    let sesion1 = new SesionEstudio(fechaInicio, generaFechaFinSesion(fechaInicio));
    //y creamos la del segundo
    let sesion2 = new SesionEstudio(generaFechaInicioSesion(fechaInicio), fechaFin);
    //y devuelve el array
    return [sesion1, sesion2];
  }
}

// Esto si lo comentais para probar, luego des-comentarlo
export default FuncionesAuxiliares
