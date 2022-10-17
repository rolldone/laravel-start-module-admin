import axios from "axios";
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams";
import BaseService from "./BaseService";
import { EmployeeInterface, EmployeeServiceInterface } from "./EmployeeService";
import { UserGroupPositionServiceInteface } from './UserGroupPositionService';

export default {
  employee: {
    async getsEmployeeByCurrentGroupAndFree(props: EmployeeServiceInterface) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.DASHBOARD}/employee/employees/with-group-and-free?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getUPG_ByEmployeeId_CurrentGroup(employee_id: number) {
      try {
        let resData = await axios({
          method: "GET",
          url: `${BaseService.DASHBOARD}/employee/upg/group/current/${employee_id}/employee/view`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getUPG_ById(id: number) {
      try {
        let resData = await axios({
          method: "GET",
          url: `${BaseService.DASHBOARD}/employee/upg/${id}/view`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getsUPG_ByCurrentGroup(props: EmployeeServiceInterface) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.DASHBOARD}/employee/upg/upg-s/group/current?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async addUPGByCurrentGRoup(props: UserGroupPositionServiceInteface) {
      try {
        let resData = await axios({
          method: "post",
          url: BaseService.DASHBOARD + '/employee/upg/current/group/add',
          data: props,
          headers: {
            // 'Content-Type': `multipart/form-data;`,
          }
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    }
  }
}