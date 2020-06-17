// Importo la clase ColeccionSesiones para poder crear un objeto de esa clase dentro del constructor
import ColeccionSesiones from './ColeccionSesiones';

// Definimos la clase Usuario que almacena cada usuario
class Usuario {
    //Constructor de la clase que recibe el parametro nombre que es el nombre del usuario
    //Se declara una colección de objetos ColeccionSesiones, pero que no es necesario pasarlo como argumento
    constructor(nombre) {
        // Establecemos nombre de usuario
        this.nombre = nombre;
        // La variable sesionEstudioIniciada valdra null si no esta iniciada una sesion de estudio
        // o tendra una fecha si si hay una sesion de estudio iniciada
        this.sesionEstudioIniciada = null;
        this.coleccionSesiones = new ColeccionSesiones();
    }
    // Getters
    getNombre() {
        return this.nombre;
    }

    // Devuelve el estado de la sesion de estudio
    getSesionEstudioIniciada() {
        return this.sesionEstudioIniciada;
    }

    // Devuelvo el objeto coleccionSesione
    getColeccionSesiones() {
        return this.coleccionSesiones;
    }

    // Set coleccionSesiones para copiar una nueva colección entera
    setColeccionSesiones(nuevaColeccion) {
        this.coleccionSesiones = nuevaColeccion;
    }

    //Set sesion iniciada, recibe un objeto tipo Date
    // Generalmente se pone a una fecha si esta iniciada, y a null si no esta iniciada una 
    setSesionEstudioIniciada(fecha) {
        this.sesionEstudioIniciada = fecha;
    }
}

// Para que se posible importar la clase
export default Usuario;