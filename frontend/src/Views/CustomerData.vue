<template>
    <ConfirmDialog ref="confirm"></ConfirmDialog>
    <v-card class="mx-auto mt-12 pa-12 pb-8" elevation="8" max-width="600" rounded="lg" color='form'>
        <v-img :src="userImage" height="300px"></v-img>

        <v-card-title> Felhasználónevem: {{ user?.userName }} </v-card-title>
        <v-card-title> Email címem: {{ user?.email }} </v-card-title>
        <v-card-title> Felhasználói jogköröm: {{ user?.role }} </v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle>
            A jelszó biztonsági okokból nem látható
        </v-card-subtitle>

        <v-card-actions>
            <CustomButtonComponent color=#FF8A80 @click="toggleShow">
                {{ Text }}
            </CustomButtonComponent>
            <v-spacer></v-spacer>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <br />
                <v-card-subtitle>
                    Elég csak azt a mezőt kitölteni, amit módosítani szeretnél!
                </v-card-subtitle>

                <CustomForm
                    @submit.prevent="changData('Adat módosítás', 'Biztosan meg szeretnéd változtatni az adataidat?')"
                    ref="changeDataForm" v-model="formValidity">
                    <v-slot>
                        <v-row>
                            <v-col cols="11">
                                <v-text-field v-model="userName" label="Felhasználónév" class="mt-12 custom-background"
                                    variant="outlined" :rules="[dangerousCharactersRules.dangerousCharacter]"
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
                                <v-text-field v-model="email" density="compact"
                                    placeholder="Email cím" prepend-inner-icon="mdi-email-outline" variant="outlined"
                                    label="Email" ref="refEmail" :rules="[emailRules2.regex]">
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

                        <PasswordInput :mandatory=false ref="passwordInput" :onPasswordChange="handlePasswordChange"
                            :passwordMatch="passwordMatch" />
                        <v-row>
                            <v-col cols="11">
                                <v-file-input v-model="fileInput" label="File feltöltés"
                                    accept="image/png, image/jpeg, image/bmp, image/jpg," variant="outlined"
                                    :rules="[avatarRules.tooBigFile]" ref="refFileInput">
                                </v-file-input>
                            </v-col>
                            <v-col cols="1">
                                <v-tooltip top>
                                    <template v-slot:activator="{ props }">
                                        <v-icon v-bind="props" class="mt-2">
                                            mdi-help-circle
                                        </v-icon>
                                    </template>
                                    Az alábbi kiterjesztésű file-okat töltheted fel: png, bmp, jpeg és
                                    jpg. A maximális méret 4 MB.
                                </v-tooltip>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <CustomButtonComponent class="ma-3" color="primary" :dark="formValidity" type="submit"
                                    :disabled="!formValidation">
                                    Elküldöm a módosítást!
                                </CustomButtonComponent>
                            </v-col>
                        </v-row>
                    </v-slot>
                </CustomForm>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthUserStore } from '../stores/user';
import { emailRules2, dangerousCharactersRules, avatarRules } from '../composables/validation/useValidation'
import CustomForm from '../components/CustomForm.vue';
import { UseSnackBar } from '../stores/useSnackBar';
import PasswordInput from '../components/PasswordInput.vue'
import CustomButtonComponent from '../components/CustomButtonComponent.vue'
import useUserService from '../composables/services/useUserService';
import ConfirmDialog from '../components/ConfirmDialog.vue'

const confirm = ref<InstanceType<typeof ConfirmDialog> | null>(null)
const passwordInput = ref<InstanceType<typeof PasswordInput> | null>(null)
const useSnackBar = UseSnackBar();
const show = ref(false)
const passwordMatch = ref(true)
const email = ref('')
const userName = ref('')
const password = ref('')
const formValidity = ref(false)
const fileInput = ref([])
const fieldCounter = ref(0)
const userNameCount = ref(0)
const emailCount = ref(0)
const passwordCount = ref(0)
const FILECount = ref(0)
const refEmail = ref<HTMLFormElement | null>(null);
const refUserName = ref<HTMLFormElement | null>(null);
const refFileInput = ref<HTMLFormElement | null>(null);
const authUserStore = useAuthUserStore();
const formValidation = computed(() => {

    userName.value ? (userNameCount.value = 1) : (userNameCount.value = 0);
    email.value ? (emailCount.value = 1) : (emailCount.value = 0);
    password.value ? (passwordCount.value = 1) : (passwordCount.value = 0);
    if (Array.isArray(fileInput.value)) {
        fileInput.value.length ? FILECount.value = 1 : FILECount.value = 0
    } else {
        FILECount.value = 0
    }
    fieldCounter.value =
        userNameCount.value + emailCount.value + passwordCount.value + FILECount.value;

    if (fieldCounter.value > 0 && formValidity.value != false) {
        return true;
    } else {
        return false;
    }
})
const userImage = computed(() => authUserStore.userImage)
const user = computed(() => authUserStore.initialState.user)
const Text = computed(() => {
    if (!show.value) {
        return 'Módosítom az adatokat'
    } else {
        return 'Mégsem'
    }
})

const toggleShow = () => {
    show.value = !show.value;
};

const changData = async (titleProp: string, messageProp: string) => {
    const result = confirm.value && await confirm.value.openDialog(titleProp, messageProp)
    const id = authUserStore.userId
    const user = new FormData();
    if (userName.value !== '') {
        user.append("userName", userName.value);
    }
    if (email.value !== '') {
        user.append("email", email.value);
    }
    if (password.value !== '') {
        user.append("password", password.value);
    }
    if (fileInput.value) {
        user.append("userImage", fileInput.value[0]);
    }
    if (result) {
        try {
            if (id) {
                const response = await useUserService.changeMyDataById(id, user)
                console.log(response)
                try {
                    const updatedUser = await useUserService.getUserById(id)
                    let permanentState = JSON.parse(JSON.stringify(authUserStore.$state.initialState));
                    if (permanentState.user) {
                        permanentState.user.userName = updatedUser?.data.userName
                        permanentState.user.email = updatedUser?.data.email
                        permanentState.user.userImage = updatedUser?.data.userImage
                    }
                    authUserStore.updateState(authUserStore.$state, permanentState)

                    openSnackbar()
                    clearForm()
                } catch (error) {
                    console.log(error)
                    SnackbarError()
                }
            }
        } catch (error) {
            console.log(error)
            SnackbarError()
        }
    }

}

const openSnackbar = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'az adatok módosultak',
            color: 'success',
        }
    })
}

const SnackbarError = () => {
    useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: true,
            text: 'Az adatok módosítása nem sikerült!',
            color: 'error',
        }
    })
}

const handlePasswordChange = (newPassword: string) => {
    password.value = newPassword
};

const clearForm = () => {
    refEmail.value?.reset()
    refUserName.value?.reset()
    passwordInput.value?.clearForm()
    refFileInput.value?.reset()
    userNameCount.value = 0
    emailCount.value = 0
    passwordCount.value = 0
    FILECount.value = 0
}
</script>