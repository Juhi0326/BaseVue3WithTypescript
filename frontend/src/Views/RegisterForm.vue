<template>
    <CustomForm>
        <v-slot>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg" color='form'>
                <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title class="mb-12">Regisztráció</v-card-title>
                </v-img>
                <v-text-field v-model="userName" label="Felhasználónév" class="mt-12 custom-background" variant="outlined"
                    :rules="[requiredRules.required, dangerousCharactersRules.dangerousCharacter]"
                    prepend-inner-icon="mdi-account-outline" density="compact">
                </v-text-field>
                <v-text-field v-model="email" class="custom-background" density="compact" placeholder="Email cím"
                    prepend-inner-icon="mdi-email-outline" variant="outlined" label="Email"
                    :rules="[requiredRules.required, emailRules.regex]">
                </v-text-field>

                <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Gépeld be a jelszavad"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    label="Jelszó"
                    :rules="[requiredRules.required, dangerousCharactersRules.dangerousCharacter]"></v-text-field>
                <CustomButtonComponent block class="mb-8" color="aliceblue" size="large" variant="tonal" @click="submit"
                    :disabled="email === '' || password === ''">
                    Ragisztrálok
                </CustomButtonComponent>

                <v-card-text class="text-center">
                    <router-link class="r-link" to='/login'>Ha már regisztráltál, lépj be!</router-link>
                </v-card-text>
            </v-card>

        </v-slot>
    </CustomForm>
</template>
  
 
<script setup lang="ts">
import CustomForm from '../components/CustomForm.vue';
import { emailRules, requiredRules, dangerousCharactersRules } from '../composables/validation/useValidation'
import { ref } from 'vue'
import CustomButtonComponent from '../components/CustomButtonComponent.vue'


const visible = ref(false)
const email = ref('')
const userName = ref('')
const password = ref('')


const submit = () => {
    console.log(`ez az email ${email.value}, és ez a password: ${password.value}`)

}



</script>
 