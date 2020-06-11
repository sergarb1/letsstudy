// Definimos la clase SesionEstudio que almacena cada unidad de estudio
class SesionEstudio{
    // Constructor de la clase que recibe el parametro t que es el tiempo de estudio
    constructor(t){
        this.tiempo=t;
        //console.log("Clase creada construida");
    }

    // Metodo que devuelve el tiempo de estudio
    getTiempo(){
        return this.tiempo;
    }
}

/* PARA TEST
let estudioMan=new SesionEstudio(100);
let estudioTar=new SesionEstudio(1000);
let tiempoMan=estudioMan.getTiempo();
let tiempoTar=estudioTar.getTiempo();
console.log("El tiempo de estudio de la manyana es "+tiempoMan);
console.log("El tiempo de estudio de la tarde es "+tiempoTar);
*/
//scsdc

// Para que se posible importar la clase
export default SesionEstudio;