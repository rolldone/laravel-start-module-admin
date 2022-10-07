import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'

// Style and theme
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
import './style.css'

// Pegawai
import Pegawai from './pegawai/Pegawai.vue';
import PegawaiFNew from './pegawai/PegawaiFNew.vue';
import PegawaiFUpdate from './pegawai/PegawaiFUpdate.vue';

// Auth
import Login from './auth/Login.vue';
import Logout from './auth/Logout.vue';
import Register from './auth/Register.vue';
import ForgotPassword from './auth/ForgotPassword.vue';

// Dashboard
import Dashboard from './dashboard/Dashboard.vue';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Dashboard },
  { path: '/auth/login', component: Login },
  { path: '/auth/register', component: Register },
  { path: '/auth/logout', component: Logout },
  { path: '/auth/forgot-password', component: ForgotPassword },

  { path: '/pegawai', component: Pegawai },
  { path: '/pegawai/new', component: PegawaiFNew },
  { path: '/pegawai/:id/view', component: PegawaiFUpdate },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory('admin'),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router).mount("#app")
