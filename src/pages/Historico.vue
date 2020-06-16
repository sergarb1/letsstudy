<!-- Componente que mostrará el Histórico de un usuario -->
<template>
  <div> 
    <!--hacemos copypaste del componente de tarjeta que más nos gusta.
    Como el v-for lo queremos hacer en un componente propio necesitamos usar v-bind
    para que actualice bien los datos, por eso se usa :key, ya que de no utilizarlo diria 
    que "fecha" no ha sido definido-->
    <h2 class="doc-heading doc-h2">Histórico de Estudio</h2>
    <!-- usamos la directiva bind para que con cada tarjeta(a la que se le ha puesto una transicion
     con q-intersection) que obtenga le ponga un color de 
    fondo diferente usando el metodo claseColorFondo()-->
   <q-intersection  transition="rotate">
  
      <q-card class="my-card" v-for="(fecha,i) in fechas" :key="i">
        <q-card-section class="text-white" :class="claseColorFondo()">
          <div class="text-h6" v-text="fecha[0]"></div>
          <div class="text-subtitle2" v-text="fecha[1]"></div>
        </q-card-section>
      </q-card>
      
   </q-intersection>
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
      //Datos de ejemplo
      fechas: []
    };
  },
  // funcion ejecutada al crearse el componente
  created: function() {
    const arraySesiones = Usuario.$usuarioLocal.getColeccionSesiones().getSesiones();
    arraySesiones.forEach(sesion => {
      let dia = sesion.getInicioSesion().toDateString();
      let segundos = FuncionesAuxiliares.segundosEntreFechas(sesion.getFinSesion(),sesion.getInicioSesion());
      this.fechas.push([dia,FuncionesAuxiliares.segundosToText(segundos)]);
    });
  },
  //metodos para cambiar el color de las card  y que no sean todos del mismo color 
  methods: {
    ColorTarjeta() {
      //creamos una lista con los colores de quasar/vue
      let colores = [
        "light-blue-6",
        "light-blue-7",
        "light-blue-8",
        "light-blue-9",
      ];
      //creamos funcion que nos de un numero aleatorio dentro del tamaño de nuestra lista
      let random = () => Math.floor(Math.random()*3+1);
      //devolvemos un color aleatorio
      return colores[random()];
    },
    //metodo para cambiar la clase de cada tarjeta
    claseColorFondo() {
      //es una combinacion de "bg" y el color aleatorio que nos devuelve el metodo anterior
      return "bg-" + this.ColorTarjeta();
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