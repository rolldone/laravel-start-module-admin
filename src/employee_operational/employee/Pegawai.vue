<script lang="ts">
import DashboardService from 'src/services/DashboardService';
import { EmployeeInterface } from 'src/services/EmployeeService';
import UserGroupPositionService, { UserGroupPositionServiceInteface } from 'src/services/UserGroupPositionService';
import { onMounted, ref } from 'vue';
import SafeJson from 'src/functions/SafeJson';

interface DataObject {
  upg_datas: Array<UserGroupPositionServiceInteface>
}
export default {
  setup() {
    return {
      SafeJson
    }
  },
  data(): DataObject {
    return {
      upg_datas: []
    }
  },
  mounted() {
    this.baseMounted();
  },
  methods: {
    async baseMounted() {
      this.setUPGS(await this.getUPGS());
    },
    async getUPGS() {
      try {
        let resData = await DashboardService.employee.getsUPG_ByCurrentGroup({});
        return resData
      } catch (ex) {
        console.error("getUPGS - ex :: ", ex);
      }
    },
    setUPGS(props: any) {
      if (props == null) return;
      this.upg_datas = props.return;
    }
  }
}
</script>

<template>
  <div class="page-wrapper" id="index-body">
    <div class="container-xl">
      <div class="page-header d-print-none">
        <div class="row g-2 align-items-center">
          <div class="col">
            <div class="page-pretitle">Employee Operational</div>
            <h2 class="page-title">Employee Management</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <!-- <span class="d-none d-sm-inline">
                <a class="btn btn-white" href="/dashboard/pipeline">Manage Pipelines</a>
              </span> -->
              <a class="btn btn-primary d-none d-sm-inline-block" href="/operational-employee/employee/new">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plug-connected" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z"></path>
                  <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z"></path>
                  <path d="M3 21l2.5 -2.5"></path>
                  <path d="M18.5 5.5l2.5 -2.5"></path>
                  <path d="M10 11l-2 2"></path>
                  <path d="M13 14l-2 2"></path>
                </svg>
                Employee Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">
        <div class="row row-cards">
          <div class="col-12">
            <div class="card">
              <div class="table-responsive">
                <table class="table table-vcenter table-mobile-md card-table">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Email & No Telp</th>
                      <th>Status</th>
                      <th class="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in upg_datas">
                      <td data-label="Name">
                        <div class="d-flex py-1 align-items-center"><span
                            style="background-image: url(./static/avatars/010m.jpg);"
                            class="avatar me-2">{{item.id}}</span>
                          <div class="flex-fill">
                            <div class="font-weight-medium">{{SafeJson(item.employee,'first_name','')}}
                              {{SafeJson(item.employee,'last_name','')}}</div>
                            <div class="text-muted"><a class="text-reset" href="#"></a></div>
                          </div>
                        </div>
                      </td>
                      <td data-label="Title">
                        <div>{{SafeJson(item.employee,'email','')}}</div>
                        <div class="text-muted">{{SafeJson(item.employee,'phone_number','')}}</div>
                      </td>
                      <td class="text-muted" data-label="Role">{{item.is_enabled == true ?"Active":"Suspend"}}</td>
                      <td>
                        <div class="btn-list flex-nowrap"><a class="btn"
                            href="/dashboard/pipeline?project_id=3">Analisa</a>
                          <div class="dropdown"><button class="btn dropdown-toggle align-text-top"
                              data-bs-toggle="dropdown">Actions</button>
                            <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item"
                                :href="'/admin/operational-employee/employee/new?upg_id='+item.id">Edit</a> <a
                                class="dropdown-item" href="#">Suspend</a></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-lg-auto ms-lg-auto">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item"><a class="link-secondary" href="./docs/index.html">Documentation</a></li>
              <li class="list-inline-item"><a class="link-secondary" href="./license.html">License</a></li>
              <li class="list-inline-item"><a class="link-secondary" href="https://github.com/tabler/tabler"
                  target="_blank" rel="noopener">Source code</a></li>
              <li class="list-inline-item"><a class="link-secondary" href="https://github.com/sponsors/codecalm"
                  target="_blank" rel="noopener"> <svg class="icon text-pink icon-filled icon-inline"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                  </svg> Sponsor</a></li>
            </ul>
          </div>
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">Copyright © 2022 <a class="link-secondary" href=".">Tabler</a>. All rights
                reserved.</li>
              <li class="list-inline-item">Generated 2022-03-29 21:06 UTC</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>