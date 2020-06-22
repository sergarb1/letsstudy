// Importo la clase ColeccionSesiones para poder crear un objeto de esa clase dentro del constructor
import ColeccionSesiones from './ColeccionSesiones';
import PlanEstudio from './PlanEstudio';
import Pomodoro from './Pomodoro';

// Definimos la clase Usuario que almacena cada usuario
class Usuario {
    // Constructor de la clase. Parámetro 'nombre' es una cadena de texto
    constructor(nombre) {
        // Nombre de usuario
        this.nombre = nombre;
        // Si hay una sesión de estudio iniciada contendrá un objeto Date con el inicio de la sesión. 'null' en caso contrario
        this.sesionEstudioIniciada = null;
        // Demás objetos con los datos y configuración de estudio
        this.coleccionSesiones = new ColeccionSesiones();
        this.planEstudio = new PlanEstudio([], []);
        this.pomodoro = new Pomodoro();
    }

    // Getters
    getNombre() {
        return this.nombre;
    }

    // Devuelve el estado de la sesion de estudio
    getSesionEstudioIniciada() {
        return this.sesionEstudioIniciada;
    }

    // Devuelvo el objeto coleccionSesiones
    getColeccionSesiones() {
        return this.coleccionSesiones;
    }

    // Devuelvo el objeto planEstudio
    getPlanEstudio() {
        return this.planEstudio;
    }

    // Set coleccionSesiones para establecer una colección entera
    setColeccionSesiones(nuevaColeccion) {
        this.coleccionSesiones = nuevaColeccion;
    }

    // Set sesionEstudioIniciada. Se le pasa un objeto date si está iniciada, 'null' si no
    setSesionEstudioIniciada(date) {
        this.sesionEstudioIniciada = date;
    }
    
}

// Para que se posible importar la clase
export default Usuario;