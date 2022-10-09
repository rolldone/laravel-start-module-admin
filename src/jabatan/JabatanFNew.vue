<script lang="ts">
import { DivisionInterface } from 'src/services/DivisionService';
import PositionService, { PositionInterface } from 'src/services/PositionService';
import { ref } from 'vue';
import SelectDivisionModal from './select_division_modal/SelectDivisionModal.vue';

export let form_data = ref<PositionInterface>({});
export let select_divisi = ref<DivisionInterface>({});

export default {
  components: {
    SelectDivisionModal
  },
  data() {
    return {
      form_data,
      select_divisi
    }
  },
  methods: {
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'OPEN_DIVISION_DIALOG':
          e.preventDefault();
          if (this.$refs.selectDivisionModalComponent == null) throw new Error("error");
          let _selectdiv: InstanceType<typeof SelectDivisionModal> = this.$refs.selectDivisionModalComponent as any;
          _selectdiv.show({});
          break;
        case 'SUBMIT':
          e.preventDefault();
          try {
            await PositionService.add(this.form_data);
            alert("Add new jabatan is success");
          } catch (ex) {
            console.error("submit - ex :: ", ex);
          }
          break;
      }
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'ON_SELECT_DIVISION_LISTENER':
          this.select_divisi = props;
          this.form_data.division_id = props.id;
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
            <h2 class="page-title">Nama Jabatan</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/grup-manajemen/jabatan">
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
              <input type="hidden" v-model="form_data.division_id" name="division_id">
              <div class="form-group mb-3">
                <label class="form-label">Nama Depan</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="John"
                    v-model="form_data.name" name="first_name">
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
                <label class="form-label">Dalam Divisi</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Divis IT"
                    v-model="select_divisi.name" name="parent_division" readonly>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Select Division</label>
                <div>
                  <button class="btn btn-primary" type="submit"
                    v-on:click="handleClick('OPEN_DIVISION_DIALOG',{},$event)">Select Division</button>
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
      <br>
    </div>
  </div>
  <SelectDivisionModal ref="selectDivisionModalComponent"
    v-bind:onlistener="handleListener.bind($,'ON_SELECT_DIVISION_LISTENER')">
  </SelectDivisionModal>
</template>