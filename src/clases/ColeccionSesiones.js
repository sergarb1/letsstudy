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

    // Pasamos un objeto de tipo Date y devuelve las sesiones de ese día
    getSesionesDia(fecha) {
        // Creo un array que iré rellenando con las sesiones de ese día
        let sesionesDia = []
        // Clono la fecha y le pongo las horas, minutos, segundos y milisegundos a 0
        let inicioDia = new Date(fecha.getTime());
        inicioDia.setHours(0, 0, 0, 0);

        // Clono la fecha y le pongo las horas, minutos, segundos y milisegundos al final del dia
        let finDia = new Date(fecha.getTime());
        finDia.setHours(23, 59, 59, 999);

        // Recorre todo el arraySesionesEstudio buscando las sesiones de la fecha indicada
        this.arraySesionesEstudio.forEach(sesion => {
            // Comprobación si la sesion inicia entre inicioDia y finDia
            if (sesion.getInicioSesion().getTime() >= inicioDia.getTime() && sesion.getInicioSesion().getTime() <= finDia.getTime()) {
                //Si es el mismo día, introducimos en el array la sesión
                sesionesDia.push(sesion);
            }
        });

        // Devolvemos el array
        return sesionesDia;
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

    // Pasamos un objeto de tipo date y devuelve las sesiones desde el lunes de esa semana
    // hasta la fecha pasada como argumento
    // TODO ¿por qué desde el lunes hasta la fecha pasada como argumento? ¿no debería ser de lunes a domingo?
    getSesionesSemana(fecha) {
        // Creo un array que contendrá las sesiones desde la fecha hasta el lunes anterior
        let sesionesSemana = [];
        // Calculo el lunes anterior a la fecha que obtenemos como parámetro, 
        // restando los milisegundos que hay hasta el lunes de cada semana
        let fechaInicioSemana = new Date(fecha.getTime() - (fecha.getDay() * (24 * 3600 * 1000)));
        // Ponemos la hora del lunes a 0:0:0:000
        fechaInicioSemana.setHours(0, 0, 0, 0);
        // Llamamos al metodo que nos devuelve el array de sesiones entre 2 fechas
        sesionesSemana = this.getSesionesEntreFechas(fechaInicioSemana, fecha);
        // Devolvemos el array
        return sesionesSemana;
    }

    // Pasamos un objeto de tipo date y devuelve las sesiones del mes en curso desde el día 1
    // hasta la fecha pasada como argumento
    // TODO ¿por qué desde el dia hasta la fecha pasada como argumento? ¿no debería ser todo el mes?
    getSesionesMes(fecha) {
        // Creo un array que contendrá las sesiones desde el día 1 a la fecha pasada como parámetro
        let sesionesMes = [];
        // Clono la fecha
        let diaActual = new Date(fecha.getTime());
        // Calculo el día 1 del mes en curso
        let fechaInicioMes = new Date(diaActual.setDate(1));
        // Ponemos la hora del día 1 del mes a 0:0:0:000
        fechaInicioMes.setHours(0, 0, 0, 0);
        // Llamamos al metodo que nos devuelve el array de sesiones entre 2 fechas
        sesionesMes = this.getSesionesEntreFechas(fechaInicioMes, fecha);
        // Devolvemos el array
        return sesionesMes;
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