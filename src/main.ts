import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import Middleware from './middleware/Middleware';

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

// Portal Selected
import PortalSelected from './portal_selected/PortalSelected.vue';

// Operasional Pegawai
import OperasionalPegawaiPegawai from './employee_operational/employee/Pegawai.vue';
import OperationalPegawaiPegawaiRegister from './employee_operational/employee/PegawaiFRegister.vue';

import OperasionalPegawaiJabatan from './employee_operational/position/Jabatan.vue';
import OperasionalPegawaiKehadiran from './employee_operational/attendance/Kehadiran.vue';
import OperasionalPegawaiMutasi from './employee_operational/muation/Mutasi.vue';
import CompanyCheckMiddleware from './middleware/CompanyCheckMiddleware';

// Grup akses
import GroupAccessGroup from './group_access/privilege/Group.vue';
import GroupAccessGroupNew from './group_access/privilege/GroupFNew.vue';
import GroupAccessGroupUpdate from './group_access/privilege/GroupFUpdate.vue';
import UserPortals from './group_access/portal/UserPortals.vue';
import UserPortalFNew from './group_access/portal/UserPortalFNew.vue';
import UserPortalFUpdate from './group_access/portal/UserPortalFUpdate.vue';

import UserSelf from './user/Self.vue';

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
  { path: '/group-management/pegawai', component: Pegawai },
  { path: '/group-management/pegawai/new', component: PegawaiFNew },
  { path: '/group-management/pegawai/:id/view', component: PegawaiFUpdate },
  { path: '/group-management/jabatan', component: Jabatan },
  { path: '/group-management/jabatan/new', component: JabatanFNew },
  { path: '/group-management/jabatan/:id/view', component: JabatanFUpdate },
  { path: '/group-management/divisi', component: Divisi },
  { path: '/group-management/divisi/new', component: DivisiFNew },
  { path: '/group-management/divisi/:id/view', component: DivisiFUpdate },
  { path: '/group-management/group', component: Group },
  { path: '/group-management/group/new', component: GroupFNew },
  { path: '/group-management/group/:id/view', component: GroupFUpdate },

  
  { path: '/user/self', component: UserSelf },

  // Operasional Pegawai
  {
    path: '/operational-employee/employee',
    component: OperasionalPegawaiPegawai,
    name: "operational.employee.employees",
    beforeEnter: Middleware.bind(this, [CompanyCheckMiddleware])
  },
  {
    path: '/operational-employee/employee/new',
    component: OperationalPegawaiPegawaiRegister,
    name: "operational.employee.new",
    beforeEnter: Middleware.bind(this, [CompanyCheckMiddleware])
  },
  {
    path: '/operasional-pegawai/jabatan',
    component: OperasionalPegawaiJabatan,
    name: "operasional.jabatan",
    beforeEnter: Middleware.bind(this, [CompanyCheckMiddleware])
  },
  {
    path: "/portal/selected",
    component: PortalSelected,
    name: "portal.selected",
    beforeEnter: Middleware.bind(this, [])
  },
  // Grup AKses
  {
    path: '/group-access/group/:id/view',
    component: GroupAccessGroupUpdate,
    name: "group_access.group.update",
    beforeEnter: Middleware.bind(this, [])
  },
  {
    path: '/group-access/group/new',
    component: GroupAccessGroupNew,
    name: "group_access.group.new",
    beforeEnter: Middleware.bind(this, [])
  },
  {
    path: '/group-access/group',
    component: GroupAccessGroup,
    name: "group_access.group.groups",
    beforeEnter: Middleware.bind(this, [])
  },
  {
    path: '/group-access/portal',
    component: UserPortals,
    name: "group_access.portal.portals",
    beforeEnter: Middleware.bind(this, [])
  },
  {
    path: '/group-access/portal/new',
    component: UserPortalFNew,
    name: "group_access.user_portal.new",
    beforeEnter: Middleware.bind(this, [])
  },
  {
    path: '/group-access/portal/:id/view',
    component: UserPortalFUpdate,
    name: "group_access.user_portal.update",
    beforeEnter: Middleware.bind(this, [])
  }
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
