import axios from "axios";
import BaseService from "./BaseService";

export interface UserPortalSelectedInterface {

}

export interface UserPortalSelectedServiceInterface extends UserPortalSelectedInterface {

}

const PortalSelectedService = {
  async add(props: UserPortalSelectedInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PORTAL_SELECTED + '/add',
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
  async update(props: UserPortalSelectedInterface) {
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
  async getCurrent(id: number) {
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