import axios from "axios"
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams"
import BaseService from "./BaseService"
import { PositionInterface, PositionServiceInterface } from "./PositionService"

export interface PrivilegeInterface {
  id?: number
  name?: string
  description?: string
  is_enabled?: boolean
  type?: string
  created_at?: any
  updated_at?: any
}

export interface PrivilegeServiceInterface extends PrivilegeInterface {

}

const TYPE = {
  GROUP: "group",
  USER: "user"
}

const PrivilegeService = {
  TYPE,
  async add(props: PrivilegeInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PRIVILEGE + '/add',
        data: props,
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async update(props: PrivilegeInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PRIVILEGE + '/update',
        data: props,
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async gets(props: PrivilegeServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PRIVILEGE}/privileges?${query}`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async getById(id: number) {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PRIVILEGE}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async deletes(ids: Array<number>) {
    try {
      let resData = await axios({
        method: "POST",
        url: `${BaseService.PRIVILEGE}/delete`,
        data: {
          ids
        }
      })
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  position: {
    async getsByPrivilegeId(pv_privilege_id: number, props: PositionServiceInterface) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PRIVILEGE}/position/positions/privilege/${pv_privilege_id}/privilege-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getPositionsByWithoutPrivilegeId(pv_privilege_id: number, props: PositionServiceInterface) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PRIVILEGE}/position/positions/without-privilege/${pv_privilege_id}/privilege-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async join(position_id: number, pv_privilege_id: number) {
      try {
        let resData = await axios({
          method: "POST",
          url: `${BaseService.PRIVILEGE}/position/join`,
          data: {
            position_id,
            pv_privilege_id
          }
        })
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    }
  },
  user: {
    async getsByPrivilegeId(pv_privilege_id: number, props: PositionServiceInterface) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PRIVILEGE}/user/users/privilege/${pv_privilege_id}/privilege-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getsUsersByWithoutPrivilegeId(pv_privilege_id: number, props: PositionServiceInterface) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PRIVILEGE}/user/users/without-privilege/${pv_privilege_id}/privilege-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async join(user_id: number, pv_privilege_id: number) {
      try {
        let resData = await axios({
          method: "POST",
          url: `${BaseService.PRIVILEGE}/user/join`,
          data: {
            user_id,
            pv_privilege_id
          }
        })
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    }
  }
}

export default PrivilegeService;