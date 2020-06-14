// Importo la clase ColeccionSesiones para poder crear un objeto de esa clase dentro del constructor
import ColeccionSesiones from './ColeccionSesiones';

// Definimos la clase Usuario que almacena cada usuario
class Usuario {
    //Constructor de la clase que recibe el parametro nombre que es el nombre del usuario
    //Se declara una colección de objetos ColeccionSesiones, pero que no es necesario pasarlo como argumento
    constructor(nombre) {
        this.nombre = nombre;
        this.inicioSesion = new Date.now();
        this.coleccionSesiones = new ColeccionSesiones();
    }
    // Getters
    getNombre() {
        return this.nombre;
    }

    getInicioSesion() {
        return this.inicioSesion;
    }

    // Devuelvo el objeto coleccionSesione
    getColeccionSesiones() {
        return this.coleccionSesiones;
    }

    //Set inicio sesion, recibe un objeto tipo Date
    setInicioSesion(fecha) {
        this.inicioSesion = fecha;
    }
}

// Para que se posible importar la clase
export default Usuario;