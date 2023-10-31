<template>
  <div class="text-center">
    <v-snackbar v-model="useSnackBar.snackbar.visible" location="top" :color=snackBarColor>
      <div class="snackBarText pb-2">{{ snackbarText }}</div>

      <p v-if="snackBarSecondText">{{ snackBarSecondText }}</p>

      <template v-slot:actions>
        <v-btn color="aliceblue" variant="text" @click="closeSnackbar">
          Bezár
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { UseSnackBar } from '../stores/useSnackBar';
import { ref, watch } from 'vue'

const useSnackBar = UseSnackBar();
const snackbarText = ref(useSnackBar.getSnackBarText);
const snackBarSecondText = ref(useSnackBar.getSnackBarSecondText);
const snackBarColor = ref(useSnackBar.getSnackBarColor as string);

const closeSnackbar = () => {
  useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: false,
            text: '',
            color: '',
        }
    })
};

watch(() => useSnackBar.getSnackBarText, (newText) => {
  snackbarText.value = newText;
});

watch(() => useSnackBar.getSnackBarSecondText, (newSecondText) => {
  snackBarSecondText.value = newSecondText;
});

watch(() => useSnackBar.getSnackBarColor, (newColor) => {
  if (typeof newColor === 'string') {
    snackBarColor.value = newColor;
  } 
});
</script>

<style scoped>
.snackBarText {
  color:aliceblue;
}
</style>

