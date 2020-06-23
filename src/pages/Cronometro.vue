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
  <!-- Indicamos el manejador del swipe -->
  <div v-touch-swipe.mouse.horizontal="userHasSwiped">
    <!-- Usamos el componente Quasar para paginas q-page.
  Usaremos flex para definir el posicionamiento.
    https://quasar.dev/layout/grid/introduction-to-flexbox-->
    <q-page class="flex flex-center content-start">
      <!-- Indicamos que este DIV y sus elementos hijos seguiran en flex una columna
      y que se alineran horizontalmente al centro-->
      <div class="column justify-center">
        <!-- Indicamos mediante una clase el tamanyo y tipo de texto. 
       Ademas, ponemos text-center, ya que flex nos centra el "elemento",
        pero el texto si no indicamos nada dentro del elemento se alinea a la izquierda-->
        <h4 class="text-center Oswald">¡Hora de estudiar!</h4>
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
          size="250px"
          color="light-blue-3"
          track-color="grey-3"
        >
          <!-- Dentro de la etiqueta q-circular-progress metemos el texto que se mostrara.
          Este texto se asocia a la variable reactica "tiempoMostrar"-->
          <p class="Oswald justify-center text-h4 text-blue-grey-13">{{ tiempoMostrar }}</p>
        </q-circular-progress>
        <div class="q-gutter-md">
          <!-- Cuando inicie el cronometro habría que ponerlo disabled -->
          <q-select
            v-model="asignaturaElegida"
            :options="listaAsignaturas"
            :option-label="opt => Object(opt) === opt && 'nombre' in opt ? opt.nombre : 'No hay asignaturas'"
            emit-value
            label="Asignatura"
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-italic text-grey">No hay asignaturas disponibles</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-separator vertical inset />
        <!-- Usamos el componente https://quasar.dev/vue-components/button
      Asociamos al evento click que llame a "cambiarEstadoCrono" y asociamos que el contenido
        de la propiedad label se asocie a la variable reactiva "textoCrono"-->
        <q-btn color="light-blue" :label="textoCrono" @click="cambiarEstadoCrono()" />

        <q-separator vertical inset />
      
        <!-- Definimos dialogo a mostrar con la configuracion de pomodoro -->
        <q-dialog v-model="configPomodoro" persistent>
          <configurarPomodoro :botonListo="true" />
        </q-dialog>
      </div>
    </q-page>
  </div>
</template>



<script>
// Importo la clase FuncionesAuxiliares y FrasesMotivadoras
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import FrasesMotivadoras from "../clases/FrasesMotivadoras.js";
// Importamos la clase SesionEstudio para poder registrar sesiones de estudio
import SesionEstudio from "../clases/SesionEstudio.js";
import Usuario from "../clases/Usuario.js";

// Importamos componente ConfigurarPomodoro

import ConfigurarPomodoro from "../componentes/ConfigurarPomodoro.vue";

