<script lang="ts">
import DivisiService, { DivisionInterface } from 'src/services/DivisionService';
import { ref } from 'vue';
import SelectParentModal from './select_parent_modal/SelectParentModal.vue';

let form_data = ref<DivisionInterface>({
  is_enable: false,
  name: ""
})

let select_divisi = ref<DivisionInterface>({});

let modalParentDialog = ref<InstanceType<typeof SelectParentModal>>();

export default {
  components: {
    SelectParentModal
  },
  setup() {
    return {
      form_data,
      modalParentDialog,
      select_divisi
    }
  },
  methods: {
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'OPEN_PARENT_DIALOG':
          e.preventDefault();
          if (this.modalParentDialog == null) return;
          this.modalParentDialog.show({});
          break;
        case 'SUBMIT':
          e.preventDefault();
          try {
            await DivisiService.add(this.form_data);
            alert("Add new divisi is success");
          } catch (ex) {
            console.error("submit - ex :: ", ex);
          }
          break;
      }
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_MODAL_PARENT_LISTENER':
          this.select_divisi = props;
          this.form_data.parent_id = props.id;
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
            <div class="page-pretitle">grup manajemen</div>
            <h2 class="page-title">Divisi</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/group-management/divisi">
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
            <h3 class="card-title">Tambah Data Pegawai Form</h3>
          </div>
          <div class="card-body">
            <form id="host-form">
              <input type="hidden" v-model="form_data.id" name="id">
              <input type="hidden" v-model="form_data.parent_id" name="parent_id">
              <div class="form-group mb-3">
                <label class="form-label">Nama Divisi</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Divis IT"
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
              <div class="form-group mb-3">
                <label class="form-label">Divisi atas</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Divis IT"
                    v-model="select_divisi.name" name="parent_division" readonly>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Select Parent For this Current division</label>
                <div>
                  <button class="btn btn-primary" type="submit"
                    v-on:click="handleClick('OPEN_PARENT_DIALOG',{},$event)">Select Parent Division</button>
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
  <SelectParentModal ref="modalParentDialog" v-bind:onlistener="handleListener.bind($,'SELECT_MODAL_PARENT_LISTENER')">
  </SelectParentModal>
</template>