<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav
          @click="toggleRail">
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="toggleRail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-tooltip text="Home" :open-on-hover="showTooltip">
            <template v-slot:activator="{ props }">
              <v-list-item prepend-icon="mdi-home-city" v-bind="props" title="Home" value="home" @click="goToHome">
              </v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Hello World" :open-on-hover="showTooltip">
            <template v-slot:activator="{ props }">
              <v-list-item prepend-icon="mdi-bed-double-outline " v-bind="props" title="Hello World" value="hello-world"
                @click="goToHelloWorld">
              </v-list-item>
            </template>
          </v-tooltip>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="max-height: 850px"></v-main>
    </v-layout>
  </v-card>
</template>
  

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDisplay } from 'vuetify'
import router from "../router";
// Destructure only the keys you want to use
const { sm, xs, md, lg } = useDisplay();
const isSm = ref(sm);
const isXs = ref(xs);
const isMd = ref(md)
const isLg = ref(lg)
const drawer = ref(true);
const rail = ref(false);
const showTooltip = ref(false)


const toggleRail = () => {
  if (!(isSm.value || isXs.value || isMd.value || isLg.value)) {
    rail.value = !rail.value;
  }
  if (rail.value) {
    showTooltip.value = true
  } else {
    showTooltip.value = false
  }
};

const goToHome = () => {
  router.push('/')
}
const goToHelloWorld = () => {
  router.push('/hello-world')
}


watch(isLg, (newVal) => {
  if (newVal) {
    rail.value = true; // Set rail to true when sm is true
  } else {
    console.log('lg is not true');
  }
});

watch(isMd, (newVal) => {
  if (newVal) {
    rail.value = true; // Set rail to true when sm is true
  } else {
    console.log('md is not true');
  }
});

watch(isSm, (newVal) => {
  if (newVal) {
    rail.value = true; // Set rail to true when sm is true
  } else {
    console.log('sm is not true');
  }
});

watch(isXs, (newVal) => {
  if (newVal) {
    rail.value = true; // Set rail to true when xs is true
  } else {
    console.log('xs is not true');
  }
});
</script>