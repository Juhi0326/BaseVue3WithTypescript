<template>
  <div v-if="user">
    name: {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
  </div>
  <div>Picture</div>

  <v-img v-if="user" :width="300" aspect-ratio="16/9" cover :src=user.picture.medium></v-img>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import randomUserService from '../services/randomUserService';

const user = ref()
const products = ref(null)

onMounted(async () => {
  user.value = await getData()
  products.value = await getProducts()
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


</script>
