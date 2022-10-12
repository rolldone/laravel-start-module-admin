import axios from "axios"
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams"
import BaseService from "./BaseService"

export interface PortalInterface {
  id?: number
  gm_rel_id?: number
  gm_table_name?: string
  group_id?: number
  is_enable?: boolean
  position_id?: number
  division_id?: number
}

export interface UserPortalServiceInterface extends PortalInterface {

}

const PortalService = {
  async add(props: PortalInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PORTAL + '/add',
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
  async update(props: PortalInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PORTAL + '/update',
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
  async getById(id: number) {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async getsByGMTableName(groupType: string) {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL}/portals/${groupType}`
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
        url: `${BaseService.PORTAL}/deletes`,
        data: {
          ids
        }
      })
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  }
}

export default PortalService;