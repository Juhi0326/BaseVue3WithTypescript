<template>
    <CustomForm v-model="formValidity">
        <v-slot>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg" color='form'>
                <v-img class="align-end text-white" height="150" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title class="mb-12">Regisztráció</v-card-title>
                </v-img>
                <v-row>
                    <v-col cols="11">
                        <v-text-field v-model="userName" label="Felhasználónév" class="mt-12 custom-background"
                            variant="outlined"
                            :rules="[requiredRules.required, dangerousCharactersRules.dangerousCharacter]"
                            prepend-inner-icon="mdi-account-outline" density="compact" ref="refUserName">
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-tooltip top>
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" class="mt-14">
                                    mdi-help-circle
                                </v-icon>
                            </template>
                            A felhasználónév maximum 64 karakter hosszú lehet.
                        </v-tooltip>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="11">
                        <v-text-field v-model="email" class="custom-background" density="compact" placeholder="Email cím"
                            prepend-inner-icon="mdi-email-outline" variant="outlined" label="Email" ref="refEmail"
                            :rules="[requiredRules.required, emailRules.regex]">
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-tooltip top>
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" class="mt-2">
                                    mdi-help-circle
                                </v-icon>
                            </template>
                            Az emailnek az általános email szabványnak kell megfelelnie.
                        </v-tooltip>
                    </v-col>
                </v-row>
                <PasswordInput 
                :mandatory=true
                ref="passwordInput" 
                :onPasswordChange="handlePasswordChange" 
                :passwordMatch = "passwordMatch"
                />
                <v-row>
                    <v-col cols="11">
                        <v-file-input v-model="fileInput" label="File feltöltés" accept="image/png, image/jpeg, image/bmp, image/jpg,"
                            variant="outlined" :rules="[avatarRules.tooBigFile]">
                        </v-file-input>
                    </v-col>
                    <v-col cols="1">
                        <v-tooltip top>
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" class="mt-2">
                                    mdi-help-circle
                                </v-icon>
                            </template>
                            Az alábbi kiterjesztésű file-okat töltheted fel: png, bmp, jpeg és jpg. A maximális méret 4 MB.
                        </v-tooltip>
                    </v-col>
                </v-row>
                <CustomButtonComponent block class="mb-8" color="aliceblue" size="large" variant="tonal" @click="submit"
                    :disabled="!formValidity || !passwordMatch">
                    Regisztrálok
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
import { emailRules, requiredRules, dangerousCharactersRules, avatarRules } from '../composables/validation/useValidation'
import { onMounted, ref } from 'vue'
import CustomButtonComponent from '../components/CustomButtonComponent.vue'
import authService from '../composables/services/useAuthService'
import { UseSnackBar } from '../stores/useSnackBar';
import PasswordInput from '../components/PasswordInput.vue'

const useSnackBar = UseSnackBar();
const email = ref('')
const userName = ref('')
const password = ref('')
const formValidity = ref(false)
const passwordMatch = ref(true)
const fileInput = ref([])
const refUserName = ref<HTMLFormElement | null>(null);
const refEmail = ref<HTMLFormElement | null>(null);
const refPassword = ref<HTMLFormElement | null>(null);
const refPassword2 = ref<HTMLFormElement | null>(null);
const passwordInput = ref<InstanceType<typeof PasswordInput> | null>(null)

const handlePasswordChange = (newPassword: string) => {
    password.value = newPassword;
};

onMounted(() => {
    if (refUserName.value) {
        refUserName.value.focus()
    }
})

const clearForm = () => {
    email.value = ''
    formValidity.value = false
    fileInput.value = []
    if (refUserName.value) {
        refUserName.value.reset()
    }
    if (refEmail.value) {
        refEmail.value.reset()
    }
    if (refPassword.value) {
        refPassword.value.reset()
    }
    if (refPassword2.value) {
        refPassword2.value.reset()
    }
    if (passwordInput.value) {
        passwordInput.value.clearForm()
    }
    
}

const submit = () => {
    handleRegisterForm()
    clearForm()
}

const handleRegisterForm = async () => {
    const user = new FormData();
    user.append("userName", userName.value);
    user.append("email", email.value);
    user.append("password", password.value);
    user.append("role", "user");
    user.append("userImage", fileInput.value[0]);

    for (var pair of user.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    try {
        const response = await authService.registerForm(user)
        console.log(response)
        openSnackbar()
    }
    catch (error) {
        console.log(error)
        registrationError()
    }
}

const openSnackbar = () => {
    useSnackBar.updateState(useSnackBar.$state, {
    snackbar: {
      visible: true,
      text: 'Sikeres regisztráció!',
      color: 'success',
    }
  })
}

const registrationError = () => {
    useSnackBar.updateState(useSnackBar.$state, {
    snackbar: {
      visible: true,
      text: 'Sikertelen regisztráció!',
      color: 'error',
    }
  })
}

</script>
 