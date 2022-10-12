import axios from "axios";
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams";
import BaseService from "./BaseService";

export interface GroupInterface {
  id?: number
  name?: number
  is_enable?: boolean
  created_at?: any
  updated_at?: any
  deleted_at?: any
}

export interface GroupServiceInterface extends GroupInterface {

}

const GroupService = {
  async add(props: GroupInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.COMPANY + '/add',
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
  async update(props: GroupInterface) {
    try {
      let resData = await axios({
        method: "POST",
        url: BaseService.COMPANY + "/update",
        data: props,
        headers: {}
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
        url: `${BaseService.COMPANY}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async gets(props: GroupServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.COMPANY}?${query}`
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
        url: `${BaseService.COMPANY}/delete`,
        data: {
          ids
        }
      })
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async selectCompany(id: number) {
    try {
      let resData = await axios({
        method: "POST",
        url: `${BaseService.COMPANY}/select-company`,
        data: {
          id
        }
      })
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async getCurrentSetCompany() {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.COMPANY}/current-company`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  }
}

export default GroupService;