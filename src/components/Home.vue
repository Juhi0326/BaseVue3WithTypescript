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

onMounted(async () => {
  user.value = await getData()
  console.log(JSON.stringify(user.value))
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


</script>
