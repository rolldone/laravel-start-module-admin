<script lang="ts">
import PositionService, { PositionInterface } from 'src/services/PositionService';
import SelectPositionModal from 'src/components/select_position_modal/SelectPositionModal';
import { UserGroupPositionServiceInteface } from 'src/services/UserGroupPositionService';
import SafeJson from 'src/functions/SafeJson';

interface DataObject {
  form_data: UserGroupPositionServiceInteface
  position_datas: Array<PositionInterface>
}

let selectPositionModal: InstanceType<typeof SelectPositionModal> = null as any

export default {
  props: ["onlistener", "props_form_data"],
  setup() {
    return {
      selectPositionModal,
      SafeJson
    }
  },
  components: {
    SelectPositionModal
  },
  data(): DataObject {
    return {
      form_data: {},
      position_datas: []
    }
  },
  watch: {
    "$props.props_form_data"(data) {
      this.form_data = data || {};
    }
  },
  methods: {
    async getPositions() {
      try {
        let resData = await PositionService.gets({});
        return resData;
      } catch (ex) {
        console.error("getPositions - ex :: ", ex);
      }
    },
    setPositions(props: any) {
      if (props == null) return;
      this.position_datas = props.return;
    },
    handleListener(action: string, props: any, e: any) {
      switch (action) {
        case 'SELECT_POSITION_LISTENER':
          this.form_data.position_id = props.id;
          this.form_data.position = props;
          this.form_data.division_id = props.division_id;
          this.form_data.division = props.division;
          if (this.selectPositionModal == null) return;
          this.selectPositionModal.hide();
          this.$props.onlistener(this.form_data);
          break;
      }
    },
    handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SEARCH_POSITION':
          e.preventDefault();
          this.selectPositionModal = this.$refs.selectPositionModal as InstanceType<typeof SelectPositionModal>;
          if (this.selectPositionModal == null) return;
          this.selectPositionModal.show({});
          break;
      }
    }
  }
}
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Manage Job And Permission Access</h3>
    </div>
    <div class="card-body">
      <form id="host-form">
        <input type="hidden" v-model="form_data.id" name="id">
        <input type="hidden" v-model="form_data.division_id" name="division_id">
        <input type="hidden" v-model="form_data.position_id" name="position_id">
        <input type="hidden" v-model="form_data.group_id" name="group_id">
        <input type="hidden" v-model="form_data.employee_id" name="employee_id">
        <div class="form-group mb-3">
          <label class="form-label">Search Positions</label>
          <div>
            <button class="btn btn-primary" type="submit" v-on:click="handleClick('SEARCH_POSITION',{},$event)">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chef-hat" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4.002 4.002 0 1 1 2.092 -7.723a3.999 3.999 0 0 1 3.908 -3.151z">
                </path>
                <path d="M6.161 17.009l11.839 -.009"></path>
              </svg>
              Select Position</button>
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Position Name</label>
          <div>
            <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="John"
              :value="SafeJson(form_data,'position.name','')" name="position_name" readonly>
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Division Name</label>
          <div>
            <input class="form-control" type="text" aria-describedby="emailHelp" placeholder="Smith"
              :value="SafeJson(form_data,'division.name','')" name="last_name" readonly>
            <div class="invalid-feedback"></div>
          </div>
        </div>
        <!-- <div class="form-footer" v-if="form_data.id != null">
          <button class="btn btn-primary" type="submit" v-on:click="handleClick('SUBMIT',{},$event)">Submit</button>
        </div> -->
      </form>
    </div>
  </div>
  <SelectPositionModal ref="selectPositionModal" v-bind:onlistener="handleListener.bind($,'SELECT_POSITION_LISTENER')">
  </SelectPositionModal>
</template>