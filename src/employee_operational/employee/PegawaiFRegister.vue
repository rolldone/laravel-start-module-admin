<script lang="ts">
import { ref } from 'vue';
import PeopleForm from './segment/PeopleForm.vue';
import ManagementForm from './segment/ManagementForm.vue';
import ManageAuthForm from './segment/UserAuthForm.vue';
import UserGroupPositionService, { UserGroupPositionServiceInteface } from 'src/services/UserGroupPositionService';
import UserService, { UserInterface } from 'src/services/UserService';
import EmployeeService, { EmployeeInterface } from 'src/services/EmployeeService';
import SafeJson from 'src/functions/SafeJson';
import DashboardService from 'src/services/DashboardService';
import PromptAskAuthenticationModal from './prompt_ask_authentication_modal/PromptAskAuthenticationModal.vue';
import { useRoute } from 'vue-router';
import AuthService from 'src/services/AuthService';
import SendResetPasswordModal from './send_reset_password_modal/SendResetPasswordModal.vue';

interface DataObject {
  form_data: {
    employee?: EmployeeInterface
    user_group_position?: UserGroupPositionServiceInteface
    user?: UserInterface,
    with_auth?: boolean
  },
  sendResetPasswordModal?: InstanceType<typeof SendResetPasswordModal>
  promptAskAuthenticationModal?: InstanceType<typeof PromptAskAuthenticationModal>
}

export default {
  setup() {
    let router = useRoute();
    return {
      SafeJson,
      router
    }
  },
  components: {
    PeopleForm,
    ManagementForm,
    ManageAuthForm,
    PromptAskAuthenticationModal,
    SendResetPasswordModal
  },
  data(): DataObject {
    return {
      form_data: {}
    }
  },
  mounted() {
    this.baseMounted();
  },
  methods: {
    async baseMounted() {
      if (this.router.query.upg_id == null) return;
      this.setUserPositionGroup(await this.getUserPositionGroupById());
    },
    async handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'PEOPLE_FORM':
          this.form_data.employee = props;
          this.setUserPositionGroup(await this.getUserPositionGroupByEmployee());
          break;
        case 'MANAGEMENT_FORM':
          this.form_data.user_group_position = props;
          break;
        case 'AUTH_FORM':
          // this.form_data.user = props;
          this.sendResetPasswordModal = this.$refs.sendResetPasswordModal as any;
          if (this.sendResetPasswordModal == null) return;
          this.sendResetPasswordModal.show({});
          break;
        case 'PROMPT_ASK_AUTH_LISTENER':
          this.form_data.with_auth = props.with_auth;
          this.submit();
          break;
        case 'SEND_RESET_PASSWORD_LISTENER':
          await this.submitResetPassword();
          alert("Account password is reseted")
          break;
      }
    },
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'PRE_SUBMIT':
          e.preventDefault();
          if (SafeJson(this.form_data, 'user_group_position.id', null) != null) {
            return this.submit();
          }
          this.promptAskAuthenticationModal = this.$refs.promptAskAuthenticationModal as any;
          if (this.promptAskAuthenticationModal == null) return;
          this.promptAskAuthenticationModal.show({});
          break;
      }
    },
    async getUserPositionGroupByEmployee() {
      try {
        let employee = this.form_data.employee;
        let resData = await DashboardService.employee.getUPG_ByEmployeeId_CurrentGroup(SafeJson(employee, 'id', null));
        return resData;
      } catch (ex) {
        console.error("getUserPositionGroupByEmployee - ex :: ", ex);
      }
    },
    async getUserPositionGroupById() {
      try {
        let id = this.router.query.upg_id;
        let resData = await DashboardService.employee.getUPG_ById(id as any);
        return resData;
      } catch (ex) {
        console.error("getUserPositionGroup - ex :: ", ex);
      }
    },
    setUserPositionGroup(props: any) {
      if (props == null) return;
      console.log("props :: ", props);
      this.form_data.user_group_position = props.return;
      if(this.form_data.employee == null){
        this.form_data.employee = props.return.employee;
      }
    },
    async submitResetPassword() {
      let _form_data = this.form_data;
      return AuthService.registerWithoutPassword({
        email: SafeJson(_form_data, 'employee.email', null),
        name: SafeJson(_form_data, 'employee.first_name') + ' ' + SafeJson(_form_data, "employee.last_name")
      })
    },
    async submit() {
      try {
        let _form_data = this.form_data;
        let resData = null;
        // IF auth true register to have own user
        if (_form_data.with_auth == true) {
          resData = await this.submitResetPassword();
          if (_form_data.employee != null) {
            _form_data.employee.user_id = resData.return.id;
          }
        }
        // Update employee
        resData = await EmployeeService.update(_form_data.employee as any);
        // Update user group and position
        resData = await DashboardService.employee.addUPGByCurrentGRoup({
          employee_id: SafeJson(_form_data, 'employee.id', null),
          position_id: SafeJson(_form_data, 'user_group_position.position_id', null),
          division_id: SafeJson(_form_data, 'user_group_position.division_id', null)
        });
        alert("Update is updated!");
      } catch (ex) {
        console.error("setUserPositionGroup - ex :: ", ex);
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
            <div class="page-pretitle">Management Group</div>
            <h2 class="page-title">Pegawai</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/operational-employee/employee">
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
        <PeopleForm v-bind:props_form_data='form_data.employee' v-bind:onlistener="handleListener.bind($,'PEOPLE_FORM')"></PeopleForm>
      </div>
      <br>
      <div class="col-md-12" v-if="form_data.employee != null">
        <ManagementForm v-bind:props_form_data="form_data.user_group_position"
          v-bind:onlistener="handleListener.bind($,'MANAGEMENT_FORM')"></ManagementForm>
      </div>
      <template v-if="SafeJson(form_data,'user_group_position.id',null) != null">
        <br>
        <div class="col-md-12">
          <ManageAuthForm v-bind:onlistener="handleListener.bind($,'AUTH_FORM')"></ManageAuthForm>
        </div>
      </template>
      <br>
      <div class="row">
        <div class="col"></div>
        <div class="col-auto">
          <a v-if="form_data.user_group_position != null" v-on:click="handleClick('PRE_SUBMIT',{},$event)"
            class="btn btn-primary w-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24"
              height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
              <circle cx="12" cy="14" r="2"></circle>
              <polyline points="14 4 14 8 8 8 8 4"></polyline>
            </svg>
            Save
          </a>
        </div>
      </div>
      <br>
      <br>
    </div>
  </div>
  <PromptAskAuthenticationModal v-bind:onlistener="handleListener.bind($,'PROMPT_ASK_AUTH_LISTENER')"
    ref="promptAskAuthenticationModal"></PromptAskAuthenticationModal>
  <SendResetPasswordModal v-bind:onlistener="handleListener.bind($,'SEND_RESET_PASSWORD_LISTENER')"
    ref="sendResetPasswordModal">
  </SendResetPasswordModal>
</template>