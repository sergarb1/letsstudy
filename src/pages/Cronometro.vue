<!-- Este fichero es un componente Vue. Aunque puede tener otras funciones,
este lo usaremos como "pagina" de la aplicacion.

Estos componetes tienen 3 partes:

1) <template> </template>. Dentro de esa etiqueta se incluye como es 
el componente, metiendo HTML o otros componetes.
NOTA: los q-noseque son componentes Vue que incorpora Quasar

2) <script> </script> donde estan los scripts de esta pagina, en un formato
muy concreto para usar Vue.

3) <style> </style>. En este caso no esta, pero la podriamos usar para realizar
personalizaciones de estilo
-->

<template>
  <!-- Usamos el componente Quasar para paginas q-page.
  Usaremos flex para definir el posicionamiento.
  https://quasar.dev/layout/grid/introduction-to-flexbox-->
  <q-page class="flex flex-center">
    <!-- Indicamos que este DIV y sus elementos hijos seguiran en flex una columna
    y que se alineran horizontalmente al centro-->
    <div class="column justify-center q-gutter-md">
      <!-- Indicamos mediante una clase el tamanyo y tipo de texto. 
       Ademas, ponemos text-center, ya que flex nos centra el "elemento",
      pero el texto si no indicamos nada dentro del elemento se alinea a la izquierda-->
      <p class="text-b1 text-center">¡Hora de estudiar!</p>

      <!-- Usamos el componente https://quasar.dev/vue-components/circular-progress
       Indicamos distintos valores, entre ellos que su dibujo represente los rangos de 1 a 60 y que
       el valor para calcular en donde se esta, utilize la variable reactiva "tiempo" y obtenga
      su modulo 61 (operacion %)-->
      <q-circular-progress
        show-value
        class="text-light-blue justify-center"
        :value="tiempo%60"
        :min="0"
        :max="59"
        size="150px"
        color="light-blue"
        track-color="grey-3"
      >
        <!-- Dentro de la etiqueta q-circular-progress metemos el texto que se mostrara.
        Este texto se asocia a la variable reactica "tiempoMostrar"-->
        <p class="text-body2 justify-center">{{ tiempoMostrar }}</p>
      </q-circular-progress>

      <!-- Usamos el componente https://quasar.dev/vue-components/button
      Asociamos al evento click que llame a "cambiarEstadoCrono" y asociamos que el contenido
      de la propiedad label se asocie a la variable reactiva "textoCrono"-->
      <q-btn color="light-blue" :label="textoCrono" @click="cambiarEstadoCrono()" />
    </div>
  </q-page>
</template>



<script>
// Importo la clase FuncionesAuxiliares
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import SesionEstudio from "../clases/SesionEstudio.js";
// Importamos la clase Usuario para poder hacer la prueba de funcionamiento
import Usuario from "../clases/Usuario.js";

// Estructura general necesaria para utilizar variables reactivas en componentes VUE
export default {
  name: "Cronometro",
  /* Data es una funcion... porque si, porque los componetes Vue van asi.a1
  Basicamente, en data definiremos aquellas variables que son reactivas.
  Podriamos decir, que las variables reactivas son aquellas que si se cambian en algun lugar del codigo,
  su valor cambia automaticamente en cualquier valor de la interfaz que las use. */
  data: function() {
    return {
      fechaInicio: null, // Fecha en la que se inicio el cronometro
      fechaFin: null, // Fecha en la que se paro el cronometro
      tiempo: 0, // Segundos de la sesion
      textoCrono: "Empezar", // Texto del cronometro, por defecto empezar
      tiempoMostrar: "00 : 00 : 00", // Tiempo que vemos dentro del circulo, valor por defecto
      estadoCrono: false, // true, crono funcionando, false, parado
      valorInterval: null, // variable utilizada para parar el "setInterval"
      sesion: null, // variable usada para registrar las distintas sesiones
      // Creamos un usuario para pruebas, el usuario real se le pasará al componente como 'props'
      usuario: new Usuario("Usuario de prueba")
    };
  },
  // Definimos metodos del componente
  methods: {
    // Metodo que al llamarse cambia el esto del cronometro de parado a en marcha o viceversa
    cambiarEstadoCrono() {
      // Si el cronometro estaba parado
      if (this.estadoCrono === false) {
        // Indico que el cronometro esta encendido
        this.estadoCrono = true;
        // Se muestra la notificación de inicio de registro de sesión
        this.showNotifInicio();
        // Cambio el texto del cronometro
        this.textoCrono = "Parar";
        // Establecemos fecha inicio (se usara para calcular diferencia entre fechas y para inicio
        // sesion de estudio) al construirla toma como valor la fecha del sistema
        this.fechaInicio = new Date();
        // Instanciamos una nueva SesionEstudio para almacenar el inicio del crono
        this.sesion = new SesionEstudio(this.fechaInicio);

        // setInterval es una funcion Javascript para que una funcion que se indica dentro
        // se ejecute cada X milisegundos (segundo parametro)
        // para poder ser usada en componentes, se anyade el .bind(this) al final
        // Por ultimo comentar que se guarda en "valorInterval" la referencia al intervalo,
        // para poder pararlo mas adelante

        this.valorInterval = setInterval(
          // Funcion anonima que se ejecuta cada intervalo
          function() {
            //Obtenemos fecha actual. Al construir un objeto Date, este toma la fecha actual
            let fechaActual = new Date();
            // Calculamos los segundos que han trascurrido restando la fecha de inicio del crono
            // con la fecha actual. Esto se hace para no depender de la precision de setInterval
            // y dar un resultado mas preciso
            this.tiempo = FuncionesAuxiliares.segundosEntreFechas(
              this.fechaInicio,
              fechaActual
            );
            // Transforma los segundo transcurridos en formato HH : MM : SS
            this.tiempoMostrar = FuncionesAuxiliares.segundosToText(
              this.tiempo
            );
          }.bind(this),
          1000
        );
      }
      // Si el cronometro estaba encendido
      else {
        // Indico que el cronometro esta parado y cambio texto
        this.estadoCrono = false;
        // Si el crono estaba en marcha anteriormente y lo hemos parado, se muestra notificación
        // de fin de registro de sesión y grabamos la sesión finalizada
        this.showNotifFin();
        // Establecemos feha de fin del crono para el registro de sesion
        this.fechaFin = new Date();
        // Registramos la fecha de fin en la sesion
        this.sesion.setFinSesion(this.fechaFin);
        // Añadimos la sesión a la coleccion de sesiones del usuario
        this.usuario.getColeccionSesiones().addSesion(this.sesion);
        // Enviamos a consola los datos para comprobacion (eliminar cuando confirmemos buen funcionamiento)
        console.log(this.usuario.getNombre());
        console.log(this.usuario.getColeccionSesiones().getUltimaSesion());
        // Reseteamos la sesión para proximos registros
        this.sesion = null;
        this.textoCrono = "Empezar";
        // Con clearInterval y la referencia al interval, cancelamos el hilo que se ejecuta a intervalos
        clearInterval(this.valorInterval);
      }
    },
    showNotifInicio() {
      this.$q.notify({
        message: "Iniciada nueva sesión de estudio",
        caption: "Sumando tiempo conseguirás tus objetivos!",
        color: "primary"
      });
    },
    showNotifFin() {
      this.$q.notify({
        message: "Sesión de estudio registrada",
        caption: "Pudes consultarla en el histórico",
        color: "secondary"
      });
    }
  }
};
</script>
