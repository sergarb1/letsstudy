// Clase para almacenar las sesiones de estudio
class SesionEstudio {
    // Se crea el objeto pasandole el objeto Date de inicio de la sesión
    constructor(inicio) {
        this.inicioSesion = inicio;
        //Establecemos como vacio el fín de la sesión
        this.finSesion = null;
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
}

export default SesionEstudio;