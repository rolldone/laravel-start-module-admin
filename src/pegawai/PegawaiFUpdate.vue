<script lang="ts">
import PegawaiService, { EmployeeInterface } from 'src/services/EmployeeService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PegawaiFNewVue from './PegawaiFNew.vue';

let form_data = ref<EmployeeInterface>({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  address: ""
});

const setPegawai = (props: any) => {
  if (props == null) return null;
  form_data.value = props.return;
}

export default {
  extends: PegawaiFNewVue,
  setup() {
    const route = useRoute();
    onMounted(async () => {
      setPegawai(await PegawaiService.getById(route.params.id as any));
    })
    return {
      form_data
    }
  },
  methods: {
    async handleClick(action: string, props: any, e: any) {
      switch (action) {
        case 'SUBMIT':
          e.preventDefault();
          try {
            await PegawaiService.update(form_data.value);
            alert("Data is updated");
          } catch (ex) {
            console.error("submit - ex :: ", ex);
          }
          break;
      }
    }
  }
}
</script>
