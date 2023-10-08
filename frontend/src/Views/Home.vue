<template>
  <main>
    <div class="text-h1 font-weight-bold mb-4 pt-12" v-if="homePageData">
      {{ homePageData.Title.titleDescription }}
    </div>
    <v-row class="mt-12">
      <v-col cols="6">
        <div class="mb-8 text-h3" v-if="homePageData">
          {{ homePageData.Heading.headingDescription }}
        </div>
        <v-img
        v-if="homePageData"
        class="bg-white"
       
        :aspect-ratio="1"
        :src="headingImagePath" height="300px"
        cover
      ></v-img>
      </v-col>
    </v-row>


  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HomePageService from '../composables/services/useHomePageService';
import HomePageInterface from '../composables/interfaces/useHomePageInterface'

const homePageData = ref<HomePageInterface | null>(null)
const headingImagePath = ref('')

onMounted(async () => {
  const data = await getHomePageData();
  if (data !== null) {
    homePageData.value = data;
    headingImagePath.value = "http://localhost:8081/" + homePageData.value?.Heading.headingImagePath
  }
});


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
