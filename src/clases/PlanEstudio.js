// Clase que define un plan de estudios asociado al usuario
// Contiene conjunto de asignaturas y objetivos,
// Ademas de metodos para manipularlos y para solicitar la actualizacion de todos los objetivos

class PlanDeEstudio{
    // Recibe un array de asignaturas y un array de objetivos.
    // Si se construye sin haber nada, se puede enviar vacios los arrays
    constructor(as, ob){
        this.asignaturas=as;
        this.objetivos=ob;
    }

    // Devuelve todas las asignaturas
    getAsignaturas(){
        return this.asignaturas;
    }
    // Devuelve todos los objetivos
    getObjetivos(){
        return this.objetivos;
    }

    // Anyade asignaturas
    addAsignaturas(nuevaAsig){
        this.asignaturas.push(nuevaAsig);
    }

    // Anyade objetivps
    addObjetivos(nuevoObj){
        this.objetivos.push(nuevoObj);
    }

    // Eliminar una asignatura del array
    removeAsignaturas(asigBorrar){
        // Obtenemos su posicion en el array
        let i = this.asignaturas.indexOf( asigBorrar );
        // Eliminamos el elemento del array
        this.asignaturas.splice( i, 1 );
    }
    // Elimina un objetivo
    removeObjetivos(objBorrar){
        
        // Obtenemos su posicion en el array
        let i = this.objetivos.indexOf( objBorrar );
        // Eliminamos el elemento del array
        this.objetivos.splice( i, 1 );
    }


    // Recibe una Coleccion de sesiones
    // El metodo con esa coleccion llama al metodo update de cada uno de los objetivos
    // con el fin de que en el momento de la llamada, todos comprueben si se ha realizado el objetiv
    // o cuanto queda
    actualizarObjetivos(coleccionDeSesiones){
        let i;
        for(i=0;i<this.objetivos.lenght;i++){
            this.objetivos[i].update(coleccionDeSesiones)
        }
    }

}

export default PlanDeEstudio;