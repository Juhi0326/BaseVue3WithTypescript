<template>

    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          :rules="[requiredRules.required, emailRules.regex]"
          clearable
          label="Email"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center" >
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          :rules="[requiredRules.required, dangerousCharactersRules.dangerousCharacter]"
          clearable
          label="sima input"
        ></v-text-field>
      </v-col>
    </v-row>

  </template>
  
 
 <script setup lang="ts">
 import { emailRules, requiredRules, dangerousCharactersRules } from '../composables/validation/useValidation'
 </script>
 