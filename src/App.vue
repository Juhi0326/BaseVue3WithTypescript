<script setup lang="ts">
import { provide } from 'vue'
import NavBar from './components/NavBar.vue';

const sharedFunction = () => {
  return 'This is the shared function';
};
const otherFunction = () => {
  return 'This is the other function';
};
  
provide('sharedFunction', sharedFunction);
provide('otherFunction', otherFunction)

</script>
<template>
  
    <NavBar />
    <v-app id="app">
    <router-view class="container"></router-view>
  </v-app>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
