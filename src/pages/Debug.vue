<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md col-8 q-gutter-md">
      <div class="flex flex-center column" >
        <img alt="Lets Study logo" src="~assets/debug.png"  style="height:150px;" />
      </div>
    </div>
    <ul>
      <li>Recuperar datos: Muestra un json de los datos almacenados en localStorage</li>
      <li>Crear datos nuevos: Genera un json aleatorio con datos de prueba</li>
      <li>Guardar datos: Guarda en localStorage los datos que estén en el campo de texto.</li>
      <li>
        <b>¡Hay que darle al botón de guardar datos tras darle al botón de crear!</b>
      </li>
    </ul>
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="light-blue-4" text-color="white" label="Recupera datos" @click="recuperaDatos" />
      <q-btn color="light-blue-4" text-color="white" label="Crear datos nuevos" @click="creaDatos" />
      <!-- Este botón se desabilita si no hay contenido en el campo texto 
      usando el operador ternario.
      ¿Campo texto es igual a ''? Entonces true el disable, si no false-->
      <q-btn
        :disable="text == ''? true : false"
        color="light-blue-4"
        text-color="white"
        label="Guarda datos"
        @click="guardarDatos"
      />
      <!-- Este botón borra el LocalStorage-->
      <q-btn
        color="light-blue-4"
        text-color="white"
        label="Borrar LocaStorage"
        @click="borrarLocalStorage"
      />
    </div>
    <div>
      <q-input v-model="text" filled class="q-pa-md" type="textarea" rows="20" cols="40" />
    </div>
  </q-page>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import ColeccionSesiones from "../clases/ColeccionSesiones.js";
import Usuario from "../clases/Usuario.js";

export default {
  name: "Debug",
  data: function() {
    return {
      text: ""
    };
  },
  methods: {
    // Inserta en el textArea el JSON del objeto Usuario que devuelve la función restaurarEstadoLocalStorage
    recuperaDatos() {
      FuncionesAuxiliares.restaurarEstadoLocalStorage();
      this.text = JSON.stringify(Usuario.$usuarioLocal);
    },
    creaDatos() {
      // Creación del usuario con nombre Usuario prueba
      //let user = new Usuario('Usuario prueba');
      Usuario.$usuarioLocal = new Usuario("Usuario test");

      // Va a generar una coleccion de entre 10 y 30 sesiones de estudio
      let nuevaColeccion = ColeccionSesiones.newAleatoria(
        FuncionesAuxiliares.numeroAleatorio(10, 30)
      );

      // Asignamos la nueva colección al Usuario
      Usuario.$usuarioLocal.setColeccionSesiones(nuevaColeccion);

      // Se muestra en el textArea el usuario como JSON
      this.text = JSON.stringify(Usuario.$usuarioLocal);
    },
    // Función que guarda los datos en localStorage del objeto JSON que haya en el textArea
    guardarDatos() {
      // Guardamos en LocalStorage
      localStorage.setItem("usuarioLocal", this.text);
      // Para que el objeto este bien, recuperamos del LocalStorage y asi se re-construye el objeto
      FuncionesAuxiliares.restaurarEstadoLocalStorage();
    },
    //funcion que borra el localStorage
    borrarLocalStorage() {
      localStorage.clear();
      // Para que el objeto este bien, recuperamos del LocalStorage y asi se re-construye el objeto
      FuncionesAuxiliares.restaurarEstadoLocalStorage();
    }
  }
};
</script>