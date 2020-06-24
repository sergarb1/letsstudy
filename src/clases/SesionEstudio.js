// Importamos los modulos necesarios
import FuncionesAuxiliares from "./FuncionesAuxiliares.js"

// Clase para almacenar una sesion de estudio
class SesionEstudio {
    // Se construcye con el inicio y fin de sesión (Date) además del nombre de la asignatura ('null' si no hay)
    // IMPORTANTE: Tener en cuenta que las asignaturas pueden eliminarse, crearse y cambiar de nombre (en clase PlanEstudio)
    constructor(inicio, fin, asig = null) {
        // Inicio y fin de sesion (objetos Date)
        this.inicioSesion = inicio;
        this.finSesion = fin;
        // Nombre de la asignatura (cadena de texto)
        this.asignatura = asig;
    }

    // Devuelve el inicio de la sesión (tipo Date)
    getInicioSesion(){
        return this.inicioSesion;
    }

    // Devuelve el fin de la sesión (tipo Date)
    getFinSesion(){
        return this.finSesion;
    }

    // Establece el fín de la sesión (tipo Date)
    setFinSesion(fin){
        this.finSesion = fin;
    }

    // Devuelve el nombre de la asignatura (cadena de texto), 'null' si no hay
    getAsignatura(){
        return this.asignatura;
    }

    // Establece el nombre de la asignatura (cadena de texto), 'null' si no hay
    setAsigntura(asig){
        this.asignatura = asig;
    }

    // Devuelve el tiempo de estudio en segundos
    getSegundosEstudio() {
        let ms = this.finSesion.getTime() - this.inicioSesion.getTime();
        return Math.floor(ms / 1000);
    }

    // Devuelve el tiempo de estudio en minutos
    getMinutosEstudio() {
        return Math.floor(this.getSegundosEstudio() / 60);
    }

    // Devuelve un objeto SesionEstudio aleatorio (en los últimos 365 días, tiempo estudiado entre 20 y 120 minutos)
    static newAleatoria() {
        // Ahora, hace 365 días y momento aleatorio entre ambos
        let ahora = new Date().getTime();
        let antes = ahora - 31536000000; // 365*24*60*60*1000
        // Por ahora las aleatorias, simplemente no tienen asignatura
        let asig = 'Estudio general';
        // Obtenemos fecha de inicio aleatoria
        let inicio = FuncionesAuxiliares.numeroAleatorio(antes, ahora);
        // Tiempo estudiado entre 20 y 120 minutos
        let estudiado = FuncionesAuxiliares.numeroAleatorio(1200000, 7200000); // 20*60000 y 120*60000
        // Devolvemos la sesión de estudio
        return new SesionEstudio(new Date(inicio), new Date(inicio+estudiado), asig);
    }

    // Devuelve un objeto SesionEstudio aleatorio entre Date dateMin y dateMax, con minutos estudiados entre mMin y mMax
    static newAleatoriaRango(dateMin, dateMax, mMin, mMax) {
        // Momento aleatorio entre dateMin y dateMax (milisegundos desde 1 enero 1970)
        let inicio = FuncionesAuxiliares.numeroAleatorio(dateMin.getTime(), dateMax.getTime());
        // Milisegundos estudiados entre mMin y mMax
        let estudiado = FuncionesAuxiliares.numeroAleatorio(mMin*60000, mMax*60000);
        // Por ahora las aleatorias, simplemente no tienen asignatura
        let asig = 'Estudio general';
        // Devolvemos la sesión de estudio
        return new SesionEstudio(new Date(inicio), new Date(inicio + estudiado), asig);
    }

}

// Para que se posible importar la clase
export default SesionEstudio;