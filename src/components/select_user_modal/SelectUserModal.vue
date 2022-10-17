<script lang="ts">
import { debounce, DebouncedFunc } from 'lodash';
import CreateSimpleId from 'src/functions/CreateSimpleId';
import UserService, { UserInterface } from 'src/services/UserService';

interface DataObject {
  user_datas: Array<UserInterface>
  id: string
  search_text: string
  pendingSearch?: DebouncedFunc<any> | null
}

let myModal: any = null;

export default {
  props: ["onlistener"],
  data(): DataObject {
    return {
      search_text: "",
      user_datas: [],
      id: CreateSimpleId(10),
      pendingSearch: null
    }
  },
  mounted() {
    this.baseMounted();
  },
  watch: {
    search_text(data, oldData) {
      if (this.pendingSearch != null) {
        this.pendingSearch.cancel();
      }
      this.pendingSearch = debounce(async (data: string) => {
        this.setUsers(await this.getUsers());
      }, 1000);
      this.pendingSearch(data);
    }
  },
  methods: {
    async baseMounted() { },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT':
          e.preventDefault();
          this.$props.onlistener({
            ...props.item
          }, e);
          break;
      }
    },
    async show(props: any) {
      let _id_element = this.id
      var _trrr = document.getElementById(_id_element);
      myModal = new window.bootstrap.Modal(_trrr, {
        backdrop: 'static',
        keyboard: false
      });
      if (_trrr == null) return;
      _trrr.addEventListener("hidden.bs.modal", (event: any) => {
        // do something...
        if (event.target.id == _id_element) { }
      });
      myModal.show();
      this.setUsers(await this.getUsers());
    },
    async hide() {
      myModal.hide();
    },
    getUsers() {
      try {
        let users = UserService.gets({
          search: this.search_text
        });
        return users;
      } catch (ex) {
        console.error("getUsers - ex :: ", ex);
      }
    },
    setUsers(props: any) {
      if (props == null) return;
      this.user_datas = props.return;
    }
  }
}
</script>
<template>
  <div class="modal modal-blur fade" :id="id" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select Users</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-header">
              <div class="input-icon" style="width:100%;">
                <input type="text" v-model="search_text" class="form-control" placeholder="Search…">
                <span class="input-icon-addon">
                  <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <line x1="21" y1="21" x2="15" y2="15"></line>
                  </svg>
                </span>
              </div>
            </div>
            <div class="list-group list-group-flush overflow-auto" style="max-height: 35rem">
              <div class="list-group-item"  v-for="item in user_datas">
                <div class="row">
                  <div class="col-auto">
                    <a href="#">
                      <span class="avatar" style="background-image: url(./static/avatars/023f.jpg)"></span>
                    </a>
                  </div>
                  <div class="col text-truncate">
                    <a href="#" class="text-body d-block">{{item.name}}</a>
                    <div class="text-muted text-truncate mt-n1">{{item.email}}(#{{item.id}})</div>
                  </div>
                  <div class="col-auto">
                    <a class="btn btn-blue w-100" v-on:click="handleClick('SELECT',{ item : item },$event)">
                      Select
                    </a>
                  </div>
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