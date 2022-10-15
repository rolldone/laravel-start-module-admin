<script lang="ts">
import PrivilegeService, { PrivilegeInterface } from "src/services/PrivilegeService";
import TabSelectPosition from "./tab_select_position/TabSelectPosition.vue";
import TabSelectuser from './tab_select_user/TabSelectUser.vue';

interface DataObject {
  form_data: PrivilegeInterface,
  group_datas: Array<PrivilegeInterface>
  what_relation: string
}

export default {
  components: {
    TabSelectPosition,
    TabSelectuser
  },
  setup() {
    return {
      PrivilegeService
    }
  },
  data(): DataObject {
    return {
      form_data: {

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
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) { }
    },
    handleChange(action: string, props: any, e: any) {
      switch (action) { }
    },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          this.submit();
          break;
      }
    },

    async submit() {
      try {
        let resData = await PrivilegeService.add(this.form_data);
        debugger;
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
            <div class="page-pretitle">Group Access</div>
            <h2 class="page-title">Manage Privilege</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/group-access/group">
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
            <h3 class="card-title">Add New Privilege</h3>
          </div>
          <div class="card-body">
            <form id="host-form">
              <input type="hidden" v-model="form_data.id" name="id">
              <div class="mb-3">
                <label class="form-label">Privilege Name</label>
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
                <select class="form-select" v-model="form_data.is_enabled">
                  <option value="true">Active</option>
                  <option value="false">Suspend</option>
                </select>
              </div>
              <div class="form-group mb-3">
                <div class="form-label">Privilege For</div>
                <select class="form-select" v-model="form_data.type">
                  <option :value="PrivilegeService.TYPE.GROUP">Group</option>
                  <option :value="PrivilegeService.TYPE.USER">User</option>
                </select>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Description <span class="form-label-description">56/100</span></label>
                <textarea v-model="form_data.description" class="form-control" name="example-textarea-input" rows="6"
                  placeholder="Description.."></textarea>
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
    <div class="container-xl" v-if="form_data.id != null">
      <div class="card">
        <ul class="nav nav-tabs" data-bs-toggle="tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <a href="#tabs-home-7" class="nav-link active" data-bs-toggle="tab" aria-selected="true"
              role="tab">Privileges</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#for-positions" class="nav-link" data-bs-toggle="tab" aria-selected="false" tabindex="-1"
              role="tab">Positions</a>
          </li>
          <li class="nav-item" role="presentation">
            <a href="#for-users" class="nav-link" data-bs-toggle="tab" aria-selected="false" tabindex="-1"
              role="tab">Users</a>
          </li>
        </ul>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane active show" id="tabs-home-7" role="tabpanel">
              <div>Still on progress</div>
            </div>
            <div class="tab-pane" id="for-positions" role="tabpanel">
              <div>
                <TabSelectPosition></TabSelectPosition>
              </div>
            </div>
            <div class="tab-pane" id="for-users" role="tabpanel">
              <div>
                <TabSelectuser></TabSelectuser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>