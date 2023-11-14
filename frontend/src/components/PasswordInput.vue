<template>
    <v-row>
        <v-col cols="11">
            <v-text-field v-model="password" @input="emitPasswordChange"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Add meg az új a jelszavad" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible" label="Jelszó" :rules="[
                    requiredRules.required,
                    dangerousCharactersRules.dangerousCharacter,
                    passwordMatch2 || 'A két beírt jelszónak egyeznie kell!'
                ]" ref="refPassword">
                <!-- Vuetify tooltip a kérdőjel ikonhoz -->
            </v-text-field>
        </v-col>
        <v-col cols="1">
            <v-tooltip top>
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" class="mt-2">
                        mdi-help-circle
                    </v-icon>
                </template>
                A jelszó minimum 6 maximum 20 karaktert tartalmazhat, szerepelnie kell benne legalább egy
                nagybetűnek, egy kisbetűnek, egy számnak és egy speciális karakternek.
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="11">
            <v-text-field v-model="password2" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Gépeld be újra a jelszavad"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                label="Jelszó újra" :rules="[
                    passwordMatch ||
                    'A két beírt jelszónak egyeznie kell!',
                ]" validate-on="input lazy" ref="refPassword2">
            </v-text-field>
        </v-col>
        <v-col cols="1">
            <v-tooltip top>
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" class="mt-2">
                        mdi-help-circle
                    </v-icon>
                </template>
                A két jelszónak egyeznie kell!
            </v-tooltip>
        </v-col>
    </v-row>
</template>
  
<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';
import { requiredRules, dangerousCharactersRules } from '../composables/validation/useValidation'

const password = ref('');
const password2 = ref('')
const visible = ref(false)
const passwordMatch = ref(true)
const passwordMatch2 = ref(true)
const refPassword = ref<HTMLFormElement | null>(null);
const refPassword2 = ref<HTMLFormElement | null>(null);

const emitPasswordChange = () => {
    onPasswordChange(password.value);
};

const clearForm = () => {
    if (refPassword.value) {
        refPassword.value.reset()
    }
    if (refPassword2.value) {
        refPassword2.value.reset()
    }
}

defineExpose({
    clearForm
  })

watch([password, password2], ([newPassword, newPassword2]) => {
    passwordMatch.value = newPassword === newPassword2;
})
watch([password, password2], ([newPassword, newPassword2]) => {
    if (newPassword2 === '' && newPassword !== newPassword2) {
        passwordMatch2.value = true
    } else if (newPassword2 !== '' && newPassword !== newPassword2) {
        passwordMatch2.value = false
    } else {
        passwordMatch2.value = true
    }
})

const { onPasswordChange } = defineProps(['onPasswordChange']);


</script>
  