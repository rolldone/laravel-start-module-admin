import axios from "axios";
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams";
import BaseService, { BaseQueryInterface } from "./BaseService";

export interface UserInterface {
  id?: number
  name?: string
  email?: string
  password?: string
  created_at?: any
  updated_at?: any
  is_root?: boolean
  // Relation
  pv_privilege_id?: number
  pg_portal_id?: number
}

export interface UserServiceInterface extends UserInterface, BaseQueryInterface { }

const UserService = {
  add(props: UserInterface) {
    try {

    } catch (ex) {
      throw ex;
    }
  },
  update(props: UserInterface) {

  },
  async gets(props: UserServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.USER_ADMIN}/users?${query}`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  getById(id: number) {

  }
}

export default UserService;