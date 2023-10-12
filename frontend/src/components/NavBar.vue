<template>
    <v-layout>
      <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <v-app-bar-title class="ml-16">Juhi's Vue 3 project </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon v-if="!loggedIn" @click="logIn">mdi-door-closed-lock</v-icon>
          <v-icon v-else @click="logOut">mdi-logout</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </v-layout>
  <NavigationDrawer />
</template>

<script setup lang="ts">
import NavigationDrawer from './NavigationDrawer.vue';
import { useAuthUserStore } from '../stores/user';
import { computed } from 'vue'
import router from "../router";
import { UseSnackBar } from '../stores/useSnackBar';

const useSnackBar = UseSnackBar();
const authUserStore = useAuthUserStore();
const loggedIn = computed(() => authUserStore.isLoggedIn)
const logOut = () => {
  try {
    authUserStore.logOut()
  openSnackbar()
  } catch (error) {
    logOutError()
  }

}
const logIn = () => {
  router.push('/login')
}

const openSnackbar = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'Sikeres kijelentkezés!',
            color: 'success',
        }
    })
}

const logOutError = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'Sikertelen kijelentkezés!',
            color: 'error',
        }
    })
}
</script>