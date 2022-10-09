<script lang="ts">
import SelectParentModal from '../../divisi/select_parent_modal/SelectParentModal.vue';
import CreateSimpleId from 'src/functions/CreateSimpleId';
import SafeJson from 'src/functions/SafeJson';
import DivisiService, { DivisionInterface } from 'src/services/DivisionService';
import { onMounted, ref } from 'vue';

let id = ref(CreateSimpleId(10));
let divisi_datas = ref<Array<DivisionInterface>>([]);

export const setDivisions = async (props: any) => {
  if (props == null) return null;
  divisi_datas.value = props.return;
}

export default {
  extends: SelectParentModal,
  setup() {
    onMounted(async () => {
      setDivisions(await DivisiService.gets({}));
    })
    return {
      id,
      divisi_datas,
      SafeJson
    }
  },
}
</script>
