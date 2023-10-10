<template>
  <SnackBar top/>
  <NavBar />
  <v-app id="app">
    <div :class="contentContainerClass">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </v-app>
  <FooterComponent />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import NavBar from './components/NavBar.vue';
import SnackBar from './components/CustomSnackBar.vue';

import FooterComponent from './components/FooterComponent.vue';
import { useDisplay } from 'vuetify';

const { xs, sm, md, lg } = useDisplay();

const contentContainerClass = xs || sm || md || lg ? '' : 'content-container';

const sharedFunction = () => {
  return 'This is the shared function';
};
const otherFunction = () => {
  return 'This is the other function';
};

provide('sharedFunction', sharedFunction);
provide('otherFunction', otherFunction)

</script>

<style scoped>
.content-container {
  margin-left: 266px;
  /* Adjust this value as needed */
}

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

.v-theme--light {
  background: none;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
