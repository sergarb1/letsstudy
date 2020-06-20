// Importamos los modulos necesarios
//import FuncionesAuxiliares from "./FuncionesAuxiliares.js"

// Clase para almacenar una asignatura
class Asignatura {
    // Se crea el objeto pasandole el texto con el nombre y el objeto de tipo Objetivo
    constructor(nombre,objetivo) {
        
        //Establecemos inicio y fin de sesion
        this.nombreAsignatura = nombre;
        this.objetivoAsignatura = objetivo;
    }

    // Devuelve el nombre de la Asignatura. Será tipo texto
    getNombreAsignatura(){
        return this.nombreAsignatura;
    }

    // Devuelve el objetivo de la Asignatura. Será tipo Objetivo
    getObjetivoAsignatura(){
        return this.objetivoAsignatura;
    }

    // Establece el nombre de la Asignatura, pasandole por parámetro un objeto tipo texto
    setNombreAsignatura(nombre){
        this.nombreAsignatura = nombre;
    }

    // Establece el objetivo de la Asignatura, pasandole por parámetro un objeto tipo Objetivo
    setObjetivoAsignatura(objetivo){
        this.objetivoAsignatura = objetivo;
    }
    

}

// Para que se posible importar la clase
export default Asignatura;