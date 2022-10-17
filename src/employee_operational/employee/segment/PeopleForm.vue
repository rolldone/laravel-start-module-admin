<script lang="ts">
import { EmployeeInterface } from 'src/services/EmployeeService';
import SelectPeopleModal from 'src/components/select_people_modal/SelectPeopleModal';
import DashboardService from 'src/services/DashboardService';

interface DataObject {
  form_data: EmployeeInterface,
  selectPeopleModal?: InstanceType<typeof SelectPeopleModal>
}

export default {
  props: ["onlistener", "props_form_data"],
  components: {
    SelectPeopleModal
  },
  data(): DataObject {
    return {
      form_data: {},
    }
  },
  watch: {
    form_data(data) {
      this.$props.onlistener(data);
    },
    "$props.props_form_data"(data) {
      this.form_data = data || {};
    }
  },
  methods: {
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'IMPORT_PEOPLE':
          e.preventDefault();
          this.selectPeopleModal = this.$refs.selectPeopleModal as any;
          if (this.selectPeopleModal == null) return;
          // Inject the http service
          this.selectPeopleModal.getEmployees = async function () {
            try {
              let users = await DashboardService.employee.getsEmployeeByCurrentGroupAndFree({
                search: this.search_text
              });
              return users;
            } catch (ex) {
              console.error("getEmployees - ex :: ", ex);
            }
          }
          this.selectPeopleModal.show({});
          break;
      }
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_PEOPLE_MODAL_LISTENER':
          this.form_data = props;
          this.$emit("form_data", props);
          if (this.selectPeopleModal == null) return;
          this.selectPeopleModal.hide();
          break;
      }
    }
  }
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Import / Manage data people</h3>
    </div>
    <div class="card-body">
      <form id="host-form">
        <input type="hidden" v-model="form_data.id" name="id">
        <input type="hidden" v-model="form_data.user_id" name="user_id">
        <div class="form-group mb-3">
          <label class="form-label">Search People</label>
          <div>
            <button class="btn btn-primary" type="submit" v-on:click="handleClick('IMPORT_PEOPLE',{},$event)">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-search" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h1"></path>
                <circle cx="16.5" cy="17.5" r="2.5"></circle>
                <path d="M18.5 19.5l2.5 2.5"></path>
              </svg>
              Import</button>
          </div>
        </div>
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
          <textarea class="form-control" rows="6" placeholder="Jln Kepaon Indah Blok.." v-model="form_data.address"
            name="address"></textarea>
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
        <!-- <div class="form-footer" v-if="form_data.id != null">
          <button class="btn btn-primary" type="submit" v-on:click="handleClick('SUBMIT',{},$event)">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24"
              height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
              <circle cx="12" cy="14" r="2"></circle>
              <polyline points="14 4 14 8 8 8 8 4"></polyline>
            </svg>
            Save
          </button>
        </div> -->
      </form>
    </div>
  </div>
  <SelectPeopleModal ref="selectPeopleModal" v-bind:onlistener="handleListener.bind($,'SELECT_PEOPLE_MODAL_LISTENER')">
  </SelectPeopleModal>
</template>