<script lang="ts">
import GroupService, { GroupInterface } from 'src/services/GroupService';

export interface DataObject {
  form_data: {
    group: GroupInterface
    sso: any
  }
}

export default {
  data(): DataObject {
    return {
      form_data: {
        group: {},
        sso: {}
      }
    }
  },
  methods: {
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          this.submitData();
          break;
      }
    },
    async submitData() {
      try {
        let resData = await GroupService.add(this.form_data.group);
        alert("Add new Group is success");
      } catch (ex) {
        console.error("submitData - ex :: ", ex);
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
            <div class="page-pretitle">grup manajemen</div>
            <h2 class="page-title">Group Perusahaan</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/group-management/group">
                <svg class="icon icon-tabler icon-tabler-corner-up-left" xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4"></path>
                </svg> Back </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container-xl">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <a href="#tabs-group" class="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Manage
                Company</a>
            </li>
            <li class="nav-item" role="presentation">
              <a href="#tabs-sso" class="nav-link" data-bs-toggle="tab" aria-selected="false" tabindex="-1"
                role="tab">Manage SSO</a>
            </li>
            <li class="nav-item ms-auto" role="presentation">
              <a href="#tabs-settings-7" class="nav-link" title="Settings" data-bs-toggle="tab" aria-selected="false"
                tabindex="-1" role="tab">
                <!-- Download SVG icon from http://tabler-icons.io/i/settings -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z">
                  </path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane active show" id="tabs-group" role="tabpanel">
              <!-- <h4>Form Group Perusahaan</h4> -->
              <div>
                <form id="group-form">
                  <input type="hidden" v-model="form_data.group.id" name="id">
                  <div class="form-group mb-3">
                    <label class="form-label">Nama</label>
                    <div>
                      <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Kantor A"
                        v-model="form_data.group.name" name="name">
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <div class="form-label">Status</div>
                    <select class="form-select" v-model="form_data.group.is_enable">
                      <option value="true">Active</option>
                      <option value="false">Suspend</option>
                    </select>
                  </div>

                  <div class="form-footer">
                    <button class="btn btn-primary" type="submit"
                      v-on:click="handleClick('SUBMIT',{},$event)">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="tab-pane" id="tabs-sso" role="tabpanel">
              <!--  <h4>Form Manage SSO</h4> -->
              <div>
                <form id="sso-form">
                  <input type="hidden" v-model="form_data.sso.id" name="id">
                  <div class="form-group mb-3">
                    <label class="form-label">Key</label>
                    <div>
                      <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Key"
                        v-model="form_data.sso.key" name="key">
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label class="form-label">Host</label>
                    <div>
                      <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Secret Key"
                        v-model="form_data.sso.host" name="host">
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label class="form-label">Secret Key</label>
                    <div>
                      <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Secret Key"
                        v-model="form_data.sso.secret_key" name="secret_key">
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label class="form-label">Callback Uri</label>
                    <div>
                      <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Secret Key"
                        v-model="form_data.sso.callback_uri" name="callback_uri">
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <div class="form-label">Status</div>
                    <select class="form-select" v-model="form_data.sso.is_enabled">
                      <option value="true">Active</option>
                      <option value="false">Suspend</option>
                    </select>
                  </div>

                  <div class="form-footer">
                    <button class="btn btn-primary" type="submit"
                      v-on:click="handleClick('SUBMIT',{},$event)">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="tab-pane" id="tabs-settings-7" role="tabpanel">
              <h4>Settings tab</h4>
              <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris
                accumsan nibh habitant senectus</div>
            </div>
          </div>
        </div>
      </div>
      <!--  <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Form Grup Perusahaan</h3>
          </div>
          <div class="card-body">

          </div>
        </div>
      </div> -->
      <br>
      <br>
    </div>
  </div>
</template>