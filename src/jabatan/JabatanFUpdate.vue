<script lang="ts">
import PositionService from 'src/services/PositionService';
import { useRoute } from 'vue-router';
import JabatanFNewVue from './JabatanFNew.vue';

export default {
  extends: JabatanFNewVue,
  async mounted() {
    let router = useRoute();
    this.setPosition(await PositionService.getById(router.params.id as any));
  },
  methods: {
    async setPosition(props: any) {
      if (props == null) return;
      this.form_data = props.return;
      this.select_divisi = this.form_data.division;
    },
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          try {
            await PositionService.update(this.form_data);
            alert("Update jabatan is success");
          } catch (ex) {
            console.error("submit - ex :: ", ex);
          }
          return;
      }
      if (JabatanFNewVue.methods == null) return;
      JabatanFNewVue.methods.handleClick.call(this, action, props, e);
    },
  }
}
</script>