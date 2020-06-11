// Definición de clase para funciones auxiliares estáticas

class FuncionesAuxiliares {

    // Función que toma una cantidad de segundos y devuelve una cadena
    // que representa el tiempo en hh:mm:ss
    static segundosToText(s) {

        if (s < 0 || s > 86399) return null

        let segundos = '00'
        let minutos = '00'
        let horas = '00'
      
        segundos = ('0' + s % 60).slice(-2)
      
        if (s > 60) {
      
          s = parseInt(s / 60)
      
          minutos = ('0' + s % 60).slice(-2)
      
          if (s > 60) {
      
            s = parseInt(s / 60)
      
            horas = ('0' + s % 60).slice(-2)
      
          }
      
        }
      
        return horas + " : " + minutos + " : " + segundos
      
      }

      //calcula los minutos que han pasado entre dos fechas, redondeando.
      static minutosEntreFechas(fechaA,fechaB){
        let dateA = new Date(fechaA).getTime();
        let dateB = new Date(fechaB).getTime();
        let difS = Math.abs(dateA-dateB);
        let toMin = difS/60000;
        return Math.round(toMin);
      }
      //Calcula los segundos que han pasado entre dos fechas, redondeando
      static segundosEntreFechas(fechaA,fechaB){
        let dateA = new Date(fechaA).getTime();
        let dateB = new Date(fechaB).getTime();
        let difS = Math.abs(dateA-dateB);
        let toSecs = difS/1000;
        return Math.round(toSecs);
    }

}

//export default FuncionesAuxiliares

// Para test: comentar la línea del export y descomentar la siguientes líneas
/*
let tiempoEnTexto1 = FuncionesAuxiliares.segundosToText(0)
let tiempoEnTexto2 = FuncionesAuxiliares.segundosToText(3665)
let tiempoEnTexto3 = FuncionesAuxiliares.segundosToText(86399)
let tiempoEnTexto4 = FuncionesAuxiliares.segundosToText(88000)
let tiempoEnTexto5 = FuncionesAuxiliares.segundosToText(-153)

console.log(tiempoEnTexto1)
console.log(tiempoEnTexto2)
console.log(tiempoEnTexto3)
console.log(tiempoEnTexto4)
console.log(tiempoEnTexto5)
*/
/**Tests funcion minutosEntreFechas
console.log(FuncionesAuxiliares.minutosEntreFechas("2020-6-15","2021-6-15"));
console.log(FuncionesAuxiliares.minutosEntreFechas("November 12 2020 17:51","November 12 2020 17:52:55 "));
console.log(FuncionesAuxiliares.minutosEntreFechas("November 12 2020 17:51","November 12 2020 18:52"));
console.log ("introduciendo ms: "+ FuncionesAuxiliares.minutosEntreFechas(1000,5000));
 */
/**Tests funcion segundosEntreFechas
console.log(FuncionesAuxiliares.segundosEntreFechas("2000-01-02 00:00:00","January 1 2000 00:00:00"));
console.log(FuncionesAuxiliares.minutosEntreFechas("January 2 2000 00:00:00","January 1 2000 00:00:00"));
console.log ("introduciendo ms: "+ FuncionesAuxiliares.segundosEntreFechas(1600,5000));
 //*/