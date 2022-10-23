<script lang="ts">
import EmployeeService, { EmployeeInterface } from 'src/services/EmployeeService';
import { UserInterface } from 'src/services/UserService';
import UserService from 'src/services/UserService';

interface DataObject {
  form_data: {
    user: UserInterface
    employee: EmployeeInterface
  }
}

export default {
  data(): DataObject {
    return {
      form_data: {
        user: {
          email: "",
          password: "",
          password_confirm: ""
        },
        employee: {}
      }
    }
  },
  mounted() {
    this.baseMounted();
  },
  methods: {
    async baseMounted() {
      this.setSelfUser(await this.getSelfUser());
      this.setSelfEmployee(await this.getSelfEmployee());
    },
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
        let resData = await UserService.update(this.form_data.user);
        alert("User Auth is updated!");
      } catch (ex) {
        console.error("submitData - ex :: ", ex);
      }
    },
    async getSelfUser() {
      try {
        let resData = await UserService.getSelf();
        return resData;
      } catch (ex) {
        console.error("getSelfUser - ex :: ", ex);
      }
    },
    setSelfUser(props: any) {
      if (props == null) return;
      this.form_data.user = props.return;
      console.log(props);
    },
    async getSelfEmployee() {
      try {
        let resData = await EmployeeService.getSelf();
        return resData;
      } catch (ex) {
        console.error("getSelfEmployee - ex :: ", ex);
      }
    },
    setSelfEmployee(props: any) {
      if (props == null) return;
      console.log(props);
    }
  }
}
</script>
<template>
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <!-- Page pre-title -->
          <div class="page-pretitle">
            User Account
          </div>
          <h2 class="page-title">
            User Information
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-12 col-md-auto ms-auto d-print-none">
          <div class="btn-list">
            <!--  <span class="d-none d-sm-inline">
              <a href="#" class="btn btn-white">
                New view
              </a>
            </span> -->
            <a v-on:click="handleClick('SUBMIT',{},$event)" class="btn btn-primary d-none d-sm-inline-block"
              data-bs-toggle="modal" data-bs-target="#modal-report">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                <circle cx="12" cy="14" r="2"></circle>
                <polyline points="14 4 14 8 8 8 8 4"></polyline>
              </svg>
              Save
            </a>
            <a href="#" class="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report"
              aria-label="Create new report">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-body" style="height:100%;">
    <div class="container mt-3 mb-3">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <a href="#tabs-user" class="nav-link active" data-bs-toggle="tab" aria-selected="false" role="tab"
                tabindex="-1">As User</a>
            </li>
            <li class="nav-item" role="presentation">
              <a href="#tabs-employee" class="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">As
                Employee</a>
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
            <div class="tab-pane active" id="tabs-user" role="tabpanel">
              <div class="row">
                <div class="col border-right">
                  <div class="">
                    <div class="row">
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Email Address</label>
                        <input type="text" class="form-control" placeholder="enter email address"
                          v-model="form_data.user.email">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" placeholder="enter password"
                          v-model="form_data.user.password">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Password Confirmation</label>
                        <input type="password" class="form-control" placeholder="enter password confirmation"
                          v-model="form_data.user.password_confirm">
                      </div>
                    </div>
                    <br>
                    <br>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="tabs-employee" role="tabpanel">
              <div class="row">
                <div class="col-md-3 border-right">
                  <div class="d-flex flex-column align-items-center text-center p-3 py-3">
                    <img class="rounded-circle mt-5" width="150px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                    <span class="font-weight-bold">Edogaru</span>
                    <span class="text-black-50">edogaru@mail.com.my</span>
                    <span></span>
                  </div>
                </div>
                <div class="col border-right">
                  <div class="p-3 py-3">
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" placeholder="first name" value="">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Surname</label>
                        <input type="text" class="form-control" value="" placeholder="surname">
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Mobile Number</label>
                        <input type="text" class="form-control" placeholder="enter phone number" value="">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Address Line 1</label>
                        <input type="text" class="form-control" placeholder="enter address line 1" value="">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Address Line 2</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value="">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Postcode</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value="">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">State</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value="">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Area</label>
                        <input type="text" class="form-control" placeholder="enter address line 2" value="">
                      </div>
                      <div class="col-md-12 mt-3">
                        <label class="form-label">Email ID</label>
                        <input type="text" class="form-control" placeholder="enter email id" value="">
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <label class="form-label">Country</label>
                        <input type="text" class="form-control" placeholder="country" value="">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">State/Region</label>
                        <input type="text" class="form-control" value="" placeholder="state">
                      </div>
                    </div>
                    <br>
                    <br>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="tabs-settings-7" role="tabpanel">
              <h4>Settings tab</h4>
              <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris
                accumsan
                nibh habitant senectus</div>
            </div>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>