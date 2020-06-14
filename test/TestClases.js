
// Importo la clase FuncionesAuxiliares
import FuncionesAuxiliares from "../src/clases/FuncionesAuxiliares.js";
// Importamos la clase SesionEstudio para poder registrar sesiones de estudio
import SesionEstudio from "../src/clases/SesionEstudio.js";
// Importamos la clase Usuario para poder hacer las pruebas de funcionamiento
import Usuario from "../src/clases/Usuario.js";

function probarClases(){


    /*
    -----------------------------
    |     EMPIEZAN LOS TEST     |
    -----------------------------
    */

    // Creación de fechas, cambian los días y dentro de los días las horas y minutos
    let fecha1 = new Date(2020, 6, 11, 14, 20, 0);
    let fecha2 = new Date(2020, 6, 11, 14, 35, 0);
    let fecha3 = new Date(2020, 6, 11, 16, 20, 0);
    let fecha4 = new Date(2020, 6, 11, 16, 35, 0);
    let fecha5 = new Date(2020, 7, 11, 14, 20, 0);
    let fecha6 = new Date(2020, 7, 11, 14, 35, 0);
    let fecha7 = new Date(2020, 7, 11, 16, 20, 0);
    let fecha8 = new Date(2020, 7, 11, 16, 35, 0);

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
}

export default probarClases;