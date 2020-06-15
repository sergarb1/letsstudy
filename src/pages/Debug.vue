<template>
  <q-page class="q-pa-md">
    <h5>Debug</h5>
    <ul>
      <li>Recuperar datos: Muestra un json de los datos almacenados en localStorage</li>
      <li>Crear datos nuevos: Genera un json aleatorio con datos de prueba</li>
      <li>Guardar datos: Guarda en localStorage los datos que estén en el campo de texto.</li>
      <li><b>¡Hay que darle al botón de guardar datos tras darle al botón de crear!</b></li>
    </ul>
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        color="white"
        text-color="black"
        label="Recupera datos"
        @click="recuperaDatos"
      />
      <q-btn
        color="white"
        text-color="black"
        label="Crear datos nuevos"
        @click="creaDatos"
      />
      <!-- Este botón se desabilita si no hay contenido en el campo texto 
      usando el operador ternario.
      ¿Campo texto es igual a ''? Entonces true el disable, si no false-->
      <q-btn
        :disable="text == ''? true : false"
        color="white"
        text-color="black"
        label="Guarda datos"
        @click="guardarDatos"
      />
    </div>
    <div>
      <q-input
        v-model="text"
        filled
        class="q-pa-md"
        type="textarea"
        rows="20"
        cols="40"
      />
    </div>
  </q-page>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import SesionEstudio from "../clases/SesionEstudio.js";
import Usuario from "../clases/Usuario.js";

export default {
  name: "Debug",
  data: function() {
    return {
      text: ''
    };
  },
  methods: {
    // Inserta en el textArea el JSON del objeto Usuario que devuelve la función restaurarEstadoLocalStorage
    recuperaDatos() {
      this.text = JSON.stringify(FuncionesAuxiliares.restaurarEstadoLocalStorage('usuario'));
    },
    creaDatos() {
      // Creación del usuario con nombre Usuario prueba
      let user = new Usuario('Usuario prueba');
      // Va a generar entre 10 y 30 sesiones de estudio
      for (let i = 0; i < this.numeroAleatorio(10, 30); i++) {
        //Generación de días, horas y minutos aleatorios
        let dia = this.numeroAleatorio(1, 31);
        let hora = this.numeroAleatorio(0, 23);
        let minuto = this.numeroAleatorio(0, 59);
        
        // El tiempo de estudio será entre 5mins y 60 mins en las pruebas
        // Número aleatorio entre 5mins y 60mins
        let sumaFin = this.numeroAleatorio(300000, 3600000);

        // Para las pruebas se hará en el mes de mayo del 2020
        let inicio = new Date(2020, 4, dia, hora, minuto, 0);

        // Se establece la fecha de fín sumando el tiempo calculado
        let fin = inicio.getTime() + sumaFin;

        // Creación de la sesión
        let sesion = new SesionEstudio(Date.parse(inicio), fin);

        //Introducción de la sesión en el array de las sesiones
        user.getColeccionSesiones().addSesion(sesion);
      }

      // Ordenar las sesiones por fechas
      // Función para ordenar el array cortesía de San Google con el método sort
      user.getColeccionSesiones().getSesiones().sort(((a, b) => a.inicioSesion > b.inicioSesion));

      // Se muestra en el textArea el usuario como JSON
      this.text = JSON.stringify(user);
    },
    // Función que guarda los datos en localStorage del objeto JSON que haya en el textArea
    guardarDatos() {
      FuncionesAuxiliares.guardarEstadoLocalStorage(JSON.parse(this.text));

      // Se vacía el textArea
      this.text = '';
    },
    //funcion que obtiene un numero aleatorio entre A (menor) y B (mayor) incluidos
    numeroAleatorio(A, B) {
      return Math.floor((Math.random() * B) + A);
    }
  }
}
</script>