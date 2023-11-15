<template>
    <CustomForm v-model="formValidity">
        <v-slot>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg" color='form'>
                <v-img class="align-end text-white" height="150" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title class="mb-12">Új jelszó igénylése</v-card-title>
                </v-img>
                <v-card-title class="pa-12">Elfelejtetted a jelszavad?</v-card-title>
                <v-divider> </v-divider>
                <v-card-text>
                    Egyet se félj, csak add meg az email címedet, és kattints az
                    Küldés gombra! Az emailben majd kattints a linkre, de arra vigyázz, hogy az elküldéstől számított 1 órán
                    belül
                    szükséges megadni az új jelszót.
                </v-card-text>
                <v-text-field ref="emailValue" v-model="email" class="mt-12 custom-background" density="compact" placeholder="Email cím"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"
                    :rules="[requiredRules.required, emailRules.regex]">
                </v-text-field>

                <CustomButtonComponent block class="mb-8" color="aliceblue" size="large" variant="tonal"
                    :disabled="!formValidity" @click="submit">
                    Küldés
                </CustomButtonComponent>
                <v-card-text class="text-center">
                        <router-link class="r-link" to='/login'>Hopp eszembe jutott, visszamegyek, belépek!</router-link>
                    </v-card-text>
            </v-card>
        </v-slot>
    </CustomForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import authService from "../composables/services/useAuthService";
import axios, { AxiosError } from "axios";
import CustomButtonComponent from '../components/CustomButtonComponent.vue'
import { UseSnackBar } from '../stores/useSnackBar';
import CustomForm from '../components/CustomForm.vue';
import { emailRules, requiredRules } from '../composables/validation/useValidation'

const email = ref('')
const errorMessage = ref('')
const useSnackBar = UseSnackBar();
const formValidity = ref(false)
const emailValue = ref<HTMLFormElement | null>(null);

const sendEmail = async () => {
    try {
        const response = await authService.sendResetPasswordEmail(email.value)
        console.log('ezt én írom ki' + response.data)
        errorMessage.value = ''
        openSnackbarSuccess()
        clear()
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                errorMessage.value = axiosError.response.data as string;
            }
        } else {
            console.log('ez az error? ' + error);
            openSnackbarError()
            clear()
        }
    }
}

const openSnackbarSuccess = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'A jelszóigénylés sikeresen megtörtént!',
            color: 'success',
        }
    })
}

const openSnackbarError = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'A jelszóigénylés nem sikerült!',
            color: 'error',
        }
    })
}

const submit = () => {
    console.log('ide bejön')
    sendEmail()
}

const clear = () => {
    if (emailValue.value) {
        emailValue.value.reset()
    }
}


</script>

<style scoped></style>