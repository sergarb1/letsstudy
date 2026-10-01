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
import FuncionesAuxiliares, { datosSonValidos } from "../clases/FuncionesAuxiliares.js";

// Tamaño máximo razonable para un fichero de datos de la app (5 MB)
const TAMANO_MAXIMO_FICHERO = 5 * 1024 * 1024;

// Escapa un valor para que no rompa las comillas ni las columnas del CSV
function escaparCSV(valor) {
  const texto = valor === null || valor === undefined ? "" : String(valor);
  if (/[",\r\n]/.test(texto)) {
    return '"' + texto.replace(/"/g, '""') + '"';
  }
  return texto;
}

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
    // Crea una descarga dinámica con un Blob (sin data: URIs, que la CSP
    // del build de producción puede bloquear)
    descargarFichero: function(contenido, nombreFichero, tipoMime) {
      const blob = new Blob([contenido], { type: tipoMime });
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = nombreFichero;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      // Se libera la URL cuando el navegador ya ha iniciado la descarga
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 1000);
    },
    exportarTodo: function() {
      let miJSON = null;

      try {
        miJSON = localStorage.getItem("usuarioLocal");
        if (miJSON !== null) {
          JSON.parse(miJSON);
        }
      } catch (error) {
        console.error("No se ha podido exportar los datos:", error);
        this.$q.notify({
          type: "negative",
          message: "No se han podido exportar los datos: están dañados"
        });
        return;
      }

      if (miJSON === null || miJSON === "") {
        this.$q.notify({
          type: "negative",
          message: "No hay datos que exportar"
        });
        return;
      }

      this.descargarFichero(
        miJSON,
        "DatosLetStudy" + new Date().toISOString().slice(0, 10) + ".json",
        "application/json;charset=utf-8"
      );

      // Notificamos la correcta exportacion
      this.$q.notify({
        type: "positive",
        message: "Exportado JSON de Let's study con éxito"
      });
    },
    exportarSesiones: function() {
      let miJSON = null;

      try {
        miJSON = JSON.parse(localStorage.getItem("usuarioLocal"));
      } catch (error) {
        console.error("No se ha podido exportar las sesiones:", error);
        this.$q.notify({
          type: "negative",
          message: "No se han podido exportar las sesiones: los datos están dañados"
        });
        return;
      }

      const sesiones =
        miJSON && miJSON.coleccionSesiones
          ? miJSON.coleccionSesiones.arraySesionesEstudio
          : null;

      if (!Array.isArray(sesiones)) {
        this.$q.notify({
          type: "negative",
          message: "No hay sesiones de estudio que exportar"
        });
        return;
      }

      // Aqui creamos el CSV (Comma Separated Values) que exportaremos
      // \r\n y el BOM inicial hacen que Excel abra bien los acentos
      let csv = "FechaInicio,FechaFin,Asignatura\r\n";
      // Por cada sesion de estudio, generamos una linea CSV
      for (let x in sesiones) {
        const sesion = sesiones[x];
        const asignatura =
          sesion.asignatura && sesion.asignatura.nombre
            ? sesion.asignatura.nombre
            : "";
        csv +=
          [sesion.inicioSesion, sesion.finSesion, asignatura]
            .map(escaparCSV)
            .join(",") + "\r\n";
      }

      this.descargarFichero(
        "\uFEFF" + csv,
        "SesionesLetStudy" + new Date().toISOString().slice(0, 10) + ".csv",
        "text/csv;charset=utf-8"
      );

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

      if (this.contenidoFichero.size > TAMANO_MAXIMO_FICHERO) {
        this.$q.notify({
          type: "negative",
          message: "El fichero es demasiado grande para ser de Let's Study"
        });
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
          this.contenidoFichero
            .text()
            .then(textoFichero => {
              let datos = null;

              // El fichero se valida antes de sobreescribir nada: un JSON
              // inválido o de otra app no debe perder los datos actuales
              try {
                datos = JSON.parse(textoFichero);
              } catch {
                this.$q.notify({
                  type: "negative",
                  message: "El fichero no contiene JSON válido"
                });
                return;
              }

              if (!datosSonValidos(datos)) {
                this.$q.notify({
                  type: "negative",
                  message: "El fichero no tiene el formato de datos de Let's Study"
                });
                return;
              }

              // Guardamos datos en localStorage
              localStorage.setItem("usuarioLocal", JSON.stringify(datos));
              // Recargamos localStorage
              const restaurado =
                FuncionesAuxiliares.restaurarEstadoLocalStorage();
              // Notificamos que se ha hecho correctamente la importacion
              this.$q.notify(
                restaurado
                  ? {
                      type: "positive",
                      message: "Datos importados con éxito"
                    }
                  : {
                      type: "negative",
                      message: "Los datos del fichero no se han podido importar"
                    }
              );
            })
            .catch(error => {
              console.error("No se ha podido leer el fichero:", error);
              this.$q.notify({
                type: "negative",
                message: "No se ha podido leer el fichero seleccionado"
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
          // Solo se borran las claves de la app: localStorage.clear()
          // borraría también datos de otras aplicaciones del mismo dominio
          localStorage.removeItem("usuarioLocal");
          localStorage.removeItem("usuarioLocal__respaldo");
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