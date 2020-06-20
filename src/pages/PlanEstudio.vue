<template>
  <q-page class="flex flex-center content-start">
    <div class="column justify-center q-gutter-sm" style="height: 250px">
      <img alt="Lets Study logo" src="~assets/LETSSTUDY_2.png" />
    </div>

    <q-intersection transition="scale">
      <q-card
        class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-left no-border-radius"
      >
        <q-card-section>
          <h5>prueba prueba</h5>
          <div class="text-subtitle1">
            rpeuba
          </div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item class="justify-start">
              <q-btn
                push
                rounded
                size="sm"
                color="primary"
                icon="code"
                label="Proyecto Let's Study en Github"
                
              />
            </q-item>
            <q-item class="justify-start">
              <q-btn
                push
                rounded
                size="sm"
                color="primary"
                icon="get_app"
                label="Let's Study en Google Play"
                
              />
            </q-item>
            <q-item class="justify-start">
              <q-btn
                push
                rounded
                size="sm"
                color="primary"
                icon="cloud"
                label="Let's Study (Online)"
                
              />
            </q-item>
            <q-item class="justify-start">
              <q-btn
                push
                rounded
                size="sm"
                color="primary"
                icon="desktop_windows"
                label="Let's Study para Escritorio"
                
              />
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-intersection>
  </q-page>
</template>

<script>
</script>

<style>
</style>