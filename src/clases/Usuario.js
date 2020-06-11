// Definimos la clase Usuario que almacena cada usuario
class Usuario {
    // Constructor de la clase que recibe el parametro nombre que es el nombre del usuario
    //Se declara un array de objetos DiaEstudio, pero que no es necesario pasarlo como argumento
    constructor(nombre) {
        this.nombre = nombre;
        this.arrayDiasEstudio = [];
    }
    // Getters
    getNombre() {
        return this.nombre;
    }
    getArrayDiasEstudio() {
        return this.arrayDiasEstudio;
    }
    //Añade un dia al atributo arrayDiasEstudio. El parametro es un objeto DiaEstudio
    pushDiaEstudio(diaEstudio) {
        this.arrayDiasEstudio.push(diaEstudio);
    }
}
/* PARA TEST
let user1 = new Usuario("Cesar");
let user2 = new Usuario("Alejandro");
let user3 = new Usuario("Ximo");
user1.pushDiaEstudio(1);
user2.pushDiaEstudio(2);
user3.pushDiaEstudio(3);
user1.pushDiaEstudio(4);
console.log("El usuario 1 es " + user1.getNombre(), user1.getArrayDiasEstudio());
console.log("El usuario 2 es " + user2.getNombre(), user2.getArrayDiasEstudio());
console.log("El usuario 3 es " + user3.getNombre(), user3.getArrayDiasEstudio());
*/
// Para que se posible importar la clase
export default Usuario;