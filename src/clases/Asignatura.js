// Importamos los modulos necesarios
//import FuncionesAuxiliares from "./FuncionesAuxiliares.js"

// Clase para almacenar una asignatura
class Asignatura {
    // Construye el objeto a partir del nombre y el objetivo
    // nombre: Cadena de texto
    // objetivo: Tipo Objetivo. Puede ser 'null' si no tiene
    constructor(nombre, objetivo = null) {
        // Cadena de texto
        this.nombre = nombre;
        // Objeto tipo Objetivo
        this.objetivo = objetivo;
    }

    // Devuelve el nombre (tipo texto)
    getNombre(){
        return this.nombre;
    }

    // Devuelve el objetivo (tipo Objetivo). 'null' si no hay.
    getObjetivo(){
        return this.objetivo;
    }

    // Establece el nombre de la Asignatura (cadena de texto)
    setNombre(nombre){
        this.nombre = nombre;
    }

    // Establece el objetivo de la Asignatura (tipo Objetivo). 'null' si no hay.
    setObjetivo(objetivo){
        this.objetivo = objetivo;
    }

}

// Para que se posible importar la clase
export default Asignatura;