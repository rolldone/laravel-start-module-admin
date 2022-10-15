<script lang="ts">
import PortalService from 'src/services/PortalService';
import { useRoute } from 'vue-router';
import UserPortalFNewVue from './UserPortalFNew.vue';

export default {
  extends: UserPortalFNewVue,
  setup() {
    let route = useRoute();
    return {
      route
    }
  },
  methods: {
    async baseMounted() {
      if (UserPortalFNewVue.methods == null) return;
      await UserPortalFNewVue.methods.baseMounted.call(this);
      this.setPortal(await this.getPortal());
    },
    async getPortal() {
      try {
        let resData = await PortalService.getById(this.route.params.id as any);
        return resData;
      } catch (ex) {
        console.error("getPortal - ex :: ", ex);
      }
    },
    setPortal(props: any) {
      if (props == null) return;
      this.form_data = props.return;
      if (this.form_data.portals_groups == null) return;
      this.form_data.portals_groups_ids = [];
      for (let a = 0; a < this.form_data.portals_groups.length; a++) {
        this.form_data.portals_groups_ids[a] = this.form_data.portals_groups[a].gm_group_id;
      }
      console.log("this.form_data ", this.form_data);
    },
    async submit() {
      try {
        if (this.form_data.portals_groups_ids == null) return;
        this.form_data.portals_groups_ids = [...new Set(this.form_data.portals_groups_ids) as any]
        this.form_data.portals_groups_ids = this.form_data.portals_groups_ids.filter(function (el) {
          return el != null;
        });
        let resData = await PortalService.update(this.form_data);
        alert("Data update successfully.")
        resData = resData.return;
      } catch (ex) {
        console.error("submit - ex :: ", ex);
      }
    }
  }
}
</script>