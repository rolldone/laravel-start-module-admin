<script lang="ts">
import GroupService, { GroupInterface } from "src/services/GroupService";
import PortalService, { PortalInterface } from "src/services/PortalService";
import TabSelectUser from './tab_select_user/TabSelectUser';
import TabSelectPosition from './tab_select_position/TabSelectPosition.vue';

interface DataObject {
  form_data: PortalInterface,
  group_datas: Array<GroupInterface>
  what_relation: string
}
export default {
  components: {
    TabSelectUser,
    TabSelectPosition
  },
  data(): DataObject {
    return {
      form_data: {
        portals_groups_ids: []
      },
      group_datas: [],
      what_relation: ""
    }
  },
  mounted() {
    this.baseMounted();
  },
  methods: {
    async baseMounted() {
      this.setGroups(await this.getGroups());
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_EMPLOYEE':

          break;
      }
    },
    handleChange(action: string, props: any, e: any) {
      switch (action) {
        case "SELECT_ALL_CHECKBOX":
          e.preventDefault();
          if (this.form_data.portals_groups_ids == null) return;
          this.form_data.portals_groups_ids = [...new Set(this.form_data.portals_groups_ids) as any]
          for (let _a = 0; _a < this.group_datas.length; _a++) {
            if (this.form_data.portals_groups_ids != null) {
              this.form_data.portals_groups_ids[_a] = e.target.checked == true ? this.group_datas[_a].id as any : null;
            }
          }
          break;
      }
    },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          this.submit();
          break;
        case 'OPEN_RELATION_DIALOG':
          e.preventDefault();
          break;
      }
    },
    async getGroups() {
      try {
        let resData = await GroupService.gets({});
        return resData;
      } catch (ex) {
        console.error("getGroups - ex :: ", ex);
      }
    },
    setGroups(props: any) {
      if (props == null) return;
      this.group_datas = props.return;
    },
    async submit() {
      try {
        if (this.form_data.portals_groups_ids == null) return;
        this.form_data.portals_groups_ids = [...new Set(this.form_data.portals_groups_ids) as any]
        this.form_data.portals_groups_ids = this.form_data.portals_groups_ids.filter(function (el) {
          return el != null;
        });
        let resData = await PortalService.add(this.form_data);
        alert("Data insert successfully.")
        resData = resData.return;
        window.location.replace(`/admin/group-access/portal/${resData.id}/view`);
      } catch (ex) {
        console.error("submit - ex :: ", ex);
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
            <div class="page-pretitle">Group Akses</div>
            <h2 class="page-title">Manage User Portal</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/group-access/portal">
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
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Tambah Data User Portal</h3>
          </div>
          <div class="card-body">
            <form id="host-form">
              <input type="hidden" v-model="form_data.id" name="id">
              <div class="mb-3">
                <label class="form-label">Portal Name</label>
                <input type="text" class="form-control" name="name" v-model="form_data.name"
                  placeholder="Portal Name 1">
              </div>
              <!--   <div class="mb-3">
                <div class="form-label">Select Groups / Company</div>
                <select class="form-select">
                  <option :value="item.id" v-for="item in group_datas">
                    {{item.name}}
                  </option>
                </select>
              </div> -->
              <div class="form-group mb-3">
                <div class="form-label">Status</div>
                <select class="form-select" v-model="form_data.is_enable">
                  <option value="true">Active</option>
                  <option value="false">Suspend</option>
                </select>
              </div>
              <!--  <div class="form-group mb-3">
                <label class="form-label">Select relation</label>
                <div>
                  <button class="btn btn-primary" type="submit"
                    v-on:click="handleClick('OPEN_RELATION_DIALOG',{},$event)">Select
                    {{form_data.gm_table_name}}</button>
                  <div class="invalid-feedback"></div>
                </div>
              </div> -->
              <div class="form-footer">
                <button class="btn btn-primary" type="submit"
                  v-on:click="handleClick('SUBMIT',{},$event)">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br>
    </div>
    <div class="container-xl">
      <div class="card">
        <ul class="nav nav-tabs" data-bs-toggle="tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <a href="#for-privileges" class="nav-link active" data-bs-toggle="tab" aria-selected="true"
              role="tab">Privileges</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#for-groups" class="nav-link" data-bs-toggle="tab" aria-selected="false" tabindex="-1"
              role="tab">Groups</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#for-users" class="nav-link" data-bs-toggle="tab" aria-selected="false" tabindex="-1"
              role="tab">Users</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#for-positions" class="nav-link" data-bs-toggle="tab" aria-selected="false" tabindex="-1"
              role="tab">Positions</a>
          </li>
        </ul>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane" id="for-users" role="tabpanel">
              <div>
                <TabSelectUser></TabSelectUser>
              </div>
            </div>
            <div class="tab-pane" id="for-positions" role="tabpanel">
              <div>
                <TabSelectPosition></TabSelectPosition>
              </div>
            </div>
            <div class="tab-pane active" id="for-privileges" role="tabpanel">
              <div>Still on develop</div>
            </div>
            <div class="tab-pane" id="for-groups" role="tabpanel">
              <div>
                <div class="row g-2 align-items-center">
                  <div class="col">
                    <div class="page-pretitle">Company List</div>
                    <span class="text-muted">You can add how many company join this group</span>
                  </div>
                  <div class="col-12 col-md-auto ms-auto d-print-none">
                    <div class="btn-list">
                    </div>
                  </div>
                </div>
                <br>
                <div class="card">
                  <div class="table-responsive">
                    <table class="table table-vcenter table-mobile-md card-table">
                      <thead>
                        <tr>
                          <th class="w-1">
                            <input class="form-check-input m-0 align-middle" type="checkbox"
                              v-on:change="handleChange('SELECT_ALL_CHECKBOX',{},$event)"
                              aria-label="Select all invoices">
                          </th>
                          <th>Name</th>
                          <th class="w-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr :value="item.id" v-for="item in group_datas">
                          <td>
                            <input class="form-check-input m-0 align-middle" type="checkbox"
                              v-model="form_data.portals_groups_ids" :value="item.id" :true-value="[]"
                              aria-label="Select invoice">
                          </td>
                          <td data-label="Name">
                            <div class="d-flex py-1 align-items-center">
                              <span class="avatar me-2" style="background-image: url(./static/avatars/010m.jpg)"></span>
                              <div class="flex-fill">
                                <div class="font-weight-medium">{{item.name}}</div>
                                <div class="text-muted"><a href="#" class="text-reset">tkeelf@blogger.com</a></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="btn-list flex-nowrap">
                              <a href="#" class="btn">
                                Custom Privilege
                              </a>
                              <!-- <div class="dropdown">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown">
                                  Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </div>
                              </div> -->
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
      </div>
    </div>
  </div>
</template>