// Importo la clase ColeccionSesiones para poder crear un objeto de esa clase dentro del constructor
import ColeccionSesiones from './ColeccionSesiones';

// Definimos la clase Usuario que almacena cada usuario
class Usuario {
    //Constructor de la clase que recibe el parametro nombre que es el nombre del usuario
    //Se declara una colección de objetos ColeccionSesiones, pero que no es necesario pasarlo como argumento
    constructor(nombre) {
        this.nombre = nombre;
        this.coleccionSesiones = new ColeccionSesiones();
    }
    // Getters
    getNombre() {
        return this.nombre;
    }

    // Devuelvo el objeto coleccionSesione
    getColeccionSesiones() {
        return this.coleccionSesiones;
    }
}

// Para que se posible importar la clase
export default Usuario;