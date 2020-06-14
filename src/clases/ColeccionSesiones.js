// Importamos los modulos necesarios
import FuncionesAuxiliares from "./FuncionesAuxiliares.js"

// Definimos la clase ColeccionSesiones que almacena cada unidad de estudio

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
    getUltimaSesion() {
        // array[x] donde x es el tamaño del array menos 1
        // ej. array.lenth = 5, la última posición es 4
        return this.arraySesionesEstudio[this.arraySesionesEstudio.length - 1];
    }

    // Pasamos un objeto de tipo date y devuelve las sesiones de ese día
    getSesionesDia(fecha) {
        // Creo un array que iré rellenando con las sesiones de ese día
        let sesionesDia = []
        // Clono la fecha y le pongo las horas, minutos, segundos y milisegundos a 0
        let inicioDia = new Date(fecha.getTime());
        inicioDia.setHours(0, 0, 0, 0);

        // Clono la fecha y le pongo las horas, minutos, segundos y milisegundos al final del dia
        let finDia = new Date(fecha.getTime());
        finDia.setHours(23, 59, 59, 999);

        // Bucle foreach
        // Recorre todo el arraySesionesEstudio. forEach (por cada elemento) lo llamamos sesion
        // hace lo siguiente:
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

        // Bucle foreach
        // Recorre todo el arraySesionesEstudio. forEach (por cada elemento) lo llamamos sesion
        // hace lo siguiente:
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


    //Devuelve el tiempo total de estudio en segundos
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