<template>
    <CustomForm>
        <v-slot>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg" color='form'>
            <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
                <v-card-title class="mb-12">Regisztráció</v-card-title>
            </v-img>
            <v-text-field v-model="email" class="mt-12 custom-background" density="compact" placeholder="Email cím"
                prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="[requiredRules.required, emailRules.regex]">
            </v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <span class="text">Jelszó</span>
                <router-link class="r-link" to='/reset-password-email'>Elfelejtetted a jelszavadat?</router-link>
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Gépeld be a jelszavad"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>
            <CustomButtonComponent 
                block 
                class="mb-8" 
                color="aliceblue" 
                size="large" 
                variant="tonal" 
                @click="submit"
                :disabled="email === ''||password === ''">
                Log In
            </CustomButtonComponent>

            <v-card-text class="text-center">
                <router-link class="r-link" to='/register'>Regisztrálj most!</router-link>
            </v-card-text>
        </v-card>

        </v-slot>
    </CustomForm>

    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          :rules="[requiredRules.required, emailRules.regex]"
          clearable
          label="Email"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          :rules="[requiredRules.required, dangerousCharactersRules.dangerousCharacter]"
          clearable
          label="sima input"
        ></v-text-field>
      </v-col>
    </v-row>

  </template>
  
 
 <script setup lang="ts">
 import CustomForm from '../components/CustomForm.vue';
 import { emailRules, requiredRules, dangerousCharactersRules } from '../composables/validation/useValidation'
 import { ref } from 'vue'
 import CustomButtonComponent from '../components/CustomButtonComponent.vue'


 const visible = ref(false)
 const email = ref('')
 const password = ref('')


 const submit = () => {
    console.log(`ez az email ${email.value}, és ez a password: ${password.value}`)
    
 }



 </script>
 