// Estructura general necesaria para utilizar variables reactivas en componentes VUE
export default {
  name: "Cronometro",
  components: {
    ConfigurarPomodoro
  },
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
      tiempoMostrar: "00:00:00", // Tiempo que vemos dentro del circulo, valor por defecto
      estadoCrono: false, // true, crono funcionando, false, parado
      valorInterval: null, // variable utilizada para parar el "setInterval"
      frases: FrasesMotivadoras,
      asignaturaElegida: Usuario.$usuarioLocal.planEstudio.asignaturas[0],
      listaAsignaturas: Usuario.$usuarioLocal.planEstudio.asignaturas,
      configPomodoro: false
    };
  },
  created: function() {
    // Si esta la sesion abierta, actualizamos las variables
    let sesionIniciada = Usuario.$usuarioLocal.getSesionEstudioIniciada();

    if (sesionIniciada != null) {
      this.fechaInicio = sesionIniciada;
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
      this.tiempoMostrar = FuncionesAuxiliares.segundosToText(this.tiempo);
      this.cambiarEstadoCrono();
    }
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
        // Solo se ejecuta si no esta la sesion iniciada
        if (Usuario.$usuarioLocal.getSesionEstudioIniciada() == null) {
          this.showNotifInicio();
        }
        // Cambio el texto del cronometro
        this.textoCrono = "Parar";

        // Establecemos fecha inicio (se usara para calcular diferencia entre fechas y para inicio
        // sesion de estudio) al construirla toma como valor la fecha del sistema
        if (Usuario.$usuarioLocal.getSesionEstudioIniciada() != null) {
          this.fechaInicio = Usuario.$usuarioLocal.getSesionEstudioIniciada();
          this.tiempo = FuncionesAuxiliares.segundosEntreFechas(
            new Date(),
            Usuario.$usuarioLocal.getSesionEstudioIniciada()
          );
          // Recuperamos la asignatura elegida
          this.asignaturaElegida=Usuario.$usuarioLocal.getSesionEstudioIniciadaAsignatura()
        } else {
          this.fechaInicio = new Date();
        }

        // Como iniciamos, guardamos la sesion activa como variable local y la asignatura
        Usuario.$usuarioLocal.setSesionEstudioIniciada(this.fechaInicio);
        Usuario.$usuarioLocal.setSesionEstudioIniciadaAsignatura(this.asignaturaElegida);

        // Una vez modificado la sesionEstudioIniciada, guardamos en LocalStorage
        FuncionesAuxiliares.guardarEstadoLocalStorage();

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

        //Usando la función para establecer el tiempo máximo de sesión
        //Se pasa 8h máximo por cada sesión de estudio y las fechas de inicio y fin
        //Si la sesión dura menos de 4h, devuelve la fecha de fin original, si no
        //devuelve 8h después de la fecha de inicio
        let fechaFinCorregida = FuncionesAuxiliares.tiempoMaximoSesion(
          8,
          this.fechaInicio,
          this.fechaFin
        );

        // Llamamos a la función que devuelve un array de sesiones
        let arraySesiones = FuncionesAuxiliares.sesionesTiempoCronometro(
          this.fechaInicio,
          fechaFinCorregida,
          this.asignaturaElegida // Enviamos la asignatura elegida
        );

        // Se recorre el array de las sesiones
        arraySesiones.forEach(sesion => {
          // Añadimos la sesión a la coleccion de sesiones del usuario
          Usuario.$usuarioLocal.getColeccionSesiones().addSesion(sesion);
        });
        // Comprobamos si se ha alcanzado alguno de los objetivos
        this.compruebaObjetivoConseguido();
        // Eliminamos la variable global que indica que la sesion activa
        Usuario.$usuarioLocal.setSesionEstudioIniciada(null);
        Usuario.$usuarioLocal.setSesionEstudioIniciadaAsignatura(null);
        // Al hacer un cambio, guardamos en LocalStorage
        FuncionesAuxiliares.guardarEstadoLocalStorage();
        // Cambiamos texto del cronometro
        this.textoCrono = "Empezar";
        // Se limpian la variables de fecha
        this.fechaInicio = null;
        this.fechaFin = null;
        // Con clearInterval y la referencia al interval, cancelamos el hilo que se ejecuta a intervalos
        clearInterval(this.valorInterval);

      }
    },
    // Definimos dos metodos para generar las distintas notificaciones: la de inicio de sesion y la de fin
    showNotifInicio() {
      this.$q.notify({
        message: "** Iniciada nueva sesión de estudio **",
        caption: this.frases.getFraseMotivadoraAleatoria(), // Con cada inicio de sesión nos pasará aleatoriamente, una frase de la lista
        color: "light-blue-4",
        position: "center"
      });
    },
    // Mostramos la notificacion de fin de sesion
    showNotifFin() {
      this.$q.notify({
        message: "** Sesión de estudio registrada **",
        caption: "Ahora puedes consultarla en el histórico...",
        color: "blue-grey-3",
        position: "center"
      });
    },
    // Manejador para gestionar el swipe de la pagina (lo que nos mueve de seccion al arrastrar)
    userHasSwiped(obj) {
      // Si el gesto no dura un minimo, lo quitamos
      if (obj.duration < 100) {
        return;
      }
      // Comprobamos direccion del gesto y actuamos
      if (obj.direction === "left") {
        this.$router.push("/Historico");
      } else if (obj.direction === "right") {
        this.$router.push("/Resumen");
      }
    },
    // Función para comprobar si se ha cumplido algún objetivo del usuario, después de cada sesión de estudio.
    compruebaObjetivoConseguido() {
      let arraySesiones = Usuario.$usuarioLocal
        .getColeccionSesiones()
        .getSesiones();
      let objetivos = Usuario.$usuarioLocal.getPlanEstudio().getObjetivos();
      objetivos.forEach(objetivo => {
        if (objetivo.update(arraySesiones)) {
          // Si no hay asignatura elegida
          if (this.asignaturaElegida === null) {
            let message =
              "** ENHORABUENA, ACABAS DE CONSEGUIR UN OBJETIVO " +
              objetivo.getFrecuencia().toUpperText();
            let racha = objetivo.getRacha();
            let caption =
              racha > 1
                ? "Llevas una racha de " +
                  racha +
                  " veces seguidas cumpliendo el objetivo"
                : "Empiezas una nueva racha con este objetivo";
            this.showNotifObjetivoConseguido(message, caption); // Emitimos notificación con mensaje y caption específico
          } else {
            let asignatura = this.asignaturaElegida;
            let message =
              "** ENHORABUENA, ACABAS DE CONSEGUIR UN OBJETIVO " +
              objetivo.getFrecuencia().toUpperText();
            let racha = objetivo.getRacha();
            let caption =
              (racha > 1
                ? "Llevas una racha de " +
                  racha +
                  " veces seguidas cumpliendo el objetivo"
                : "Empiezas una nueva racha con este objetivo") +
              ", en la asignatura " +
              asignatura;
            this.showNotifObjetivoConseguido(message, caption); // Emitimos notificación con mensaje y caption específico
          }
        }
      });
    },
    // Definimos una nueva función para notificar el objetivo conseguido
    showNotifObjetivoConseguido(m, c) {
      this.$q.notify({
        message: m,
        caption: c,
        color: "light-blue-4",
        position: "bottom"
      });
    }
  }
};
</script>
