<template>
  <div>
    <p>Child Component</p>
    <CustomButtonComponent class="mx-2" @click="callChildFunction" color="primary">Call Child Function
      <v-icon icon="mdi-home"></v-icon>
    </CustomButtonComponent>
    <CustomButtonComponent class="mx-2" @click="callParentFunction" color="success">Call Parent Function
      <v-icon
          end
          icon="mdi-checkbox-marked-circle"
        ></v-icon>
    </CustomButtonComponent>
    <CustomButtonComponent class="mx-2" @click="callOtherParentFunction" color="red">Call Other Function
      <v-icon
          end
          icon="mdi-checkbox-marked-circle-outline  "
        ></v-icon>
    </CustomButtonComponent>
    <CustomButtonComponent class="mx-2" @click="callOtherChildFunction" color="red">Call Other Child Function
    </CustomButtonComponent>
    <h1>{{ result }}</h1>
    <v-icon icon="fas fa-plus" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import CustomButtonComponent from './CustomButtonComponent.vue';

// Inject the provided function from the parent component
const parentFunction = inject<() => string>('sharedFunction');
const otherFunctionInChild = inject<() => string>('otherFunction')

// Define your own function to overwrite the provided one
const childFunction = () => {
  return 'This is the child function';
};

// Define a method to call the child function
const callChildFunction = () => {
  result.value = childFunction();
};

// Define a method to call the parent function
const callParentFunction = () => {
  if (typeof parentFunction === 'function') {
    result.value = parentFunction();
  } else {
    result.value = 'Parent function is not a function';
  }
};

const otherChildFunction = () => {
  return 'This is the Other child function';
};

// Define a method to call the child function
const callOtherChildFunction = () => {
  result.value = otherChildFunction();
};

// Define a method to call the parent function
const callOtherParentFunction = () => {
  if (typeof otherFunctionInChild === 'function') {
    result.value = otherFunctionInChild();
  } else {
    result.value = 'Parent function is not a function';
  }
};

// Define a ref to store the result
const result = ref('');
</script>
