<template>
    <v-form @submit.prevent="submit">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg" color="primary">
            <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
                <v-card-title class="mb-12">Bejelentkezés</v-card-title>
            </v-img>
            <v-text-field v-model="email" class="mt-12 custom-background" density="compact" placeholder="Email cím"
                prepend-inner-icon="mdi-email-outline" variant="outlined">
            </v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <span class="text">Jelszó</span> 
                <router-link class="r-link" to='/reset-password-email'>Elfelejtetted a jelszavadat?</router-link>
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Gépeld be a jelszavad"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>
            <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption white-text" >
                    Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
                    hours. If you must login now, you can also click "Forgot login password?" below to reset the login
                    password.
                </v-card-text>
            </v-card>

            <CustomButtonComponent block class="mb-8" color="aliceblue" size="large" variant="tonal" type="submit">
                Log In
            </CustomButtonComponent>

            <v-card-text class="text-center">
                <router-link class="r-link" to='/register'>Regisztrálj most!</router-link>
            </v-card-text>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthUserStore } from '../stores/user';
import router from "../router";
import CustomButtonComponent from '../components/CustomButtonComponent.vue'

const visible = ref(false)
const email = ref('')
const password = ref('')
const authUserStore = useAuthUserStore();

const clearForm = () => {
    email.value = ''
    password.value = ''
}
const login = async () => {
    try {
        await authUserStore.login(authUserStore.$state, { email: email.value, password: password.value });
        clearForm()
        goToHomePage()
    } catch (error) {
        console.log(error)
    }
};

const goToHomePage = () => {
    router.push('/')
}

const submit = () => {
    login()
}
    
</script>

<style scoped>
.v-input__control {
    background-color: aliceblue;
}
.r-link {
    color: #FF8A80;
}
.text {
    color: aliceblue;
}
</style>