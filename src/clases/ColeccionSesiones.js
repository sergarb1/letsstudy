// Definimos la clase ColeccionSesiones que almacena cada unidad de estudio
// Importo las funciones auxiliares para usarlas dentro de la clase
import FuncionesAuxiliares from './FuncionesAuxiliares';

class ColeccionSesiones {
    // Constructor que genera un array para almacenar objetos SesionEstudio
    constructor() {
        this.arraySesionesEstudio = [];
    }

    // Añade una sesión al array. La sesión se tiene que pasar ya creada
    addSesion(sesion) {
        this.arraySesionesEstudio.push(sesion);
    }

    // Devuelve el array entero
    getSesiones() {
        return this.arraySesionesEstudio;
    }

    // Para facilitar el manejo esta función devuelve la última sesión del array
    // así evitamos realizar la función siempre que sea necesario
    getUltimaSesion(){
        // array[x] donde x es el tamaño del array menos 1
        // ej. array.lenth = 5, la última posición es 4
        return this.arraySesionesEstudio[this.arraySesionesEstudio.length - 1];
    }

    // Pasamos un objeto de tipo date y devuelve las sesiones de ese día
    getSesionesDia(fecha) {
        // Creo un array que iré rellenando con las sesiones de ese día
        let sesionesDia = []

        // Bucle foreach
        // Recorre todo el arraySesionesEstudio. forEach (por cada elemento) lo llamamos sesion
        // hace lo siguiente:
        this.arraySesionesEstudio.forEach(sesion => {
            // Comprobación si la sesión empieza en el mismo día del mes, 
            // mes y año que la fecha pasada por parametro
            if(sesion.getInicioSesion().getDate() == fecha.getDate() &&
                sesion.getInicioSesion().getMonth() == fecha.getMonth() &&
                sesion.getInicioSesion().getFullYear() == fecha.getFullYear()){
                    //Si es el mismo día, introducimos en el array la sesión
                    sesionesDia.push(sesion);
            }
        });

        // Devolvemos el array
        return sesionesDia;
    }

    //Devuelve el tiempo total de estudio en segundos
    tiempoTotalEstudio() {
        // Variable para ir acumulando el tiempo
        let acumulado = 0;

        // Bucle foreach para recorrer todo el array de sesiones.
        // Igual que antes, cada sesión es sesion
        this.arraySesionesEstudio.forEach(sesion => {
            // Compruebo que la sesión esté finalizada para acumular su tiempo
            if(sesion.getFinSesion() != null){
                // Uso la función auxiliar creada y le paso por parámetros el 
                // inicio y fin de la sesion
                // El acumulado es lo que ya había antes en acumulado + el nuevo tiempo
                acumulado += FuncionesAuxiliares.segundosEntreFechas(
                        sesion.getInicioSesion(),
                        sesion.getFinSesion()
                    );
            }
        });

        return acumulado;
    }
}

// Para que se posible importar la clase
export default ColeccionSesiones;