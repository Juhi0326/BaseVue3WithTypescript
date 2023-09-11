<script setup lang="ts">
import { ref, onMounted } from 'vue'
import randomUserService from '../services/randomUserService';

const user = ref()

onMounted( async () => {
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

<template>
  <div>
    Home component
  </div>
</template>