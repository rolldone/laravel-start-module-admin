<script lang="ts">
import { EmployeeInterface } from 'src/services/EmployeeService';
import { UserInterface } from 'src/services/UserService';

interface DataObject {
  form_data: UserInterface
}

export default {
  props: ["onlistener"],
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
          this.$props.onlistener({}, e);
          break;
      }
    }
  }
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Manage User Authentication</h3>
    </div>
    <div class="card-body">
      <form id="host-form">
        <input type="hidden" v-model="form_data.id" name="id">
        <!-- <div class="form-group mb-3">
          <label class="form-label">User Name</label>
          <div>
            <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="John"
              v-model="form_data.email" name="email" readonly>
            <div class="invalid-feedback"></div>
          </div>
        </div> -->

        <div class="form-group mb-3">
          <label class="form-label">Generate or reset password automatic and send via email</label>
          <div>
            <button class="btn btn-primary" type="submit" v-on:click="handleClick('SUBMIT',{},$event)">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-key" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="8" cy="15" r="4"></circle>
                <line x1="10.85" y1="12.15" x2="19" y2="4"></line>
                <line x1="18" y1="5" x2="20" y2="7"></line>
                <line x1="15" y1="8" x2="17" y2="10"></line>
              </svg>
              Send
            </button>
          </div>
        </div>
        <!-- <div class="form-footer" v-if="form_data.id != null">
          <button class="btn btn-primary" type="submit" >Submit</button>
        </div> -->
      </form>
    </div>
  </div>
</template>