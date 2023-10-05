import {createRouter, createWebHistory} from 'vue-router'
import Home from '../Views/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import LoginPage from '../Views/LoginPage.vue'
import NotFound from '../Views/NotFound.vue'
import RegisterForm from '../Views/RegisterForm.vue'
import ResetPasswordEmail from '../Views/ResetPasswordEmail.vue'
import UnAuthorized from '../Views/UnAuthorized.vue'



const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/hello-world', name: 'helloWorld', component: HelloWorld },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/not-found', name: 'NotFound', component: NotFound },
  { path: '/register', name: 'register', component: RegisterForm },
  { path: '/reset-password-email', name: 'ResetPasswordEmail', component: ResetPasswordEmail },
  { path: '/unathorized', name: 'UnAuthorized', component: UnAuthorized },




]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router