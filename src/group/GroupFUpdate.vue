<script lang="ts">
import GroupService from 'src/services/GroupService';
import { useRoute } from 'vue-router';
import GroupFNewVue from './GroupFNew.vue';

export default {
  extends: GroupFNewVue,
  async mounted() {
    this.setGroup(await this.getGroup());
  },
  methods: {
    async getGroup() {
      try {
        let route = useRoute();
        let resData = await GroupService.getById(route.params.id as any);
        return resData;
      } catch (ex) {
        console.error("getGroup - ex :: ", ex);
      }
    },
    async setGroup(props: any) {
      if (props == null) return;
      this.form_data = props.return;
    },
    async submitData() {
      try {
        let resData = await GroupService.update(this.form_data);
        alert("Update Group is success");
      } catch (ex) {
        console.error("submitData - ex :: ", ex);
      }
    }
  }
}
</script>