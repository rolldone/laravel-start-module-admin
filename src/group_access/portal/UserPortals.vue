<script lang="ts">
import SafeJson from 'src/functions/SafeJson';
import PortalService, { PortalInterface } from 'src/services/PortalService'
interface DataObject {
  portal_datas: Array<PortalInterface>
  select_group_type: string
}
export default {
  setup() {
    return {
      SafeJson
    }
  },
  data(): DataObject {
    return {
      portal_datas: [],
      select_group_type: "employee"
    }
  },
  mounted() {
    this.baseMounted();
  },
  methods: {
    async baseMounted() {
      this.setPortals(await this.getPortals());
    },
    async getPortals() {
      try {
        let resData = await PortalService.gets({});
        return resData;
      } catch (ex) {
        console.error("getPortals - ex :: ", ex);
      }
    },
    setPortals(props: any) {
      if (props == null) return;
      this.portal_datas = props.return;
    },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_GRUP_TYPE':
          this.select_group_type = props;
          break;
      }
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
            <div class="page-pretitle">Grup Akses</div>
            <h2 class="page-title">User Portals</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <span class="d-none d-sm-inline">
                <!-- <a class="btn btn-white" href="/dashboard/pipeline">Manage Pipelines</a> -->
              </span>
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/group-access/portal/new">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg> Add Portal </a>
              <!--  <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Add Portal
                </button>
                <div class="dropdown-menu dropdown-menu-demo dropdown-menu-arrow">
                  <a class="dropdown-item" href="/admin/group-access/user-portal/new?type=employee">
                    Employee
                  </a>
                  <a class="dropdown-item" href="#">
                    Position
                  </a>
                  <a class="dropdown-item" href="#">
                    Division
                  </a>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">

        <div class="row row-cards">
          <!-- <div class="col-12">
            <div class="card card-lg" style="padding: 12px;">
              <div class="mb-1" style="width:400px;">
                <label class="form-label">Select By Group Type</label>
                <div class="btn-group w-100">
                  <button type="button" class="btn">Employee</button>
                  <button type="button" class="btn btn-primary">Position</button>
                  <button type="button" class="btn">Division</button>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="col-12">
            <div class="mb-1" style="width:400px;">
              <div class="btn-group w-100" style="background-color: white;">
                <button type="button" class="btn" v-bind:class="select_group_type=='employee'?'btn-primary':null"
                  v-on:click="handleClick('SELECT_GRUP_TYPE','employee',$event)">Employee</button>
                <button type="button" class="btn" v-bind:class="select_group_type=='position'?'btn-primary':null"
                  v-on:click="handleClick('SELECT_GRUP_TYPE','position',$event)">Position</button>
                <button type="button" class="btn" v-bind:class="select_group_type=='division'?'btn-primary':null"
                  v-on:click="handleClick('SELECT_GRUP_TYPE','division',$event)">Division</button>
              </div>
            </div>
          </div> -->
          <div class="col-12">
            <div class="card">
              <div class="table-responsive">
                <table class="table table-vcenter table-mobile-md card-table">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th class="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in portal_datas">
                      <td data-label="Name">
                        <div class="d-flex py-1 align-items-center">
                          <span style="background-image: url(./static/avatars/010m.jpg);"
                            class="avatar me-2">{{item.id}}</span>
                          <div class="flex-fill">
                            <div class="font-weight-medium">{{item.name}}</div>
                            <div class="text-muted">
                              <a class="text-reset" href="#"></a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td data-label="Title">
                        <div>{{SafeJson(item,"portals_groups",[]).length}}</div>
                        <div class="text-muted"></div>
                      </td>
                      <td class="text-muted" data-label="Role">{{item.is_enable==true?"Active":"Suspend"}}</td>
                      <td>
                        <div class="btn-list flex-nowrap">
                          <!-- <a class="btn" href="/dashboard/pipeline?project_id=3">Sub Divisi</a> -->
                          <div class="dropdown">
                            <button class="btn dropdown-toggle align-text-top"
                              data-bs-toggle="dropdown">Actions</button>
                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" :href="'/admin/group-access/portal/'+item.id+'/view'">Edit</a>
                              <!-- <a class="dropdown-item" href="#">Suspend</a> -->
                            </div>
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
              <li class="list-inline-item">
                <a class="link-secondary" href="./docs/index.html">Documentation</a>
              </li>
              <li class="list-inline-item">
                <a class="link-secondary" href="./license.html">License</a>
              </li>
              <li class="list-inline-item">
                <a class="link-secondary" href="https://github.com/tabler/tabler" target="_blank" rel="noopener">Source
                  code</a>
              </li>
              <li class="list-inline-item">
                <a class="link-secondary" href="https://github.com/sponsors/codecalm" target="_blank" rel="noopener">
                  <svg class="icon text-pink icon-filled icon-inline" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                  </svg> Sponsor </a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">Copyright © 2022 <a class="link-secondary" href=".">Tabler</a>. All rights
                reserved. </li>
              <li class="list-inline-item">Generated 2022-03-29 21:06 UTC</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>