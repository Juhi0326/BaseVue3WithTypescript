<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4" v-html="message"></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <CustomButtonComponent class="ma-2" propColor="red" :propRounded="true" :propText="true" @click.native="cancel">
          Mégsem
        </CustomButtonComponent>

        <CustomButtonComponent class="ma-2 my-3" propColor="red" :propRounded="true" :propDark="true"
          @click.native="agree">
          Igen
        </CustomButtonComponent>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

import { ref, defineExpose } from 'vue'
import CustomButtonComponent from '../components/CustomButtonComponent.vue'

const resolve = ref<((value: boolean) => void) | null>(null);
const reject = ref<((value: boolean) => void) | null>(null);

const title = ref('')
const message = ref('')
const dialog = ref(false)
const options = ref({
  color: "primary",
  width: 400,
  zIndex: 200,
  noconfirm: false,
})

let agree = () => {
  if (resolve.value) {
    resolve.value(true);
    dialog.value = false;
  }
};

let cancel = () => {
  if (reject.value) {
    reject.value(false);
    dialog.value = false;
  }
};


const openDialog = (titleProp: string, messageProp: string) => {
  title.value = titleProp;
  message.value = messageProp;
  dialog.value = true;
  return new Promise<boolean>((resolve, reject) => {
    agree = () => {
      resolve(true);
      dialog.value = false;
    };

    cancel = () => {
      reject(false);
      dialog.value = false;
    };
  });
}


const closeDialog = () => {
  dialog.value = false
}

defineExpose({
  openDialog,
  closeDialog
})



</script>