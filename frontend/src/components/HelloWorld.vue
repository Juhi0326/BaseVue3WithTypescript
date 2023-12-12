<template>
  <div>
    <!-- <p>Child Component</p>
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
    <v-icon icon="fas fa-plus" /> -->
    <h2>Registration Form</h2>
    <PasswordInput :onPasswordChange="handlePasswordChange" />
    <button @click="register">Register</button>
    <section id="tooltip">
  <div class="container">
  

          <p><span class="tooltip">erre szeretnék tooltip-et<span class="tooltip-text">ez a tooltip szövege, ami multiline, szép, és én is meg szeretném csinálni.</span></span></p>
  </div>
</section>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PasswordInput from './PasswordInput.vue'

const registeredPassword = ref('');

const handlePasswordChange = (newPassword: string) => {
  registeredPassword.value = newPassword;
};

const register = () => {
  // Call API with registeredPassword.value
  console.log('Registering with password:', registeredPassword.value);
};
/* import CustomButtonComponent from './CustomButtonComponent.vue';

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
const result = ref(''); */
</script>

<style scoped>
body{
  font-family: "Roboto Mono", monospace;
  line-height: 1.6;
} 

/*Container*/
.container {
  max-width: 960px;
  margin: 0 auto;
  position: relative;
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .container {
    max-width: 768px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media screen and (max-width: 767px) {
  .container {
    max-width: 480px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.container::after, .container::before {
  content: '';
  display: table;
  clear: both;
}

/*Tooltip*/
section#tooltip p {
  margin: 20px 0;
}

section#tooltip > div > div > p:nth-child(odd)::first-letter {
  font-weight: normal;
  float: left;
  font-size: 4em;
  line-height: .75;
  letter-spacing: .15em;
  margin-top: .2em;
}

.wrapper {
  max-width: 800px;
}

/*Tooltip text*/
.tooltip {
  position: relative;
  color: #00b4ab;
}

.tooltip .tooltip-text {
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  line-height: 1.5em;
  visibility: hidden;
  max-width: 300px;
  background-color: #00b4ab;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: .3s;
  transform: translate3d(0px, 20px, 0px);
}

.tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #00b4ab transparent transparent transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translate3d(0px, 0px, 0px);
}

h1 {
  font-family: "Open Sans", sans-serif;
  font-size: 2em;
  line-height: 1.09375em;
  font-weight: 700;
  margin-bottom: 40px;
  color: #383435;
}

h1::after {
  content: '';
  display: block;
  background-color: #383435;
  width: 5%;
  height: 1px;
  margin-top: 10px;
}
</style>
