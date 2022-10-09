import axios from "axios";
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams";
import BaseService from "./BaseService";


const STATUS = {
  ACTIVE: 1,
  SUSPEND: 0
}

export interface EmployeeInterface {
  id?: number
  first_name?: string
  last_name?: string
  address?: string
  phone_number?: string
  email?: string
  status?: number
  user_id?: number
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export interface EmployeeServiceInterface extends EmployeeInterface {

}

const PegawaiService = {
  STATUS,
  async add(props: EmployeeInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PEGAWAI + '/add',
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
  async update(props: EmployeeInterface) {
    try {
      let resData = await axios({
        method: "POST",
        url: BaseService.PEGAWAI + "/update",
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
        url: `${BaseService.PEGAWAI}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async gets(props: EmployeeServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PEGAWAI}?${query}`
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
        url: `${BaseService.PEGAWAI}/delete`,
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

export default PegawaiService;