<script lang="ts">
import { onMounted, ref } from 'vue';
import DivisiService, { DivisiInterface } from 'src/services/DivisiService';
import SafeJson from 'src/functions/SafeJson';

let divisi_datas = ref<Array<DivisiInterface>>([]);

export const getDivisions = async () => {
  try {
    let resData = await DivisiService.gets({});
    return resData;
  } catch (ex) {
    console.error("getDivisions - ex :: ", ex);
  }
}

const setDivisions = async (props: any) => {
  if (props == null) return null;
  divisi_datas.value = props.return;
}


export default {
  setup() {
    onMounted(async () => {
      setDivisions(await getDivisions());
    })
    return {
      divisi_datas,
      SafeJson
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
            <div class="page-pretitle">Grup Manajemen</div>
            <h2 class="page-title">Daftar Divisi</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <span class="d-none d-sm-inline">
                <!-- <a class="btn btn-white" href="/dashboard/pipeline">Manage Pipelines</a> -->
              </span>
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/grup-manajemen/divisi/new">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg> Tambah Divisi </a>
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
                      <th>Parent</th>
                      <th>Status</th>
                      <th class="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in divisi_datas">
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
                        <div>{{SafeJson(item.parent_division,"name","-")}}</div>
                        <div class="text-muted"></div>
                      </td>
                      <td class="text-muted" data-label="Role">{{item.is_enable==true?"Active":"Suspend"}}</td>
                      <td>
                        <div class="btn-list flex-nowrap">
                          <a class="btn" href="/dashboard/pipeline?project_id=3">Analisa</a>
                          <div class="dropdown">
                            <button class="btn dropdown-toggle align-text-top"
                              data-bs-toggle="dropdown">Actions</button>
                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" :href="'/admin/grup-manajemen/divisi/'+item.id+'/view'">Edit</a>
                              <a class="dropdown-item" href="#">Suspend</a>
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