import axios from "axios"
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams"
import BaseService from "./BaseService"

export interface DivisionInterface {
  id?: number
  name?: string
  is_enable?: boolean
  parent_id?: number
  parent_division?: typeof self
  divisions?: Array<typeof self>
  created_at?: any
  updated_at?: any
  deleted_at?: any
}

export interface DivisionServiceInterface extends DivisionInterface {

}

const DivisiService = {
  async add(props: DivisionInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.DIVISI + '/add',
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
  async update(props: DivisionInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.DIVISI + '/update',
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
        url: `${BaseService.DIVISI}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async gets(props: DivisionServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.DIVISI}?${query}`
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
        url: `${BaseService.DIVISI}/delete`,
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

export default DivisiService;