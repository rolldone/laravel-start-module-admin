<script lang="ts">
import { ref } from 'vue';
import CreateSimpleId from 'src/functions/CreateSimpleId';
import { getDivisions } from '../Divisi.vue';
import { DivisiInterface } from 'src/services/DivisiService';
import SafeJson from 'src/functions/SafeJson';

let id = ref(CreateSimpleId(10));

let divisi_datas = ref<Array<DivisiInterface>>([]);

let myModal: any = null;

const setDivisions = async (props: any) => {
  if (props == null) return null;
  divisi_datas.value = props.return;
}


export default {
  props: ["onlistener"],
  setup(props: any) {
    return {
      id,
      divisi_datas,
      SafeJson
    }
  },
  methods: {
    async show(props: any) {
      let _id_element = id.value
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
      setDivisions(await getDivisions());
    },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_PARENT_DIVISION':
          e.preventDefault();
          let _divisi_item = divisi_datas.value[props.index];
          this.onlistener(_divisi_item, e);
          break;
      }
    }
  }
}
</script>

<template>
  <div class="modal modal-blur fade" v-bind:id="id" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Daftar Divisi</h5>
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
                        <th>Parent</th>
                        <th>Status</th>
                        <th class="w-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in divisi_datas">
                        <td data-label="Name">
                          <div class="d-flex py-1 align-items-center">
                            <span style="background-image: url(./static/avatars/010m.jpg);"
                              class="avatar me-2">{{item.id}}</span>
                            <div class="flex-fill">
                              <div class="font-weight-medium">{{item.name}}</div>
                              <div class="text-muted">
                                <a class="text-reset" href="#"></a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td data-label="Title">
                          <div>{{SafeJson(item.parent_division,"name","-")}}</div>
                          <div class="text-muted"></div>
                        </td>
                        <td class="text-muted" data-label="Role">{{item.is_enable==true?"Active":"Suspend"}}</td>
                        <td>
                          <div class="btn-list flex-nowrap">
                            <a class="btn" data-bs-dismiss="modal"
                              v-on:click="handleClick('SELECT_PARENT_DIVISION',{ id : item.id, index: index },$event)">Select</a>
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