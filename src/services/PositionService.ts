import axios from "axios"
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams"
import BaseService from "./BaseService"

export interface PositionInterface {
  id?: number
  name?: string
  is_enable?: boolean
  division_id?: number
  division?: any
  created_at?: any
  updated_at?: any
  deleted_at?: any
}

export interface PositionServiceInterface extends PositionInterface {

}

const PositionService = {
  async add(props: PositionInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.POSITION + '/add',
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
  async update(props: PositionInterface) {
    try {
      let resData = await axios({
        method: "POST",
        url: BaseService.POSITION + "/update",
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
        url: `${BaseService.POSITION}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async gets(props: PositionServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.POSITION}?${query}`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async deleteByIds(ids: Array<number>) {
    try {
      let resData = await axios({
        method: "POST",
        url: `${BaseService.POSITION}/delete`,
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

export default PositionService;