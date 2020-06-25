<!-- Componente que mostrará el Histórico de un usuario -->
<template>
  <div v-touch-swipe.mouse.horizontal="userHasSwiped">
    <div class="q-pa-md col-8 q-gutter-md">
      <div class="flex flex-center column" style="height:20vh;">
        <img alt="Lets Study logo" src="~assets/Sesiones.png" />
      </div>
    </div>
    <div v-if="sesiones != null">
      <div v-if="sesiones.length == 0" :class="Noinfo()">
        <h2 class="doc-heading doc-h2">Sin datos</h2>
        <!--comprobamos que no existan registros y llamamos el metodo Noinfo() el cual salta una notificación con un mensaje-->
      </div>
      <div v-else>
        <!--hacemos copypaste del componente de tarjeta que más nos gusta.
      Como el v-for lo queremos hacer en un componente propio necesitamos usar v-bind
      para que actualice bien los datos, por eso se usa :key, ya que de no utilizarlo diria 
        que "fecha" no ha sido definido-->
        <!-- usamos la directiva bind para que con cada tarjeta(a la que se le ha puesto una transicion
      con q-intersection) que obtenga le ponga un color de 
        fondo diferente usando el metodo claseColorFondo()-->
        <q-card class="my-card" v-for="(sesion, i) in sesiones.slice().reverse()" :key="i">
          <q-card-section class="text-white bg-light-blue">
            <!-- Se usará el moustache {{}} para llamar a sesion.asignatura -->
            <div
              class="text-h6 Oswald"
            >{{ sesion.asignatura.nombre }} - {{ devuelveFechaFormat(sesion.inicioSesion) }}</div>
            <div class="text-body2 Oswald">{{ devuelveDuracionFormat(sesion) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
// Importo la clase FuncionesAuxiliares
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import Usuario from "../clases/Usuario.js";

export default {
  name: "Historico",
  data() {
    return {
      // Objeto que guarda todas las sesiones
      sesiones: null
    };
  },
  mounted: function() {
    //Rellenammos el objeto sesiones con todas las sesiones
    this.sesiones = Usuario.$usuarioLocal.getColeccionSesiones().getSesiones();
  },
  //metodos para cambiar el color de las card  y que no sean todos del mismo color
  methods: {
    //Método que recibe una fecha y la muestra con el formato que se ve en la app
    devuelveFechaFormat(fecha) {
      return (
        fecha.toLocaleDateString() +
        " a las " +
        fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    },
    //Método que recibe una sesión y devuelve el tiempo en segundos, formateada para mostrar
    devuelveDuracionFormat(sesion) {
      let segundos = FuncionesAuxiliares.segundosEntreFechas(
        sesion.getFinSesion(),
        sesion.getInicioSesion()
      );
      return "Duración: " + FuncionesAuxiliares.segundosToText(segundos);
    },
    Noinfo() {
      this.$q.notify({
        message: " No tienes ningún registro ",
        caption: " ¡ Empieza a estudiar ahora ! ",
        color: "light-blue-4",
        position: "center"
      });
    },
    userHasSwiped(obj) {
      // Si el gesto no dura un minimo, lo quitamos
      if (obj.duration < 100) {
        return;
      }
      // Comprobamos direccion del gesto y actuamos
      if (obj.direction === "right") {
        this.$router.push("/Cronometro");
      }
      // Comprobamos direccion del gesto y actuamos
      if (obj.direction === "left") {
        this.$router.push("/PlanEstudio");
      }
    }
  }
};
</script>
<!--Damos estilo al titulo y centramos las cards-->
<style lang="sass" scoped>
.doc-heading
  color: #1976D2
.doc-h2
  font-size: 1.5rem
  line-height: 1.5rem
  padding: 0.5rem
  font-weight: 500
  border-bottom: 1px solid #ccc
  margin: 4rem 0 1.5rem
.my-card.q-card
  margin-bottom: 1.5rem
  width: 80%
  margin: 1.5rem auto
</style>