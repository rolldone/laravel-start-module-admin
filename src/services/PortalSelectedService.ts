import axios from "axios";
import BaseService from "./BaseService";

export interface PortalSelectedInterface {
  id?: number
  user_id?: number
  pg_portal_id?: number
  pg_portal_group_id?: number
  created_at?: any
  updated_at?: any
}

export interface PortalSelectedServiceInterface extends PortalSelectedInterface {

}

const PortalSelectedService = {
  async joinGroup(pg_portal_id: number, pg_portal_group_id: number) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PORTAL_SELECTED + '/add',
        data: {
          pg_portal_group_id,
          pg_portal_id
        },
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async update(props: PortalSelectedInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PORTAL_SELECTED + '/update',
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
  async getCurrent() {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL_SELECTED}/current`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async deleteCurrent() {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL_SELECTED}/current/delete`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  }
}

export default PortalSelectedService;