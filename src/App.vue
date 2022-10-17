<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
let token = ref(window.localStorage.getItem("token") || null);

export default {
  setup() {
    onMounted(() => {

    })
    return {
      token
    }
  }
}
</script>

<template>
  <template v-if="token == null">
    <router-view></router-view>
  </template>
  <template v-if="token != null">
    <div class="page">
      <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <h1 class="navbar-brand navbar-brand-autodark">
            <a href=".">
              <!-- <img src="./static/logo-white.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image"> -->
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 50px; height: 50px;"
                class="icon icon-tabler icon-tabler-terminal" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <desc>Download more icon variants from https://tabler-icons.io/i/terminal</desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 7l5 5l-5 5"></path>
                <line x1="12" y1="19" x2="19" y2="19"></line>
              </svg>
            </a>
          </h1>
          <div class="collapse navbar-collapse" id="navbar-menu">
            <ul class="navbar-nav pt-lg-3">
              <li class="nav-item">
                <a class="nav-link" href="/admin">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/home -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                      stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Home
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/portal/selected">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/home -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linktree"
                      width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 3l-7 12h3v5h5v-5h-2l4 -7z"></path>
                      <path d="M15 3l7 12h-3v5h-5v-5h2l-4 -7z"></path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Pindah Portal
                  </span>
                </a>
              </li>

              <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                  data-bs-auto-close="false" role="button" aria-expanded="true">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                      stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <desc>Download more icon variants from https://tabler-icons.io/i/star</desc>
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z">
                      </path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Users
                  </span>
                </a>
                <div class="dropdown-menu" data-bs-popper="none">
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <a class="dropdown-item" href="/admin/user/self">
                        My Profile
                      </a>
                    </div>
                  </div>
                </div>
              </li> -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                  data-bs-auto-close="false" role="button" aria-expanded="true">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-ubuntu" width="24"
                      height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="12" cy="5" r="2"></circle>
                      <path
                        d="M17.723 7.41a7.992 7.992 0 0 0 -3.74 -2.162m-3.971 0a7.993 7.993 0 0 0 -3.789 2.216m-1.881 3.215a8 8 0 0 0 -.342 2.32c0 .738 .1 1.453 .287 2.132m1.96 3.428a7.993 7.993 0 0 0 3.759 2.19m3.998 -.003a7.993 7.993 0 0 0 3.747 -2.186m1.962 -3.43a8.008 8.008 0 0 0 .287 -2.131c0 -.764 -.107 -1.503 -.307 -2.203">
                      </path>
                      <circle cx="5" cy="17" r="2"></circle>
                      <circle cx="19" cy="17" r="2"></circle>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Operasional Pegawai
                  </span>
                </a>
                <div class="dropdown-menu" data-bs-popper="none">
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <a class="dropdown-item" href="/admin/operational-employee/employee">
                        Pegawai
                      </a>
                      <a class="dropdown-item" href="/admin/operasional-pegawai/kehadiran">
                        Kehadiran
                      </a>
                      <a class="dropdown-item" href="/admin/operasional-pegawai/mutasi">
                        Mutasi
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                  data-bs-auto-close="false" role="button" aria-expanded="true">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-new-section" width="24"
                      height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="9" y1="12" x2="15" y2="12"></line>
                      <line x1="12" y1="9" x2="12" y2="15"></line>
                      <path
                        d="M4 6v-1a1 1 0 0 1 1 -1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1 -1 1h-1m-5 0h-2m-5 0h-1a1 1 0 0 1 -1 -1v-1m0 -5v-2m0 -5">
                      </path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Setup Data
                  </span>
                </a>
                <div class="dropdown-menu" data-bs-popper="none">
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <!-- <a class="dropdown-item" href="/dashboard/user">
                    Users
                  </a> -->
                      <!-- <a class="dropdown-item" href="/dashboard/group">
                    Groups Roles
                  </a> -->
                      <a class="dropdown-item" href="/admin/group-management/pegawai">
                        Peoples
                      </a>
                      <a class="dropdown-item" href="/admin/group-management/divisi">
                        Division
                      </a>
                      <a class="dropdown-item" href="/admin/group-management/jabatan">
                        Position
                      </a>
                      <a class="dropdown-item" href="/admin/group-management/group">
                        Company Group
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                  data-bs-auto-close="false" role="button" aria-expanded="true">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wall" width="24"
                      height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                      <path d="M4 8h16"></path>
                      <path d="M20 12h-16"></path>
                      <path d="M4 16h16"></path>
                      <path d="M9 4v4"></path>
                      <path d="M14 8v4"></path>
                      <path d="M8 12v4"></path>
                      <path d="M16 12v4"></path>
                      <path d="M11 16v4"></path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Role & Permission
                  </span>
                </a>
                <div class="dropdown-menu" data-bs-popper="none">
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <a class="dropdown-item" href="/admin/group-access/group">
                        Group Access
                      </a>
                      <a class="dropdown-item" href="/admin/group-access/portal">
                        Portal Access
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item" style="display: none;">
                <a class="nav-link" href="./docs/index.html">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/file-text -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                      stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                      <line x1="9" y1="9" x2="10" y2="9"></line>
                      <line x1="9" y1="13" x2="15" y2="13"></line>
                      <line x1="9" y1="17" x2="15" y2="17"></line>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Documentation
                  </span>
                </a>
              </li>

              <li class="nav-item" style="display: none;">
                <a class="nav-link" href="./changelog.html">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/file-plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                      stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                      <line x1="12" y1="11" x2="12" y2="17"></line>
                      <line x1="9" y1="14" x2="15" y2="14"></line>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Changelog
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/user/self">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/home -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-search" width="24"
                      height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h1"></path>
                      <circle cx="16.5" cy="17.5" r="2.5"></circle>
                      <path d="M18.5 19.5l2.5 2.5"></path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    My Profile
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/auth/logout">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <!-- Download SVG icon from http://tabler-icons.io/i/file-plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24"
                      height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <desc>Download more icon variants from https://tabler-icons.io/i/logout</desc>
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                      <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                    </svg>
                  </span>
                  <span class="nav-link-title">
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div class="page-wrapper" id="index-body">

        <router-view></router-view>
        <!-- <h4 style="text-align: center; margin: 60px;">
          Loading<span class="animated-dots"></span>
        </h4> -->
      </div>
    </div>
  </template>
</template>



<style scoped>

</style>
