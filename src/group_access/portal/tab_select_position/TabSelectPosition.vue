<script lang="ts">
import SelectPositionModal from 'src/components/select_position_modal/SelectPositionModal';
import PortalService from 'src/services/PortalService';
import PositionService, { PositionInterface } from 'src/services/PositionService';
import PrivilegeService from 'src/services/PrivilegeService';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

interface DataObject {
  position_datas: Array<PositionInterface>
}
export default defineComponent({
  components: {

    SelectPositionModal
  },
  setup() {
    let router = useRoute();
    return {
      router
    }
  },
  data(): DataObject {
    return {
      position_datas: []
    }
  },
  mounted() {
    this.baseMounted()
  },
  methods: {
    async baseMounted() {
      this.setPositions(await this.getPositions());
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_POSITION_MODAL_LISTENER':
          let selectPositionModal = this.$refs.selectPositionModalRef as InstanceType<typeof SelectPositionModal>;
          // Inject this function
          selectPositionModal.hide();
          this.submit(props.id);
          break;
      }
    },
    handleClick(action: string, props: any, e: any) {
      let self = this;
      switch (action) {
        case 'DELETE_REGISTER':
          e.preventDefault();
          this.submit(props.id);
          break;
        case 'SHOW_POSITION_MODAL':
          e.preventDefault();
          let selectPositionModal = this.$refs.selectPositionModalRef as InstanceType<typeof SelectPositionModal>;
          // Inject this function
          selectPositionModal.getPositionDatas = async function (this: InstanceType<typeof SelectPositionModal>) {
            try {
              let positions = await PortalService.position.getPositionsWithoutPortalId(self.router.params.id as any, {
                search: this.search_text
              });
              return positions;
            } catch (ex) {
              console.error("getUsers - ex :: ", ex);
            }
          }.bind(selectPositionModal)
          selectPositionModal.show({});
          break;
      }
    },
    async getPositions() {
      try {
        let resData = await PortalService.position.getPositionsByPortalId(this.router.params.id as any, {});
        return resData;
      } catch (ex) {
        console.error("getPositions - ex :: ", ex);
      }
    },
    setPositions(props: any) {
      if (props == null) return;
      this.position_datas = props.return;
    },
    async submit(position_id: number) {
      try {
        let resData = await PortalService.position.joinPortal(this.router.params.id as any, position_id);
        this.baseMounted()
      } catch (ex) {
        console.error("submit - ex :: ", ex);
      }
    }
  }
})
</script>
<template>
  <div class="row g-2 align-items-center">
    <div class="col">
      <div class="page-pretitle">Position List</div>
      <!-- <h7 class="page-title">Add User to join portal</h7> -->
      <span class="text-muted">You can add position to join this portal</span>
    </div>
    <div class="col-12 col-md-auto ms-auto d-print-none">
      <div class="btn-list">
        <a class="btn btn-primary d-none d-sm-inline-block" v-on:click="handleClick('SHOW_POSITION_MODAL',{},$event)">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plug" width="24" height="24"
            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054z"></path>
            <path d="M4 20l3.5 -3.5"></path>
            <path d="M15 4l-3.5 3.5"></path>
            <path d="M20 9l-3.5 3.5"></path>
          </svg>
          Add
        </a>
      </div>
    </div>
  </div>
  <br>
  <div class="card">
    <div class="table-responsive">
      <table class="table table-vcenter card-table">
        <thead>
          <tr>
            <th>Name</th>
            <th class="w-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in position_datas">
            <td>
              <div class="d-flex py-1 align-items-center">
                <span class="avatar me-2" style="background-image: url(./static/avatars/009m.jpg)"></span>
                <div class="flex-fill">
                  <div class="font-weight-medium">{{item.name}}</div>
                  <div class="text-muted"><a href="#" class="text-reset">{{item.division.name}}</a></div>
                </div>
              </div>
            </td>
            <td>
              <a class="btn btn-youtube w-100 btn-icon" aria-label="Delete"
                v-on:click="handleClick('DELETE_REGISTER',{ id : item.id },$event)">
                <!-- Download SVG icon from http://tabler-icons.io/i/brand-youtube -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <SelectPositionModal ref="selectPositionModalRef"
    v-bind:onlistener="handleListener.bind($,'SELECT_POSITION_MODAL_LISTENER')">
  </SelectPositionModal>
</template>