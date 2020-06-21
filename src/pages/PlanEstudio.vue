<template>
  <q-page class="flex column q-pa-md col-8 q-a-md">
    <h3 class="doc-heading doc-h3 q-ma-xs">Plan de estudio</h3>
    <div class="flex flex-center q-mt-md">
      <h4 class="doc-heading doc-h4 q-ma-xs text-weight-light">Objetivos</h4>
    </div>
    <!-- Lista de objetivos, cada q-item representa un objetivo -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Objetivo diario:
            <span class="text-weight-bold">
              <!-- Sustituir aquí con {{}} por las horas -->
              2h
            </span>
          </q-item-label>
        </q-item-section>
          <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top>
          <q-icon name="settings" color="gray" />
        </q-item-section>
        <q-item-section side top>
          <q-icon name="delete_forever" color="red" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Objetivo semanal:
            <span class="text-weight-bold">
              <!-- Sustituir aquí con {{}} por las horas -->
              12h
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon name="settings" color="gray" />
        </q-item-section>
        <q-item-section side top>
          <q-icon name="delete_forever" color="red" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Objetivo mensual:
            <span class="text-weight-bold">
              <!-- Sustituir aquí con {{}} por las horas -->
              60h
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon name="settings" color="gray" />
        </q-item-section>
        <q-item-section side top>
          <q-icon name="delete_forever" color="red" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="flex flex-center q-mt-md">
      <h4 class="doc-heading doc-h4 q-ma-xs text-weight-light">Asignaturas</h4>
    </div>
    <!-- Lista de asignaturas, habría que hacer un bucle for con el q-item -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Sistemas informáticos
          </q-item-label>
        </q-item-section>
          <!-- aplicar con @click la acción necesaria dentro de estas secciones -->
        <q-item-section side top>
          <q-icon name="settings" color="gray" />
        </q-item-section>
        <q-item-section side top>
          <q-icon name="delete_forever" color="red" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-light">
            Programación
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon name="settings" color="gray" />
        </q-item-section>
        <q-item-section side top>
          <q-icon name="delete_forever" color="red" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PlanEstudio",
  data: function() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>

</style>