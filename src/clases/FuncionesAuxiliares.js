import Usuario from './Usuario.js';
import SesionEstudio from './SesionEstudio.js';
import {
  Loading,
  QSpinnerComment
} from 'quasar';
import FrasesMotivadoras from './FrasesMotivadoras.js';
import Pomodoro from './Pomodoro.js';
import PlanEstudio from './PlanEstudio.js';
import Asignatura from './Asignatura.js';
import Objetivo from './Objetivo.js';

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

  // Devuelve los minutos que han pasado entre dos fechas (objetos Date), truncado
  static minutosEntreFechas(fechaA, fechaB) {
    let difS = Math.abs(fechaA.getTime() - fechaB.getTime());
    let toMin = difS / 60000;
    return Math.trunc(toMin);
  }

  // Devuelve los segundos que han pasado entre dos fechas (objetos Date), truncado
  static segundosEntreFechas(fechaA, fechaB) {
    let difS = Math.abs(fechaA.getTime() - fechaB.getTime());
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

      // Traemos los datos desde localStorage y los ponemos en formato
      // JSON para trabajar con ellos.
      let datos = JSON.parse(localStorage.getItem("usuarioLocal"));

      // Creamos el usuario
      Usuario.$usuarioLocal = new Usuario(datos.nombre);
      // Le asignamos el estado de sesion, si no es null lo asignamos como fecha.
      Usuario.$usuarioLocal.sesionEstudioIniciada = (datos.sesionEstudioIniciada != null) ? new Date(datos.sesionEstudioIniciada) : null;

      // Le asignamos sus sesiones
      let datosDeSesiones = datos.coleccionSesiones.arraySesionesEstudio;
      for (let i = 0; i < datosDeSesiones.length; i++) {
        // Establecemos la fecha de inicio  y fin
        let tempInitDate = new Date(datosDeSesiones[i].inicioSesion);
        let tempEndDate = new Date(datosDeSesiones[i].finSesion);
        let tempAsig = new Date(datosDeSesiones[i].asignatura);
        // Re-creamos la sesion
        let tempSesion = new SesionEstudio(tempInitDate, tempEndDate, tempAsig);
        // La añadimos a la coleccion
        Usuario.$usuarioLocal.getColeccionSesiones().addSesion(tempSesion);
      }

      // Cargamos el plan de estudios
      Usuario.$usuarioLocal.planEstudio = new PlanEstudio([], []);

      // Para cada asignatura, creamos su objetivo y lo rellenamos
      for (let x in datos.planEstudio.asignaturas) {
        // Obtenemos las propie asignatura
        let asig=datos.planEstudio.asignaturas[x];
        let tmpAsig = new Asignatura(asig.nombre,null);
        // Si no tiene objetivo, null, pero si tiene, creamos el objeto
        if (asig.objetivo === null || asig.objetivo===undefined ) {
          tmpAsig.objetivo = null;
        } else {
          // Creamos objetivo, sin asignatura
          tmpAsig.objetivo = new Objetivo(asig.objetivo.duracion, asig.objetivo.frecuencia, null);
          tmpAsig.objetivo.conseguido = asig.objetivo.conseguido;
          tmpAsig.objetivo.racha = asig.objetivo.racha;
          tmpAsig.objetivo.periodoConseguido = asig.objetivo.periodoConseguido;
          tmpAsig.objetivo.tiempoRestante = asig.objetivo.tiempoRestante;

          // Anyadimos la propia asignatura
          tmpAsig.objetivo.setAsignatura(tmpAsig);

        }
        // Preparada la asignatura, la ponemos en el plan de estudios
        Usuario.$usuarioLocal.planEstudio.addAsignatura(tmpAsig);
      }

      // Para cada objetivo, creamos su objetivo y lo rellenamos
      for (let x in datos.planEstudio.objetivos) {
        // Obtenemos las propiedades del objetivo
        let obj=datos.planEstudio.objetivos[x];
        // Creamos el objeto Objetivo a rellenar
        let tmpObj = new objetivo(obj.duracion, obj.frecuencia,null);
        tmpObj.conseguido = obj.conseguido;
        tmpObj.racha = obj.racha;
        tmpObj.periodoConseguido = obj.periodoConseguido;
        tmpObj.tiempoRestante = obj.tiempoRestante;

        // Si no tiene asignatura, null, pero si tiene, creamos el objeto
        if (obj.asignatura === null || obj.asignatura===undefined ) {
          tmpObj.asignatura = null;
        } else {
          // Creamos asignatura, sin objetivo
          tmpObj.asignatura = new Asignatura(obj.asignatura.nombre, null);

          // Anyadimos el propio objetivo a la asignatura
          tmpObj.asignatura.setObjetivo(tmpObj);
        }
        
        // Preparado el objetivo, la ponemos en el plan de estudios
        Usuario.$usuarioLocal.planEstudio.addObjetivo(tmpObj);
      }


      // Cargamos el pomodoro
      Usuario.$usuarioLocal.pomodoro = new Pomodoro();
      Usuario.$usuarioLocal.pomodoro.setNumeroCiclos(datos.pomodoro.numeroCiclos);
      Usuario.$usuarioLocal.pomodoro.setNumeroRondas(datos.pomodoro.numeroRondas);
      Usuario.$usuarioLocal.pomodoro.setDuracionRonda(datos.pomodoro.duracionRonda);
      Usuario.$usuarioLocal.pomodoro.setDuracionDescansoLargo(datos.pomodoro.duracionDescansoLargo);
      Usuario.$usuarioLocal.pomodoro.setDuracionDescansoCorto(datos.pomodoro.duracionDescansoCorto);
    }

  }

  // Añade un componente Loader a la pantalla con mensaje motivador al iniciar la pagina.
  static pantallaCargaIniciar() {
    //mostrar componente
    Loading.show({
      //configuracion del componente
      spinner: QSpinnerComment,
      message: '<h5>' + FrasesMotivadoras.getSaludoAleatorio() + '</h5>',
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

  // Función que recibe el tiempo de inicio y fin del cronómetro y devuelve un array
  // con las sesiones. Si el tiempo pasa de las 00:00h, se crean dos sesiones, hasta
  // las 00:00h y otra a partir de las 00:00h
  static sesionesTiempoCronometro(inicio, fin, asig) {
    // Array de sesiones que devolveremos
    let arraySesiones = [];
    // Tiempo en milisegundos entre fecha inicio y fecha fin
    let tiempoSesion = fin.getTime() - inicio.getTime();
    // 00:00h del día de inicio de la sesión
    let doceHoras = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate(),
      23, 59, 59).getTime();

    // Si el tiempo de sesion es superior al tiempo entre el inicio y las doce se
    // deben hacer dos sesiones
    if (tiempoSesion > doceHoras - inicio.getTime()) {
      // Primera sesión desde el inicio hasta las 23:59:59 creada antes
      let sesion1 = new SesionEstudio(inicio, new Date(doceHoras), asig);
      // Segunda sesión desde las 00:00:00 hasta la fecha de fin
      let sesion2 = new SesionEstudio(new Date(doceHoras + 1000), fin, asig);

      arraySesiones.push(sesion1);
      arraySesiones.push(sesion2);
    } else {
      let sesion1 = new SesionEstudio(inicio, fin, asig);
      arraySesiones.push(sesion1);
    }

    return arraySesiones;
  }

  // Función para establecer como máximo x horas de estudio seguidas en una sesión
  // Recibe el tiempo máximo en horas de estudio, una hora de inicio, de fin, y devuelve la hora de fin correcta 
  static tiempoMaximoSesion(horasMax, inicio, fin) {
    // Las horas en milisegundos
    let horasMil = horasMax * 3600000;
    // Tiempo de la sesion en milisegundos
    let tempSesion = fin.getTime() - inicio.getTime();

    // Si el tiempo de la sesión es menor que x Horas, devuelve el fin que se pasó por parametro
    if (tempSesion < horasMil) {
      return fin;
    } else {
      // Si no devuelve el inicio de la sesión + el tiempo máximo
      return new Date(inicio.getTime() + horasMil);
    }

  }

  // Devuelve un numero entero aleatorio entre min y max, ambos incluidos
  static numeroAleatorio(min, max) {
    return Math.floor(min + (Math.random() * (max - min + 1)))
  }
}

// Para que se posible importar la clase
export default FuncionesAuxiliares
