class FuncionesAuxiliares {

    static segundosToText(s) {

        if (s < 0 || s > 86399 || !Number.isInteger(s)) return null

        let segundos = '00'
        let minutos = '00'
        let horas = '00'

        segundos = ('0' + s % 60).slice(-2)

        if (s >= 60) {

            s = parseInt(s / 60)

            minutos = ('0' + s % 60).slice(-2)

            if (s >= 60) {

                s = parseInt(s / 60)

                horas = ('0' + s % 60).slice(-2)

            }

        }

        return horas + " : " + minutos + " : " + segundos

    }

    static minutosEntreFechas(fechaA, fechaB) {
        let dateA = new Date(fechaA).getTime();
        let dateB = new Date(fechaB).getTime();
        let difS = Math.abs(dateA - dateB);
        let toMin = difS / 60000;
        return Math.round(toMin);
    }

    static segundosEntreFechas(fechaA, fechaB) {
        let dateA = new Date(fechaA).getTime();
        let dateB = new Date(fechaB).getTime();
        let difS = Math.abs(dateA - dateB);
        let toSecs = difS / 1000;
        return Math.round(toSecs);
    }

}

class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
        this.coleccionSesiones = new ColeccionSesiones();
    }
    getNombre() {
        return this.nombre;
    }
    getColeccionSesiones() {
        return this.coleccionSesiones;
    }
}

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
    getUltimaSesion(){
        // array[x] donde x es el tamaño del array menos 1
        // ej. array.lenth = 5, la última posición es 4
        return this.arraySesionesEstudio[this.arraySesionesEstudio.length - 1];
    }

    // Pasamos un objeto de tipo date y devuelve las sesiones de ese día
    getSesionesDia(fecha) {
        // Creo un array que iré rellenando con las sesiones de ese día
        let sesionesDia = []
        // Clono la fecha y le pongo las horas, minutos, segundos y milisegundos a 0
        let inicioDia=new Date(fecha.getTime());
        inicioDia.setHours(0,0,0,0);

        // Clono la fecha y le pongo las horas, minutos, segundos y milisegundos al final del dia
        let finDia=new Date(fecha.getTime());
        finDia.setHours(23,59,59,999);

        // Bucle foreach
        // Recorre todo el arraySesionesEstudio. forEach (por cada elemento) lo llamamos sesion
        // hace lo siguiente:
        this.arraySesionesEstudio.forEach(sesion => {
            // Comprobación si la sesion inicia entre inicioDia y finDia
            if(sesion.getInicioSesion().getTime()>=inicioDia.getTime() && sesion.getInicioSesion().getTime()<=finDia.getTime() ){
                    //Si es el mismo día, introducimos en el array la sesión
                    sesionesDia.push(sesion);
            }
        });

        // Devolvemos el array
        return sesionesDia;
    }

    
    // Devuelve sesiones entre dos fechas que se le pasan como parametro
    getSesionesEntreFechas(fechaA,fechaB) {
        // Creo un array que iré rellenando con las sesiones de ese día
        let sesiones = []

        // Comprobamos que fechaA es anterior a fechaB y sino las invertimos
        if(fechaA.getTime()>fechaB.getTime){
            let aux=fechaA;
            fechaA=fechaB;
            fechaB=aux;
        }

        // Bucle foreach
        // Recorre todo el arraySesionesEstudio. forEach (por cada elemento) lo llamamos sesion
        // hace lo siguiente:
        this.arraySesionesEstudio.forEach(sesion => {
            // Comprobación si la sesion inicia entre fechaA y fechaB
            if(sesion.getInicioSesion().getTime()>=fechaA.getTime() && sesion.getInicioSesion().getTime()<=fechaB.getTime()){
                    //Si esta entre las dos fechas, introducimos en el array la sesión
                    sesiones.push(sesion);
            }
        });

        // Devolvemos el array
        return sesiones;
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


class SesionEstudio {
    //
    constructor(inicio) {
        this.inicioSesion = inicio;
        this.finSesion = null;
    }

    getInicioSesion() {
        return this.inicioSesion;
    }

    getFinSesion() {
        return this.finSesion;
    }

    setFinSesion(fin) {
        this.finSesion = fin;
    }
}

/*
-----------------------------
|     EMPIEZAN LOS TEST     |
-----------------------------
*/

// Creación de fechas, cambian los días y dentro de los días las horas y minutos
let fecha1 = new Date(2020, 06, 11, 14, 20, 0);
let fecha2 = new Date(2020, 06, 11, 14, 35, 0);
let fecha3 = new Date(2020, 06, 11, 16, 20, 0);
let fecha4 = new Date(2020, 06, 11, 16, 35, 0);
let fecha5 = new Date(2020, 07, 11, 14, 20, 0);
let fecha6 = new Date(2020, 07, 11, 14, 35, 0);
let fecha7 = new Date(2020, 07, 11, 16, 20, 0);
let fecha8 = new Date(2020, 07, 11, 16, 35, 0);

// Creación de nuevo usuario
let user1 = new Usuario("User1");
// Creación de sesiones de estudio, están sin fecha de fin
let sesion1 = new SesionEstudio(fecha1);
let sesion2 = new SesionEstudio(fecha3);
let sesion3 = new SesionEstudio(fecha5);
let sesion4 = new SesionEstudio(fecha7);

// Para no tener que repetir todas las veces el getColeccionSesiones(),
// almaceno en k todas las sesiones
let k = user1.getColeccionSesiones();

// Añado al objeto k la sesión
k.addSesion(sesion1);
// Con getUltimaSesion añado un fin de sesión a la ultima sesión de nuestro array
// Habría que comprobar si ya existe un fin de sesion con getFinSesion()
k.getUltimaSesion().setFinSesion(fecha2);
k.addSesion(sesion2);
k.getUltimaSesion().setFinSesion(fecha4);
k.addSesion(sesion3);
k.getUltimaSesion().setFinSesion(fecha6);
k.addSesion(sesion4);
k.getUltimaSesion().setFinSesion(fecha8);

// Impresión de todas las sesiones
console.log('**** Todas las sesiones ****')
console.log(k.getSesiones());

//Impresión del tiempo total de estudio en segundos
console.log(k.tiempoTotalEstudio() + ' segundos');

// Aprovecho la función auxiliar para mostrarlo con formato
console.log(FuncionesAuxiliares.segundosToText(k.tiempoTotalEstudio()));

// Imprimo el array de las sesiones del día 1 creado anteriormente (son 2)
console.log('**** Sesiones del día de fecha1 ****');
console.log(k.getSesionesDia(fecha1));