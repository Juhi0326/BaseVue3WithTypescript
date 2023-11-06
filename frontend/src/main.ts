import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from "pinia";

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AuthService from '../src/composables/services/useAuthService'

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary:'#00838F', //cyan-darken-3
          secondary: "#1DE9B6", // teal-accent-3
          success: '#7CB342', // light-green-darken-1
          error: '#E53935', //red-darken-1
          form: '#80CBC4'
        }
      },
    },
  },
  directives,
  components,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})



createApp(App)
.use(vuetify)
.use(router)
.use(createPinia())
.mount('#app')

AuthService.init()



