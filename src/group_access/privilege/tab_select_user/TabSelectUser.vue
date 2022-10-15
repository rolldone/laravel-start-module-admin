<script lang="ts">

import SelectUserModal from 'src/components/select_user_modal/SelectUserModal';
import PrivilegeService from 'src/services/PrivilegeService';
import { useRoute } from 'vue-router';
import TabSelectUserPortal from '../../portal/tab_select_user/TabSelectUser';

export default {
  setup() {
    let router = useRoute();
    return {
      router
    }
  },
  data() {
    return {
      title: {
        description: "You can add user to join this privilege"
      }
    }
  },
  extends: TabSelectUserPortal,
  methods: {
    async getUsers() {
      try {
        let resData = await PrivilegeService.user.getsByPrivilegeId(this.router.params.id as any, {});
        return resData;
      } catch (ex) {
        console.error("getUsers - ex :: ", ex);
      }
    },
    handleClick(action: string, props: any, e: any) {
      let self = this;
      switch (action) {
        case 'SHOW_USER_MODAL':
          e.preventDefault();
          let selectUserModal = this.$refs.selectUserModalRef as InstanceType<typeof SelectUserModal>;
          // Inject this function
          selectUserModal.getUsers = async function (this: InstanceType<typeof SelectUserModal>) {
            try {
              let users = await PrivilegeService.user.getsUsersByWithoutPrivilegeId(self.router.params.id as any, {
                search: this.search_text
              });
              return users;
            } catch (ex) {
              console.error("getUsers - ex :: ", ex);
            }
          }.bind(selectUserModal)
          selectUserModal.show({});
          return;
      }
      if (TabSelectUserPortal.methods == null) return;
      TabSelectUserPortal.methods.handleClick.call(this, action, props, e);
    },
    async submitData(user_id: number) {
      try {
        let resData = await PrivilegeService.user.join(user_id, this.router.params.id as any);
        this.baseMounted();
      } catch (ex) {
        console.error("submitData - ex :: ", ex);
      }
    }
  }
}
</script>
