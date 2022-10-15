<script lang="ts">
import GroupFNewVue from './GroupFNew.vue';
import PrivilegeService, { PrivilegeInterface } from "src/services/PrivilegeService";
import { useRoute } from 'vue-router';

export default {
  extends: GroupFNewVue,
  setup() {
    let router = useRoute();
    return {
      PrivilegeService,
      router
    }
  },
  methods: {
    async baseMounted() {
      this.setPrivilege(await this.getPrivilege());
    },
    async getPrivilege() {
      let resData = await PrivilegeService.getById(this.router.params.id as any);
      return resData;
    },
    setPrivilege(props: any) {
      if (props == null) return;
      this.form_data = props.return;
    },
    async submit() {
      try {
        let resData = await PrivilegeService.update(this.form_data);
        debugger;
      } catch (ex) {
        console.error("submit - ex :: ", ex);
      }
    }
  }
}
</script>