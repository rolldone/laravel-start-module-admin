import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'

declare global {
  interface Window {
    bootstrap: any
  }
}


// Style and theme
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
import './style.css'

// Pegawai
import Pegawai from './pegawai/Pegawai.vue';
import PegawaiFNew from './pegawai/PegawaiFNew.vue';
import PegawaiFUpdate from './pegawai/PegawaiFUpdate.vue';

// Jabatan
import Jabatan from './jabatan/Jabatan.vue';
import JabatanFNew from './jabatan/JabatanFNew.vue';
import JabatanFUpdate from './jabatan/JabatanFUpdate.vue';

// Divisi
import Divisi from './divisi/Divisi.vue';
import DivisiFNew from './divisi/DivisiFNew.vue';
import DivisiFUpdate from './divisi/DivisiFUpdate.vue';

// Group
import Group from './group/Group.vue';
import GroupFNew from './group/GroupFNew.vue';
import GroupFUpdate from './group/GroupFUpdate.vue';

// Auth
import Login from './auth/Login.vue';
import Logout from './auth/Logout.vue';
import Register from './auth/Register.vue';
import ForgotPassword from './auth/ForgotPassword.vue';

// Dashboard
import Dashboard from './dashboard/Dashboard.vue';
import AuthService from './services/AuthService';

// Operasional Pegawai
import OperasionalPegawaiPegawai from './operasional_pegawai/pegawai/Pegawai.vue';
import OperasionalPegawaiJabatan from './operasional_pegawai/jabatan/Jabatan.vue';
import OperasionalPegawaiKehadiran from './operasional_pegawai/kehadiran/Kehadiran.vue';
import OperasionalPegawaiMutasi from './operasional_pegawai/mutasi/Mutasi.vue';
import CompanyCheckMiddleware from './middleware/CompanyCheckMiddleware';
import Middleware from './middleware/Middleware';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Dashboard },
  { path: '/auth/login', component: Login, name: "auth.login" },
  { path: '/auth/register', component: Register },
  { path: '/auth/logout', component: Logout },
  { path: '/auth/forgot-password', component: ForgotPassword },

  // Grup Manajemen
  { path: '/grup-manajemen/pegawai', component: Pegawai },
  { path: '/grup-manajemen/pegawai/new', component: PegawaiFNew },
  { path: '/grup-manajemen/pegawai/:id/view', component: PegawaiFUpdate },
  { path: '/grup-manajemen/jabatan', component: Jabatan },
  { path: '/grup-manajemen/jabatan/new', component: JabatanFNew },
  { path: '/grup-manajemen/jabatan/:id/view', component: JabatanFUpdate },
  { path: '/grup-manajemen/divisi', component: Divisi },
  { path: '/grup-manajemen/divisi/new', component: DivisiFNew },
  { path: '/grup-manajemen/divisi/:id/view', component: DivisiFUpdate },
  { path: '/grup-manajemen/group', component: Group },
  { path: '/grup-manajemen/group/new', component: GroupFNew },
  { path: '/grup-manajemen/group/:id/view', component: GroupFUpdate },

  // Operasional Pegawai
  {
    path: '/operasional-pegawai/pegawai',
    component: OperasionalPegawaiPegawai,
    name: "operasional.pegawai",
    meta: {
      middleware: []
    }
  },
  {
    path: '/operasional-pegawai/jabatan',
    component: OperasionalPegawaiJabatan,
    name: "operasional.jabatan",
    beforeEnter: Middleware.bind(this, [CompanyCheckMiddleware])
  },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory('admin'),
  routes, // short for `routes: routes`
})

router.beforeEach(async (to, from) => {
  let token = window.localStorage.getItem("token") || null;
  if (token == null) {
    if (to.fullPath.includes("/auth") == false) {
      return router.replace({
        name: "auth.login"
      })
    }
  }
  if (to.fullPath.includes("/auth") == false) {
    let auth = window.sessionStorage.getItem("auth") || null;
    if (auth == null) {
      let resData = await AuthService.getAuth();
      window.sessionStorage.setItem("auth", JSON.stringify(resData.return));
    }
  }
})

// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router).mount("#app")
