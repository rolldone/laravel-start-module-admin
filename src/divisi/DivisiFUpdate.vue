<script lang="ts">
import DivisiService, { DivisionInterface } from 'src/services/DivisionService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DivisiFNewVue from './DivisiFNew.vue';
import SelectParentModalVue from './select_parent_modal/SelectParentModal.vue';

let form_data = ref<DivisionInterface>({});
let select_divisi = ref<DivisionInterface>({});
let modalParentDialog = ref<InstanceType<typeof SelectParentModalVue>>();

const setDivision = async (props: any) => {
  if (props == null) return;
  let resData = props.return;
  form_data.value = resData;
  select_divisi.value = resData.parent_division || {};
}

export default {
  extends: DivisiFNewVue,
  setup() {
    let router = useRoute();
    onMounted(async () => {
      setDivision(await DivisiService.getById(router.params.id as any));
    });
    return {
      form_data,
      select_divisi,
      modalParentDialog
    }
  },
  methods: {
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          try {
            await DivisiService.update(this.form_data);
            alert("Divisi is updated");
          } catch (ex) {
            console.error("submit - ex :: ", ex);
          }
          return;
      }
      if (DivisiFNewVue.methods == null) return;
      DivisiFNewVue.methods.handleClick.call(this, action, props, e);
    }
  }
}
</script>