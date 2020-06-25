<template>
  <q-page class="flex column q-pa-md col-8 q-a-md" v-touch-swipe.mouse.horizontal="userHasSwiped">
    <div class="q-px-md col-8 q-mx-auto">
      <div class="flex flex-center column">
        <img alt="Lets Study logo" src="~assets/planEstudio.png" style="height:150px;" />
      </div>
    </div>
    <div class="flex flex-center q-mt-md q-mt-xs">
      <h5 class="Oswald doc-heading doc-h5 q-ma-none text-weight-light">Objetivos</h5>
    </div>
    <!-- Lista de objetivos, cada q-item representa un objetivo -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="Oswald text-body2 text-weight-light">
            Objetivo diario:
            <!-- Muestra la variable objetivoDiario -->
            <span class="text-weight-bold">{{ objetivoDiario }}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="settings"
            color="gray"
            @click="mostrarVentanaModificaObjetivo('diario')"
            class="cursor-pointer"
          />
        </q-item-section>
        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="delete_forever"
            color="red"
            @click="eliminarObjetivo('diario')"
            class="cursor-pointer"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="Oswald text-body2 text-weight-light">
            Objetivo semanal:
            <span class="text-weight-bold">{{ objetivoSemanal }}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="settings"
            color="gray"
            @click=" mostrarVentanaModificaObjetivo('semanal')"
            class="cursor-pointer"
          />
        </q-item-section>
        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="delete_forever"
            color="red"
            @click="eliminarObjetivo('semanal')"
            class="cursor-pointer"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="Oswald text-body2 text-weight-light">
            Objetivo mensual:
            <span class="text-weight-bold">{{ objetivoMensual }}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="settings"
            color="gray"
            @click="mostrarVentanaModificaObjetivo('mensual')"
            class="cursor-pointer"
          />
        </q-item-section>
        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="delete_forever"
            color="red"
            @click="eliminarObjetivo('mensual')"
            class="cursor-pointer"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Ventana para modificar el los objetivos -->
    <!-- Se controla con un booleano -->
    <q-dialog v-model="ventanaModificaObjetivo" full-width>
      <q-card>
        <!-- Título de la tarjeta y botón cerrar -->
        <q-card-section class="row items-center q-pb-none">
          <div class="Oswald text-h6 text-weight-light">Objetivo {{ objetivoAModificar }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <!-- Hace un if, según el objetivoAModificar, para mostrar un slider u otro -->
        <q-card-section>
          <div class="Oswald" v-if="objetivoAModificar == 'diario'">
            <q-slider
              v-model="horasObjetivoNuevo"
              :min="0"
              :max="24"
              label
              :label-value="'Objetivo: ' + horasObjetivoNuevo + 'h'"
              label-always
              class="q-mt-md"
            />
          </div>
          <div v-else-if="objetivoAModificar == 'semanal'">
            <q-slider
              v-model="horasObjetivoNuevo"
              :min="0"
              :max="168"
              label
              :label-value="'Objetivo: ' + horasObjetivoNuevo + 'h'"
              label-always
              class="q-mt-md"
            />
          </div>
          <div v-else-if="objetivoAModificar == 'mensual'">
            <q-slider
              v-model="horasObjetivoNuevo"
              :min="0"
              :max="720"
              label
              :label-value="'Objetivo: ' + horasObjetivoNuevo + 'h'"
              label-always
              class="q-mt-md"
            />
          </div>
          <q-btn
            color="primary"
            label="Modificar objetivo"
            @click="modificaObjetivo(objetivoAModificar)"
            class="q-mt-md"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="flex flex-center q-mt-md">
      <h4 class="Oswald doc-heading text-h5 q-ma-xs text-weight-light">Asignaturas</h4>
    </div>
    <!-- Lista de asignaturas, 
    Usamos planEstudio.asignaturas.slice(1) para que no salga la primera, que es
    Estudio general-->
    <q-list>
      <q-item class="Oswald" v-for="asig in planEstudio.asignaturas.slice(1)" :key="asig.nombre">
        <!-- El v-if es para que la asignatura nula no la muestre -->
        <q-item-section>
          <q-item-label class="text-body2 text-weight-light">{{asig.nombre}}</q-item-label>
        </q-item-section>
        <!-- Si existe objetivo en esa asignatura, lo mostramos -->
        <q-item-section v-if="asig.objetivo != null">
          <q-item-label
            class="text-left text-weight-light text-body2"
          >Objetivo {{asig.objetivo.frecuencia}} de {{asig.objetivo.duracion}}h</q-item-label>
        </q-item-section>
        <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="settings"
            color="gray"
            class="cursor-pointer"
            @click="mostrarVentanaModificaAsignatura(asig)"
          />
        </q-item-section>

        <q-item-section side top class="self-center">
          <q-icon
            size="sm"
            name="delete_forever"
            color="red"
            @click="eliminarAsignaturaNombre(asig.nombre)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn color="primary" label="Añadir asignatura" @click="mostrarVentanaAnadirAsignatura()" />

    <!-- Ventana que sirve para añadir asignatura o para modificarla -->
    <q-dialog v-model="ventanaNuevaAsignatura" full-width>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="Oswald text-h6 text-weight-light">Asignatura</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input v-model="nombreAsignatura" label="Asignatura" />
          <!-- Botón para añadir objetivos a la asignatura -->
          <q-toggle v-model="anadirObjetivoAsignatura" label="Añadir objetivo a la asignatura" />
          <div v-if="anadirObjetivoAsignatura">
            <!-- Un slider para cada franja temporal -->
            <div v-if="frecuencia == 'diario'">
              <q-slider
                v-model="duracionAsignatura"
                :min="0"
                :max="24"
                label
                :label-value="'Objetivo: ' + duracionAsignatura + 'h'"
                label-always
                class="q-mt-md"
              />
            </div>
            <div v-else-if="frecuencia == 'semanal'">
              <q-slider
                v-model="duracionAsignatura"
                :min="0"
                :max="168"
                label
                :label-value="'Objetivo: ' + duracionAsignatura + 'h'"
                label-always
                class="q-mt-md"
              />
            </div>
            <div v-else-if="frecuencia == 'mensual'">
              <q-slider
                v-model="duracionAsignatura"
                :min="0"
                :max="720"
                label
                :label-value="'Objetivo: ' + duracionAsignatura + 'h'"
                label-always
                class="q-mt-md"
              />
            </div>
            <q-select
              v-model="frecuencia"
              :options="optionsFrecuencia"
              :option-label="etiqueta => (etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1))"
              label="Frecuencia"
            />
          </div>
          <!-- Si no hay asignatura a modificar, es porque estamos añadiendo,
          mostramos ese botón con la llamada a añadir-->
          <div v-if="asignaturaAModificar == ''">
            <q-btn
              color="primary"
              label="Añadir asignatura"
              @click="anyadirAsignatura"
              class="q-mt-md"
              :disable="nombreAsignatura.length===0"
              v-close-popup
            />
          </div>
          <!-- Si no, el botón para modificar asignatura -->
          <div v-else>
            <q-btn
              color="primary"
              label="Modificar asignatura"
              @click="modificaAsignatura"
              class="q-mt-md"
              :disable="nombreAsignatura.length===0"
              v-close-popup
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Usuario from "../clases/Usuario.js";
import Asignatura from "../clases/Asignatura.js";
import Objetivo from "../clases/Objetivo.js";
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";

export default {
  name: "PlanEstudio",
  data: function() {
    return {
      planEstudio: Usuario.$usuarioLocal.planEstudio,
      // Variables que son llamadas para mostrar los objetivos
      objetivoDiario: "-",
      objetivoSemanal: "-",
      objetivoMensual: "-",
      // Mostrar o no la ventana de modificar objetivo
      ventanaModificaObjetivo: false,
      // Datos del objetivo a modificar
      objetivoAModificar: "",
      horasObjetivoNuevo: "",
      // Se guarda el nombre original de la asignatura a modificar
      asignaturaAModificar: "",
      // Mostrar o no la ventana de asignatura
      ventanaNuevaAsignatura: false,
      // Toggle objetivo asignatura
      anadirObjetivoAsignatura: false,
      // Opciones del objetivo
      duracionAsignatura: 1,
      nombreAsignatura: "",
      frecuencia: "diario",
      // Array del select de frecuencias
      optionsFrecuencia: ["diario", "semanal", "mensual"]
    };
  },
  // Usamos created, porque si usamos mounted se monta con el plan de estudios nulo
  created: function() {
    // Llamadas a los métodos para mostrar los objetivos creados
    this.getObjetivoDiario();
    this.getObjetivoSemanal();
    this.getObjetivoMensual();
  },
  methods: {
    // Revibe el nombre del objetivo
    mostrarVentanaModificaObjetivo(objetivo) {
      // Activa la ventana de modificar objetivo
      this.ventanaModificaObjetivo = true;
      // Guardamos el objetivo a modificar
      this.objetivoAModificar = objetivo;

      // Se establece las horasObjetivoNuevo como el objetivo actual, para que
      // salgan las horas que ya habían en el objetivo
      switch (objetivo) {
        case "diario":
          this.horasObjetivoNuevo = Number.parseInt(this.objetivoDiario);
          break;
        case "semanal":
          this.horasObjetivoNuevo = Number.parseInt(this.objetivoSemanal);
          break;
        case "mensual":
          this.horasObjetivoNuevo = Number.parseInt(this.objetivoMensual);
          break;
      }
    },
    mostrarVentanaAnadirAsignatura() {
      // Se vacia la variable usada para modificar
      this.asignaturaAModificar = "";
      // Reiniciamos los campos de asignatura
      this.nombreAsignatura = "";
      this.anadirObjetivoAsignatura = false;
      this.duracionAsignatura = 1;
      this.frecuencia = "diario";
      this.ventanaNuevaAsignatura = true;
    },
    mostrarVentanaModificaAsignatura(asignatura) {
      // Reiniciamos los campos de asignatura
      this.nombreAsignatura = "";
      this.anadirObjetivoAsignatura = false;
      this.duracionAsignatura = 1;
      this.frecuencia = "diario";

      //Asignamos los nuevos valores, arrastrando los que ya existian
      this.asignaturaAModificar = asignatura.nombre;
      this.ventanaNuevaAsignatura = true;
      this.nombreAsignatura = asignatura.nombre;

      //Si existe objetivo, se rellena
      if (asignatura.objetivo != null) {
        //El toggle
        this.anadirObjetivoAsignatura = true;
        //La duración y la frecuencia
        this.duracionAsignatura = asignatura.objetivo.duracion;
        this.frecuencia = asignatura.objetivo.frecuencia;
      }
    },
    // Metodo que anayade una asignatura, usnado nombre de "this.nombreAsignatura"
    // y objetivo si procede
    anyadirAsignatura() {
      // En primer lugar comprobamos si esta duplicado el nombre (no se permiten duplicados)
      let nombreDuplicado = false;
      // Recorremos la lista de asignaturas
      for (let x in Usuario.$usuarioLocal.planEstudio.asignaturas) {
        // Duplicado detectado
        if (
          this.nombreAsignatura ===
          Usuario.$usuarioLocal.planEstudio.asignaturas[x].nombre
        ) {
          nombreDuplicado = true;
          break;
        }
      }

      //Comprueba que exista un nombre en el textfield (en teoria Vue evita pulsar el boton vacio)
      // O si esta duplicado
      if (nombreDuplicado === true || this.nombreAsignatura === "") {
        // Notificamos error duplicado
        this.$q.notify({
          type: "negative",
          message: "Nombre de asignatura duplicado"
        });
        return;
      } else {
        //Crea objeto asignatura
        let asignatura = new Asignatura(this.nombreAsignatura, null);
        //Si se ha marcado el toggle de objetivo para la asignatura
        if (this.anadirObjetivoAsignatura) {
          //Crear el objeto Objetivo con la duración y la frecuencia elegida
          let objetivo = new Objetivo(this.duracionAsignatura, this.frecuencia);
          //Se asigna el objetivo a la asignatura
          asignatura.setObjetivo(objetivo);
        }

        //Se guarda en la variable Usuario y en localStorage
        Usuario.$usuarioLocal.getPlanEstudio().addAsignatura(asignatura);
        // Guardamos en el LocalStorage
        FuncionesAuxiliares.guardarEstadoLocalStorage();
        this.$q.notify({
          type: "positive",
          message: "Asignatura añadida"
        });
        // Reiniciamos los campos de asignatura
        this.nombreAsignatura = "";
        this.anadirObjetivoAsignatura = false;
        this.duracionAsignatura = 1;
        this.frecuencia = "diario";
      }
    },
    modificaAsignatura() {
      // En primer lugar comprobamos si esta duplicado el nombre (no se permiten duplicados)
      let nombreDuplicado = false;
      // Recorremos la lista de asignaturas
      for (let x in Usuario.$usuarioLocal.planEstudio.asignaturas) {
        // Duplicado detectado y como excepción, si el nombre que queremos poner
        // es el mismo que ya había (no pondrá nombreDuplicado = true)
        if (
          this.nombreAsignatura ===
            Usuario.$usuarioLocal.planEstudio.asignaturas[x].nombre &&
          this.nombreAsignatura !== this.asignaturaAModificar
        ) {
          nombreDuplicado = true;
          break;
        }
      }

      //Comprueba que exista un nombre en el textfield (en teoria Vue evita pulsar el boton vacio)
      // O si esta duplicado
      if (nombreDuplicado === true || this.nombreAsignatura === "") {
        // Notificamos error duplicado
        this.$q.notify({
          type: "negative",
          message: "Nombre de asignatura duplicado"
        });
        return;
      } else {
        let duracion;

        //Se rellena la duración con el máximo de horas por tiempo
        switch (this.frecuencia) {
          case "diario":
            // Si hemos puesto más de 24h, asigna 24
            if (this.duracionAsignatura > 24) {
              duracion = 24;
            } else {
              duracion = this.duracionAsignatura;
            }
            break;
          case "semanal":
            if (this.duracionAsignatura > 168) {
              duracion = 168;
            } else {
              duracion = this.duracionAsignatura;
            }
            break;
          case "mensual":
            duracion = this.duracionAsignatura;
            break;
        }
        //Se recorren las asignaturas buscando la que hay que modificar
        Usuario.$usuarioLocal
          .getPlanEstudio()
          .getAsignaturas()
          .forEach(asig => {
            if (asig.nombre === this.asignaturaAModificar) {
              // Se ajusta al nuevo nombre
              asig.setNombre(this.nombreAsignatura);

              //Si tiene objetivo, se crea y se añade
              if (this.anadirObjetivoAsignatura) {
                let obj = new Objetivo(duracion, this.frecuencia);
                asig.setObjetivo(obj);
              } else {
                // Si no tiene objetivo o se elimina, se establece a null para eliminarlo
                asig.setObjetivo(null);
              }
            }
          });

        FuncionesAuxiliares.guardarEstadoLocalStorage();
        this.asignaturaAModificar = "";
        this.$q.notify({
          type: "positive",
          message: "Asignatura modificada"
        });

        // Reiniciamos los campos de asignatura
        this.nombreAsignatura = "";
        this.anadirObjetivoAsignatura = false;
        this.duracionAsignatura = 1;
        this.frecuencia = "diario";
      }
    },
    //Recibe la frecuencia del objetivo
    modificaObjetivo(obj) {
      let encontrado = false;
      let duracion = this.horasObjetivoNuevo;

      // Se busca el objetivo
      this.planEstudio.objetivos.forEach(objetivo => {
        // Si coincide la frecuencia con el que pasamos
        if (objetivo.frecuencia === obj) {
          encontrado = true;

          // Se recorren los objetivos del usuario
          Usuario.$usuarioLocal
            .getPlanEstudio()
            .getObjetivos()
            .forEach(o => {
              if (o.getFrecuencia() === obj) {
                //Cuando lo encuentra establece la nueva duración
                o.setDuracion(duracion);
              }
            });
        }
      });

      //Si no lo ha econtrado
      if (!encontrado) {
        //Se crea el objeto Objetivo, se pasa la duración y el parámetro frecuencia(diario, semanal, mensual)
        let objetivo = new Objetivo(duracion, obj);
        //Se añade el objetivo al usuario
        Usuario.$usuarioLocal.getPlanEstudio().addObjetivo(objetivo);
      }
      this.$q.notify({
        type: "positive",
        message: "¡Objetivo actualizado!"
      });
      //Se refrescan los objetivos del DOM
      this.getObjetivoDiario();
      this.getObjetivoSemanal();
      this.getObjetivoMensual();
      FuncionesAuxiliares.guardarEstadoLocalStorage();
    },
    // Funcion que recibe el nombre de una asignatura y la elimina del Plan de estudios
    eliminarAsignaturaNombre(nombreAsig) {
      for (let x in this.planEstudio.asignaturas) {
        if (this.planEstudio.asignaturas[x].nombre === nombreAsig) {
          this.planEstudio.asignaturas.splice(x, 1);
        }
      }
      this.$q.notify({
        type: "positive",
        message: "¡Asignatura eliminada!"
      });
      // Guardamos el estado de LocalStorage
      FuncionesAuxiliares.guardarEstadoLocalStorage();
    },

    eliminarObjetivo(obj) {
      //Comprobación si es el objetivo que estamos buscando
      Usuario.$usuarioLocal
        .getPlanEstudio()
        .getObjetivos()
        .forEach(o => {
          if (o.getFrecuencia() === obj) {
            //Si es nuestro objetivo, se elimina y se refresca el DOM
            Usuario.$usuarioLocal.getPlanEstudio().removeObjetivoGeneral(o);
            this.getObjetivoDiario();
            this.getObjetivoSemanal();
            this.getObjetivoMensual();
            FuncionesAuxiliares.guardarEstadoLocalStorage();

            this.$q.notify({
              type: "positive",
              message: "¡Objetivo eliminado!"
            });
          }
        });
    },
    //Métodos que recogen el objetivo correspondiente
    //Si lo encuentra, establece la variable como el tiempo + h
    getObjetivoDiario() {
      let encontrado = false;
      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === "diario") {
          this.objetivoDiario = objetivo.duracion + "h";
          encontrado = true;
          return;
        }
      });

      // Si no lo encuentra, pone un 0h
      if (!encontrado) {
        return (this.objetivoDiario = 0 + "h");
      }
    },
    getObjetivoSemanal() {
      let encontrado = false;
      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === "semanal") {
          this.objetivoSemanal = objetivo.duracion + "h";
          encontrado = true;
          return;
        }
      });

      if (!encontrado) {
        return (this.objetivoSemanal = 0 + "h");
      }
    },
    getObjetivoMensual() {
      let encontrado = false;
      this.planEstudio.objetivos.forEach(objetivo => {
        if (objetivo.frecuencia === "mensual") {
          this.objetivoMensual = objetivo.duracion + "h";
          encontrado = true;
          return;
        }
      });

      if (!encontrado) {
        return (this.objetivoMensual = 0 + "h");
      }
    },
    userHasSwiped(obj) {
      // Si el gesto no dura un minimo, lo quitamos
      if (obj.duration < 100) {
        return;
      }
      // Comprobamos direccion del gesto y actuamos
      if (obj.direction === "right") {
        this.$router.push("/Historico");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
</style>