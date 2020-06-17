// Importamos los modulos necesarios
import FuncionesAuxiliares from "./FuncionesAuxiliares.js"

// Clase para almacenar una sesion de estudio
class SesionEstudio {
    // Se crea el objeto pasandole el objeto Date de inicio de la sesión y el fin
    constructor(inicio,fin) {
        
        //Establecemos inicio y fin de sesion
        this.inicioSesion = inicio;
        this.finSesion = fin;
    }

    // Devuelve el inicio de la sesión. Será tipo Date
    getInicioSesion(){
        return this.inicioSesion;
    }

    // Devuelve el fin de la sesión. Será tipo Date
    getFinSesion(){
        return this.finSesion;
    }

    // Establece el fín de la sesión, pasandole por parámetro un objeto tipo Date
    setFinSesion(fin){
        this.finSesion = fin;
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
        let inicio = FuncionesAuxiliares.numeroAleatorio(antes, ahora);
        // Tiempo estudiado entre 20 y 120 minutos
        let estudiado = FuncionesAuxiliares.numeroAleatorio(1200000, 7200000); // 20*60000 y 120*60000
        // Devolvemos la sesión de estudio
        return new SesionEstudio(new Date(inicio), new Date(inicio+estudiado));
    }

    // Devuelve un objeto SesionEstudio aleatorio entre Date dateMin y dateMax, con minutos estudiados entre mMin y mMax
    static newAleatoriaRango(dateMin, dateMax, mMin, mMax) {
        // Momento aleatorio entre dateMin y dateMax (milisegundos desde 1 enero 1970)
        let inicio = FuncionesAuxiliares.numeroAleatorio(dateMin.getTime(), dateMax.getTime());
        // Milisegundos estudiados entre mMin y mMax
        let estudiado = FuncionesAuxiliares.numeroAleatorio(mMin*60000, mMax*60000);
        // Devolvemos la sesión de estudio
        return new SesionEstudio(new Date(inicio), new Date(inicio + estudiado));
    }

}

// Para que se posible importar la clase
export default SesionEstudio;