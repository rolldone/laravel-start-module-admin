<script lang="ts">
import { PegawaiInterface } from 'src/services/PegawaiService';
import { ref } from 'vue';
import AddPegawai from './functions/AddPegawai';

let form_data = ref<PegawaiInterface>({
  id: 0,
  user_id: 0,
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  address: ""
});

export default {
  setup() {
    return {
      form_data
    }
  },
  methods: {
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          try {
            await AddPegawai(form_data.value);
            alert("Add data pegawai is success!");
          } catch (ex) {
            console.error("submit - ex :: ", ex);
          }
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
            <h2 class="page-title">Pegawai</h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a class="btn btn-primary d-none d-sm-inline-block" href="/admin/grup-manajemen/pegawai">
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
              <input type="hidden" v-model="form_data.user_id" name="user_id">
              <div class="form-group mb-3">
                <label class="form-label">Nama Depan</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="John"
                    v-model="form_data.first_name" name="first_name">
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Nama Belakang</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Smith"
                    v-model="form_data.last_name" name="last_name">
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Address <span class="form-label-description">
                    <!-- 56/100 -->
                  </span>
                </label>
                <textarea class="form-control" rows="6" placeholder="Jln Kepaon Indah Blok.."
                  v-model="form_data.address" name="address"></textarea>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">No Telephone</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="021xxxxxx"
                    v-model="form_data.phone_number" name="phone_number">
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Email</label>
                <div>
                  <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="johnsmit@gmail.com"
                    v-model="form_data.email" name="email">
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-group mb-3">
                <div class="form-label">Status</div>
                <select class="form-select" v-model="form_data.status">
                  <option value="1">Active</option>
                  <option value="0">Suspend</option>
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