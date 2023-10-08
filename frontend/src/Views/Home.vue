<template>
  <main>
    <div class="text-h1 font-weight-bold mb-12 pt-12" v-if="homePageData">
      {{ homePageData.Title.titleDescription }}
    </div>
    <br>
    <v-row class="mx-12">
      <v-col sm="12" md="6">
        <div class="mb-8 text-h3" v-if="homePageData">
          {{ homePageData.Heading.headingTitle }}
        </div>
        <div class="mb-8 text-h4" v-if="homePageData">
          {{ homePageData.Heading.headingDescription }}
        </div>
      </v-col>
      <v-col sm="12" md="6">>
        <v-img v-if="homePageData" class="bg-white" :aspect-ratio="1" :src="headingImagePath" height="300px"
          cover></v-img>
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col sm="12" md="6">>
        <v-img v-if="homePageData" class="bg-white" :aspect-ratio="1" :src="introductionImagePath" height="300px"
          cover></v-img>
      </v-col>
      <v-col sm="12" md="6">
        <div class="mb-8 text-h3" v-if="homePageData">
          {{ homePageData.Introduction.IntroductionTitle }}
        </div>
        <div class="mb-8 text-h4" v-if="homePageData">
          {{ homePageData.Introduction.introductionDescription }}
        </div>
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
const introductionImagePath = ref('')

onMounted(async () => {
  const data = await getHomePageData();
  if (data !== null) {
    homePageData.value = data;
    headingImagePath.value = "http://localhost:8081/" + homePageData.value?.Heading.headingImagePath
    introductionImagePath.value = "http://localhost:8081/" + homePageData.value?.Introduction.introductionImagePath
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
