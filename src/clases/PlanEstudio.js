// Clase que define un plan de estudios asociado al usuario
// Contiene conjunto de asignaturas y objetivos,
// Ademas de metodos para manipularlos y para solicitar la actualizacion de todos los objetivos

class PlanDeEstudio{
    // Recibe un array de asignaturas y un array de objetivos.
    // Si se construye sin haber nada, se puede enviar vacios los arrays
    constructor(as, ob){
        // Asignaturas con objetivos o no
        this.asignaturas=as;
        // Objetivos generales
        this.objetivos=ob;
    }

    // Devuelve todas las asignaturas
    getAsignaturas(){
        return this.asignaturas;
    }
    
    // Devuelve todos los objetivos generales
    getObjetivos(){
        return this.objetivos;
    }

    // Anyade una nueva asignatura
    addAsignatura(nuevaAsig){
        this.asignaturas.push(nuevaAsig);
    }

    // Anyade un nuevo objetivo general
    addObjetivo(nuevoObj){
        this.objetivos.push(nuevoObj);
    }

    // Eliminar una asignatura del array
    // TODO ¿y qué sucede con las sesiones de estudio asociadas a esta asignatura?
    removeAsignaturas(asigBorrar){
        // Obtenemos su posicion en el array
        let i = this.asignaturas.indexOf( asigBorrar );
        // Eliminamos el elemento del array
        this.asignaturas.splice( i, 1 );
    }

    // Elimina un objetivo general del array objetivos.
    // Recibe el objeto objetivo, lo localiza y borra
    removeObjetivoGeneral(objBorrar){
        // Obtenemos su posicion en el array
        let i = this.objetivos.indexOf( objBorrar );
        // Eliminamos el elemento del array
        this.objetivos.splice( i, 1 );
    }

    // Elimina un objetivo del array asignatura. 
    // Recibe el objeto de la asignatura, lo localiza y lo pone a null
    removeObjetivoAsignatura(objAsig){
        // Obtenemos su posicion en el array
        let i = this.asignaturas.indexOf( objAsig );
        // Eliminamos el elemento del array
        this.asignaturas[i].objetivo=null;
    }

    


    // Recibe una Coleccion de sesiones
    // El metodo con esa coleccion llama al metodo update de cada uno de los objetivos generales
    // Tambien recorre la asignaturas para que aquellas que tengan objetivos, llamen a actualizar

    actualizarObjetivos(coleccionDeSesiones){
        let i;
        // Recorremos objetivos generales
        for(i=0;i<this.objetivos.lenght;i++){
            this.objetivos[i].update(coleccionDeSesiones)
        }
        // Recorremos asignaturas generales
        for(i=0;i<this.asignaturas.lenght;i++){
            if(this.asignaturas[i].objetivo===null || this.asignaturas[i].objetivo===undefined){
                continue;
            } // Caso de que la asignatura tenga objetivo, actualizamos su objetivo
            else{
                this.asignaturas[i].objetivo.update(coleccionDeSesiones);
            }
        }
    }

}

export default PlanDeEstudio;