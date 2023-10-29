import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../Views/Home.vue';
import HelloWorld from '../components/HelloWorld.vue';
import LoginPage from '../Views/LoginPage.vue';
import NotFound from '../Views/NotFound.vue';
import RegisterForm from '../Views/RegisterForm.vue';
import ResetPasswordEmail from '../Views/ResetPasswordEmail.vue';
import AdminDashboard from '../Views/AdminDashboard.vue';
import UnAuthorized from '../Views/UnAuthorized.vue';
import AuthService from '../composables/services/useAuthService';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/hello-world', name: 'helloWorld', component: HelloWorld },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/not-found', name: 'NotFound', component: NotFound },
  { path: '/register', name: 'register', component: RegisterForm },
  { path: '/reset-password-email', name: 'ResetPasswordEmail', component: ResetPasswordEmail },
  { path: '/unauthorized', name: 'UnAuthorized', component: UnAuthorized },
  {
    path: '/admin/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { authorize: ['admin'] }
  }
];

interface RouteMeta {
  authorize?: string[];
  [key: string]: any; // Indexelhetőségi tulajdonság hozzáadása
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  // redirect to the login page if not logged in and trying to access a restricted page

  const { authorize } = to.meta as RouteMeta;
  const currentUser = AuthService.getUser();

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to the login page with the return URL
      next({ path: '/login', query: { returnUrl: to.path } });
    } else {
      // check if the route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.role)) {
          // role not authorized, so redirect to the unauthorized page
          next({ path: '/unauthorized' });
        } else {
          next();
        }
      
    }
  } else {
    next();
  }
});

export default router;
