<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer :rail="true" permanent class="mt-16 drawer" color="teal-lighten-5" rail-width="82">
        <br>
        <v-list class="ml-3" v-if="loggedIn">
          <v-menu open-on-hover v-if="userImage" location="end" offset="20">
            <template v-slot:activator="{ props }">
              <v-list-item class="ml-n1" v-bind="props">
                <v-avatar color="red" size="36" :style="{
                  cursor: 'pointer'
                }">
                  <v-img :src="userImage"></v-img>
                </v-avatar>
              </v-list-item>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                
                <v-list-item-title>
                <router-link :to="item.route" class="r-link-primary">
                  {{ item.title }}
                </router-link>
                </v-list-item-title>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu open-on-hover v-else location="end" offset="20">
            <template v-slot:activator="{ props }">
              <v-list-item class="ml-n1" v-bind="props">
                <v-avatar color="red" size="36" :style="{
                  cursor: 'pointer'
                }">
                  <span class="text-h8">{{ monogram }}</span>
                </v-avatar>
              </v-list-item>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                
                <v-list-item-title>
                <router-link :to="item.route" class="r-link-primary">
                  {{ item.title }}
                </router-link>
                </v-list-item-title>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list>

        <v-divider class="mt-4" v-if="loggedIn"></v-divider>


        <v-list density="compact" nav class="mt-3 ml-3">
          <v-tooltip text="Home" :open-on-hover="true" v-if="currentRoute !== '/'">
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
          <v-tooltip text="Admin stage" :open-on-hover="true">
            <template v-slot:activator="{ props }">
              <v-list-item prepend-icon="mdi-account" title="My Account" v-bind="props" value="account"
                v-if="userRole === 'admin'">
              </v-list-item>
            </template>
          </v-tooltip>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="max-height: 850px"></v-main>
    </v-layout>
  </v-card>
</template>
  

<script setup lang="ts">
import { computed, ref } from "vue";
import router from "../router";
import { useAuthUserStore } from '../stores/user';

const authUserStore = useAuthUserStore();
const loggedIn = computed(() => authUserStore.isLoggedIn)
const userImage = computed(() => authUserStore.userImage)
const monogram = computed(() => authUserStore.userMonogram)
const userRole = computed(() => authUserStore.userRole)
const userId = computed( ()=> authUserStore.userId)
const currentRoute = computed(() => router.currentRoute.value.fullPath)

const items = ref([
  { title: "Profil áttekintése", route: "mydata/" + userId},
  { title: "Rendeléseim", route: "/" },
])

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