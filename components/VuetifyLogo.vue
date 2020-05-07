<template>
  <!--<img class="VuetifyLogo" alt="Vuetify Logo" src="/vuetify-logo.svg" />-->
  <!--  <v-expand-x-transition>-->
  <img class="VuetifyLogo" alt="Vuetify Logo" src="/logo_800.png" />
  <!--  </v-expand-x-transition>-->
</template>

<style>
.VuetifyLogo {
  height: 180px;
  transform: rotateY(360deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
