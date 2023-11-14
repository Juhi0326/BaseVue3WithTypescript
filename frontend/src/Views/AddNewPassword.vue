<template>
    <div>
        <CustomForm v-model="formValidity">
            <v-slot>
                <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg" color='form'>
                    <v-img class="align-end text-white" height="150" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        cover>
                        <v-card-title class="mb-12">Új jelszó megadása</v-card-title>
                    </v-img>
                    <br>
                    <PasswordInput class="mt-6" ref="passwordInput2" :onPasswordChange="handlePasswordChange"
                        :passwordMatch="passwordMatch" />
                    <CustomButtonComponent block class="mb-8" color="aliceblue" size="large" variant="tonal" @click="submit"
                        :disabled="!formValidity || !passwordMatch">
                        Megadom az új jelszót
                    </CustomButtonComponent>
                    <v-card-text class="text-center" v-if="PasswordChanged">
                        <router-link class="r-link" to='/login'>Most már beléphetsz az új jelszavaddal!!</router-link>
                    </v-card-text>
                </v-card>
            </v-slot>
        </CustomForm>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import CustomForm from '../components/CustomForm.vue';
import CustomButtonComponent from '../components/CustomButtonComponent.vue'
import authService from '../composables/services/useAuthService'
import { UseSnackBar } from '../stores/useSnackBar';
import PasswordInput from '../components/PasswordInput.vue'
import { useRoute } from 'vue-router';

const useSnackBar = UseSnackBar();
const password = ref('')
const formValidity = ref(false)
const passwordMatch = ref(true)
const id = ref('')
const token = ref('')
const passwordInput2 = ref<InstanceType<typeof PasswordInput> | null>(null)
const PasswordChanged = ref(false)

onMounted(() => {
    const route = useRoute();
    id.value = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    token.value = decodeURIComponent(Array.isArray(route.params.token) ? route.params.token[0] : route.params.token);
    console.log(token.value)
});

const handlePasswordChange = (newPassword: string) => {
    password.value = newPassword;
};

const handleNewPasswordForm = async () => {
    try {
        const response = await authService.receiveNewPassword(id.value, token.value, { password: password.value })
        console.log(response)
        console.log('ez a password típusa: ' + typeof password.value)
        openSnackbar()
        PasswordChanged.value = true
    } catch (error) {
        console.log(error)
        console.log('ez a password típusa: ' + typeof password.value)
        addNewPasswordError()
    }
}
const addNewPasswordError = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'Sikertelen jelszó módosítás!',
            color: 'error',
        }
    })
}
const openSnackbar = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'A jelszó sikeresen megváltozott!',
            color: 'success',
        }
    })
}
const submit = () => {
    handleNewPasswordForm()
    clearForm()
}
const clearForm = () => {
    formValidity.value = false
    if (passwordInput2.value) {
        passwordInput2.value.clearForm()
    }
    /*     if (refPassword.value) {
            refPassword.value.reset()
        }
        if (refPassword2.value) {
            refPassword2.value.reset()
        } */
}

</script>