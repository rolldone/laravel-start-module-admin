<script lang="ts">
import GroupService, { GroupInterface } from 'src/services/GroupService';

export interface DataObject {
  form_data: GroupInterface
}

export default {
  data(): DataObject {
    return {
      form_data: {}
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
        let resData = await GroupService.add(this.form_data);
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
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Form Grup Perusahaan</h3>
          </div>
          <div class="card-body">
            <form id="host-form">
              <input type="hidden" v-model="form_data.id" name="id">
              <div class="form-group mb-3">
                <label class="form-label">Nama</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Kantor A"
                    v-model="form_data.name" name="name">
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-group mb-3">
                <div class="form-label">Status</div>
                <select class="form-select" v-model="form_data.is_enable">
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
      </div>
      <br>
      <br>
    </div>
  </div>
</template>