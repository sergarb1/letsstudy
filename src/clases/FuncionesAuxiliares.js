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

}

export default FuncionesAuxiliares

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
