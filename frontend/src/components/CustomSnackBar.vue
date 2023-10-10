<template>
  <div class="text-center">
    <v-snackbar v-model="useSnackBar.snackbar.visible" location="top">
      <div class="snackBarText pb-2">{{ SnackbarText }}</div>

      <p v-if="SnackBarSecondText">{{ SnackBarSecondText }}</p>

      <template v-slot:actions>
        <v-btn color="aliceblue" variant="text" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { UseSnackBar } from '../stores/useSnackBar';

const useSnackBar = UseSnackBar();
const SnackbarText = useSnackBar.getSnackBarText;
const SnackBarSecondText = useSnackBar.getSnackBarSecondText;

const closeSnackbar = () => {
  useSnackBar.updateState(useSnackBar.$state, {
        snackbar: {
            visible: false,
            text: '',
            color: '',
        }
    })
};
</script>

<style scoped>
.snackBarText {
  color:aliceblue;
}
</style>

