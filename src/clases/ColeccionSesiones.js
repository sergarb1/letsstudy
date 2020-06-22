// Importamos los modulos necesarios
import SesionEstudio from "./SesionEstudio.js"

// Clase que almacena una colección de sesiones de estudio
class ColeccionSesiones {
    // Constructor que genera un array para almacenar objetos SesionEstudio en orden cronológico
    constructor() {
        this.arraySesionesEstudio = [];
    }

    // Añade un objeto SesionEstudio al array. La sesión se tiene que pasar ya creada
    // TODO optimizarlo: si ya está ordenado solo hay que insertarlo en la posición correcta, no es necesario hacer sort de toda la lista
    addSesion(sesion) {
        this.arraySesionesEstudio.push(sesion);
        this.arraySesionesEstudio.sort(function (a, b){
            return (a.getInicioSesion() - b.getInicioSesion())
        })
    }

    // Devuelve el array de sesiones de estudio
    getSesiones() {
        return this.arraySesionesEstudio;
    }

    // Devuelve la última sesión de estudio
    getUltimaSesion() {
        return this.arraySesionesEstudio[this.arraySesionesEstudio.length - 1];
    }

    // Devuelve la primera sesión de estudio
    getPrimeraSesion() {
        return this.arraySesionesEstudio[0];
    }

    // Devuelve sesiones entre dos fechas que se le pasan como parametro
    getSesionesEntreFechas(fechaA, fechaB) {
        // Creo un array que iré rellenando con las sesiones de ese día
        let sesiones = []

        // Comprobamos que fechaA es anterior a fechaB y sino las invertimos
        if (fechaA.getTime() > fechaB.getTime()) {
            let aux = fechaA;
            fechaA = fechaB;
            fechaB = aux;
        }

        // Recorre todo el arraySesionesEstudio buscando las sesiones en las fechas indicadas
        this.arraySesionesEstudio.forEach(sesion => {
            // Comprobación si la sesion inicia entre fechaA y fechaB
            if (sesion.getInicioSesion().getTime() >= fechaA.getTime() && sesion.getInicioSesion().getTime() <= fechaB.getTime()) {
                //Si esta entre las dos fechas, introducimos en el array la sesión
                sesiones.push(sesion);
            }
        });

        // Devolvemos el array
        return sesiones;
    }

    // Devuelve un array con las SesionesEstudio del dia de la fecha indicada (objeto Date)
    getSesionesDia(fecha) {
        // Primer instante del dia (a las 00:00:00:000)
        let inicio = new Date(fecha.getTime());
        inicio.setHours(0, 0, 0, 0);
        // Último instante del dia (a las 23:59:59:999)
        let fin = new Date(fecha.getTime());
        fin.setHours(23, 59, 59, 999);
        // Devolvemos las sesiones de ese dia
        return this.getSesionesEntreFechas(inicio, fin);
    }

    // Devuelve un array con las SesionesEstudio de la semana de la fecha indicada (objeto Date)
    getSesionesSemana(fecha) {
        // Primer instante de la semana (lunes a las 00:00:00:000)
        let inicio = new Date(fecha.getTime() - (fecha.getDay() * (24 * 3600 * 1000)));
        inicio.setHours(0, 0, 0, 0);
        // Último instante de la semana (domingo a las 23:59:59:999)
        let fin = new Date(inicio.getTime() + (7 * 24 * 3600 * 1000) - 1);
        // Devolvemos las sesiones de la semana
        return this.getSesionesEntreFechas(inicio, fin);
    }

    // Devuelve un array con las SesionesEstudio del mes de la fecha indicada (objeto Date)
    getSesionesMes(fecha) {
        // Primer instante del mes (día 1 a las 00:00:00:0000...)
        let inicio = new Date(fecha.getTime());
        inicio.setDate(1);
        inicio.setHours(0, 0, 0, 0);
        // Último instante del mes (último día del mes a las 23:59:59:9999...)
        let fin = new Date(inicio.getTime()); // Al primer instante del mes
        fin.setMonth(inicio.getMonth() + 1);  // le sumamos un mes y
        fin = new Date(fin.getTime() - 1);    // le restamos un milisegundo
        // Devolvemos las sesiones del mes
        return this.getSesionesEntreFechas(inicio, fin);
    }

    // Devuelve el tiempo total de estudio en segundos
    tiempoTotalEstudio() {
        // Variable para ir acumulando el tiempo
        let acumulado = 0;

        // Bucle foreach para recorrer todo el array de sesiones.
        // Igual que antes, cada sesión es sesion
        this.arraySesionesEstudio.forEach(sesion => {
            // Compruebo que la sesión esté finalizada para acumular su tiempo
            if (sesion.getFinSesion() != null) {
                // Uso la función auxiliar creada y le paso por parámetros el 
                // inicio y fin de la sesion
                // El acumulado es lo que ya había antes en acumulado + el nuevo tiempo
                acumulado += sesion.getSegundosEstudio();
            }
        });

        return acumulado;
    }

    // Devuelve un objeto ColeccionSesiones con 'cuantas' sesiones aleatorias
    static newAleatoria(cuantas) {
        let coleccion = new ColeccionSesiones();
        for(var i = 0; i < cuantas; i++){
            coleccion.addSesion(SesionEstudio.newAleatoria());
        }
        return coleccion;
    }

    // Devuelve un objeto ColeccionSesiones con 'cuantas' sesiones aleatorias de 20 a 120 minutos
    // en el rango indicado dateMin -> dateMax (objetos Date).
    static newAleatoriaRango(cuantas, dateMin, dateMax) {
        let coleccion = new ColeccionSesiones();
        for(var i = 0; i < cuantas; i++){
            coleccion.addSesion(SesionEstudio.newAleatoriaRango(dateMin, dateMax, 20, 120));
        }
        return coleccion;
    }

}

// Para que se posible importar la clase
export default ColeccionSesiones;