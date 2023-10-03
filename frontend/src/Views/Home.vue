<template>
    státusz: {{ loggedIn }}
      <v-carousel style="width: 100%;">
        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover ></v-carousel-item>

        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
      </v-carousel>
    <div v-if="user">
      name: {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
    </div>
    <div>Picture</div>

    <CustomButtonComponent class="mx-2" @click="login" color="primary">login
    </CustomButtonComponent>
    <br>
    <br>

    <v-img v-if="user" :width="300" aspect-ratio="16/9" cover :src=user.picture.medium></v-img>

</template>

<script setup lang="ts">
import CustomButtonComponent from '../components/CustomButtonComponent.vue';
import { ref, onMounted, computed } from 'vue'
import randomUserService from '../composables/services/randomUserService';
import HomePageService from '../composables/services/useHomePageService';
import { useAuthUserStore } from '../stores/user';

const user = ref()
const products = ref(null)
const homePageData = ref(null)
const authUserStore = useAuthUserStore();
const loggedIn = computed(() => authUserStore.isLoggedIn)

const login = async () => {
  try {
    await authUserStore.login(authUserStore.$state, {email: 'juhiami@gmail.com', password: 'Juhi123*'}); 
  } catch (error) {
    console.log(error)
  }
};

onMounted(async () => {
  user.value = await getData()
  products.value = await getProducts()
  homePageData.value = await getHomePageData()
  console.log(JSON.stringify(products.value))

  //console.log(JSON.stringify(user.value))
})


const getData = async () => {
  try {
    const response = await randomUserService.getRandomUser()
    const randomUser = response.data
    return randomUser.results[0]
  } catch (error) {
    console.log(error)
  }
}
const getProducts = async () => {
  try {
    const response = await randomUserService.getProducts()
    const products = response.data
    return products
  } catch (error) {
    console.log(error)
  }
}

const getHomePageData = async () => {
  try {
    const response = await HomePageService.getHomePage()
    const data = response.data
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}


</script>
