<script lang="ts">
import EmployeeService, { EmployeeInterface } from 'src/services/EmployeeService';
import SafeJson from 'src/functions/SafeJson';
import CreateSimpleId from 'src/functions/CreateSimpleId';

let myModal = null;
interface DataObject {
  employee_datas: Array<EmployeeInterface>
  id: string
}

export default {
  props: ["onlistener","group_id"],
  setup() {
    return {
      SafeJson,
      EmployeeService
    }
  },
  data(): DataObject {
    return {
      employee_datas: [],
      id: CreateSimpleId(10)
    }
  },
  methods: {
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_EMPLOYEE':

          break;
      }
    },
    async show(props: any) {
      let _id_element = this.id
      var _trrr = document.getElementById(_id_element);
      myModal = new window.bootstrap.Modal(_trrr, {
        backdrop: 'static',
        keyboard: false,

      });
      if (_trrr == null) return;
      _trrr.addEventListener("hidden.bs.modal", (event: any) => {
        // do something...
        if (event.target.id == _id_element) {

        }
      });
      myModal.show();
      this.setEmployees(await this.getEmployees());
    },
    async getEmployees() {
      try {
        let _group_id = this.$props.group_id;
        let resDatas = await EmployeeService.gets({});
        return resDatas;
      } catch (ex) {
        console.error("getEmployees - ex :: ", ex);
      }
    },
    setEmployees(props: any) {
      if (props == null) return;
      this.employee_datas = props.return;
    }
  }
}
</script>
<template>
  <div class="modal modal-blur fade" v-bind:id="id" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Employee List</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row row-cards">
            <div class="col-12">
              <div class="card">
                <div class="table-responsive">
                  <table class="table table-vcenter table-mobile-md card-table">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th class="w-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in employee_datas">
                        <td data-label="Name">
                          <div class="d-flex py-1 align-items-center">
                            <span style="background-image: url(./static/avatars/010m.jpg);"
                              class="avatar me-2">{{item.id}}</span>
                            <div class="flex-fill">
                              <div class="font-weight-medium">{{item.first_name}} {{item.last_name}}</div>
                              <div class="text-muted">
                                <a class="text-reset" href="#"></a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td data-label="Title">
                          <div>{{SafeJson(item,"email","-")}}</div>
                          <div class="text-muted"></div>
                        </td>
                        <td class="text-muted" data-label="Role">
                          {{item.status==EmployeeService.STATUS.ACTIVE?"Active":"Suspend"}}</td>
                        <td>
                          <div class="btn-list flex-nowrap">
                            <a class="btn" data-bs-dismiss="modal"
                              v-on:click="handleClick('SELECT_EMPLOYEE',{ id : item.id, index: index },$event)">Select</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
          <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>
</template>