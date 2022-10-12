<script lang="ts">
import EmployeeService from "src/services/EmployeeService";
import GroupService, { GroupInterface } from "src/services/GroupService";
import { PortalInterface } from "src/services/PortalService";
import { useRoute } from "vue-router";
import SelectEmployeeModal from './select_employee_modal/SelectEmployeeModal.vue';

interface DataObject {
  form_data: PortalInterface,
  group_datas: Array<GroupInterface>
  what_relation: string
}
export default {
  components: {
    SelectEmployeeModal
  },
  data(): DataObject {
    return {
      form_data: {},
      group_datas: [],
      what_relation: ""
    }
  },
  async mounted() {
    let route = useRoute();
    this.setGroups(await this.getGroups());
    this.form_data.gm_table_name = route.query.type as any;
  },
  methods: {
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_EMPLOYEE':

          break;
      }
    },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          break;
        case 'OPEN_RELATION_DIALOG':
          e.preventDefault();
          switch (this.form_data.gm_table_name) {
            case 'employee':
              let _modalSelectEmployee: InstanceType<typeof SelectEmployeeModal> = this.$refs.modalSelectEmployee as any;
              if (_modalSelectEmployee == null) return;
              _modalSelectEmployee.show({});
              break;
            case 'division':
              break;
            case 'position':
              break;
          }
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
    async getEmployees() {
      try {
        let form_data = await EmployeeService.gets({});
      } catch (ex) {
        console.error("getEmployees - ex :: ", ex);
      }
    },
    setEmployees(props: any) {
      if (props == null) return;

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
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/grup-akses/user-portal">
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
              <input type="hidden" v-model="form_data.gm_rel_id" name="gm_rel_id">
              <input type="hidden" v-model="form_data.gm_table_name" name="gm_table_name">

              <div class="mb-3">
                <div class="form-label">Select Groups / Company</div>
                <select class="form-select">
                  <option :value="item.id" v-for="item in group_datas">
                    {{item.name}}
                  </option>
                </select>
              </div>
              <div class="form-group mb-3">
                <div class="form-label">Status</div>
                <select class="form-select" v-model="form_data.is_enable">
                  <option value="true">Active</option>
                  <option value="false">Suspend</option>
                </select>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Select relation</label>
                <div>
                  <button class="btn btn-primary" type="submit"
                    v-on:click="handleClick('OPEN_RELATION_DIALOG',{},$event)">Select
                    {{form_data.gm_table_name}}</button>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
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
  </div>
  <SelectEmployeeModal ref="modalSelectEmployee" v-bind:group_id="form_data.group_id"
    v-bind:onlistener="handleListener.bind($,'SELECT_EMPLOYEE')">
  </SelectEmployeeModal>
</template>