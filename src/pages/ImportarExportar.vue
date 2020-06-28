<template>
  <q-page class="flex column q-pa-md col-8 q-a-md">
    <div class="q-px-md col-8 q-mx-auto">
      <div class="flex flex-center column">
        <img alt="Lets Study logo" src="~assets/importar_logo.png" style="height:150px;" />
      </div>
    </div>

    <q-card class="q-mb-lg q-px-lg no-box-shadow Oswald">
      <q-card-section class="justify-center">
        <div class="flex flex-center q-mt-md q-mt-xs">
          <h5 class="Oswald doc-heading doc-h5 q-ma-none text-weight-light">Importar / Exportar</h5>
        </div>
      </q-card-section>

      <div class="bg-light-blue rounded-borders">
      <q-card-section class="justify-center">
        <div class="flex flex-center q-mt-md q-mt-xs">
          <q-list>
            <q-item class="justify-center">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="cloud_download"
                label="Exportar datos en JSON"
                @click="exportarTodo()"
              />
            </q-item>
            <q-item class="justify-center">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="cloud_download"
                label="Exportar sesiones de estudio en CSV"
                @click="exportarSesiones()"
              />
            </q-item>
            <q-item class="justify-center">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="cloud_upload"
                label="Importar datos en JSON"
                @click="importar()"
              />
            </q-item>
            <q-item class="justify-center">
              <q-file size="xs" label="Fichero a importar" class="bg-white rounded-borders" outlined v-model="contenidoFichero">
                <template v-slot:prepend>
                  <q-icon size="xs" name="attach_file" />
                </template>
              </q-file>
            </q-item>
            <q-item class="justify-center">
              <q-btn
                push
                class="full-width"
                size="sm"
                color="white text-black"
                icon="delete_forever"
                label="Borrar LocalStorage"
                @click="borrarLocalStorage()"
              />
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";

import { Dialog } from "quasar";

export default {
  name: "ImportarExportar",
  data: function() {
    return {
      // Contendrá fichero de formato https://developer.mozilla.org/es/docs/Web/API/File
      contenidoFichero: null
    };
  },
  // Usamos created, porque si usamos mounted se monta con el plan de estudios nulo
  created: function() {},
  methods: {
    exportarTodo: function() {
      // Obtenemos texto
      let miJSON = localStorage.getItem("usuarioLocal");

      // Tecnica para crear una descarga dinámica de un fichero de texto
      let hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(miJSON);
      hiddenElement.target = "_blank";
      hiddenElement.download =
        "DatosLetStudy" + new Date().toISOString().slice(0, 10) + ".json";
      hiddenElement.click();

      // Notificamos la correcta exportacion
      this.$q.notify({
        type: "positive",
        message: "Exportado JSON de Let's study con éxito"
      });
    },
    exportarSesiones: function() {
      let miJSON = JSON.parse(localStorage.getItem("usuarioLocal"));

      let csv = ""; // Aqui creamos el CSV (Comma Separated Values) que esportaremos
      //Creamos cabecera
      csv = "FechaInicio,FechaFin,Asignatura\n";
      // Por cada sesion de estudio, generamos una linea CSV
      for (let x in miJSON.coleccionSesiones.arraySesionesEstudio) {
        let sesion = miJSON.coleccionSesiones.arraySesionesEstudio[x];
        // Anyadimos una linea
        csv +=
          sesion.inicioSesion +
          "," +
          sesion.finSesion +
          "," +
          sesion.asignatura.nombre +
          "\n";
      }

      // Tecnica para crear una descarga dinámica de un fichero de texto
      let hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";
      hiddenElement.download =
        "SesionesLetStudy" + new Date().toISOString().slice(0, 10) + ".csv";
      hiddenElement.click();

      // Notificamos la correcta exportacion
      this.$q.notify({
        type: "positive",
        message: "CSV sesiones exportado con éxito"
      });
    },
    importar: function() {
      // Si no tenemos un fichero de formato https://developer.mozilla.org/es/docs/Web/API/File
      // Mostrarmos error
      if (this.contenidoFichero === null) {
        this.$q.notify({
          type: "negative",
          message: "Seleccion un fichero de datos de Let's Study"
        });
        // Salimos de la funcion
        return;
      }

      // Dialogo de importar
      this.$q
        .dialog({
          title: "Importar datos",
          message:
            "¿Quieres importar estos datos? Se perderán los datos previos.",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // Si tenemos fichero en formato https://developer.mozilla.org/es/docs/Web/API/File incluimos
          // su información dentro del localStorage
          this.contenidoFichero.text().then(textoFichero => {
            // Guardamos datos en localStorage
            localStorage.setItem("usuarioLocal", textoFichero);
            // Recargamos localStorage
            FuncionesAuxiliares.restaurarEstadoLocalStorage();
            // Notificamos que se ha hecho correctamente la importacion
            this.$q.notify({
              type: "positive",
              message: "Datos importados con éxito"
            });
          });
        });

      return;
    },
    //funcion que borra el localStorage
    borrarLocalStorage() {
      this.$q
        .dialog({
          title: "Restaurar",
          message:
            "¿Quieres restaurar los valores por defecto? Se perderán todos los datos.",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          localStorage.clear();
          // Para que el objeto este bien, recuperamos del LocalStorage y asi se re-construye el objeto
          FuncionesAuxiliares.restaurarEstadoLocalStorage();
          this.$q.notify({
            message: "Aplicación restaurada a valores por defecto.",
            color: "light-blue-4",
            position: "bottom"
          });
        });
    }
  }
};
</script>

<style lang="sass" scoped>
</style>