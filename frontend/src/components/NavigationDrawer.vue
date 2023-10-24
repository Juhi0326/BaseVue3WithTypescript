<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer :rail="true" permanent class="mt-16 drawer" color="teal-lighten-5" rail-width="82">
        <br>
        <v-list class="ml-3" v-if="loggedIn">
          <v-tooltip text="User Profile" :open-on-hover="true" v-if="userImage">
            <template v-slot:activator="{ props }">
              <v-list-item class="ml-n1" v-bind="props">
                <v-avatar color="red" size="36" :style="{
                  cursor: 'pointer'
                }">
                  <v-img :src="userImage"></v-img>
                </v-avatar>
              </v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="User Profile 2" :open-on-hover="true" v-else>
            <template v-slot:activator="{ props }">
              <v-list-item class="ml-n1" v-bind="props">
                <v-avatar color="red" size="36" :style="{
                  cursor: 'pointer'
                }">
                  <span class="text-h8">{{ monogram }}</span>
                </v-avatar>
              </v-list-item>
            </template>
          </v-tooltip>
        </v-list>

        <v-divider class="mt-4" v-if="loggedIn"></v-divider>


        <v-list density="compact" nav class="mt-3 ml-3">
          <v-tooltip text="Home" :open-on-hover="true">
            <template v-slot:activator="{ props }">
              <v-list-item prepend-icon="mdi-home-city" v-bind="props" title="Home" value="home" @click="goToHome">
              </v-list-item>
            </template>
          </v-tooltip>
          <v-tooltip text="Hello World" :open-on-hover="true">
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
import { computed } from "vue";
import router from "../router";
import { useAuthUserStore } from '../stores/user';

const authUserStore = useAuthUserStore();
const loggedIn = computed(() => authUserStore.isLoggedIn)
const userImage = computed(() => authUserStore.userImage)
const monogram = computed(() => authUserStore.userMonogram)


const goToHome = () => {
  router.push('/')
}
const goToHelloWorld = () => {
  router.push('/hello-world')
}
</script>

<style scoped>
.drawer {
  opacity: 0.7;
}
</style>