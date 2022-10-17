import BaseService from "./BaseService"
import { DivisionInterface } from "./DivisionService"
import { EmployeeInterface } from "./EmployeeService"
import { GroupInterface } from "./GroupService"
import { PositionInterface } from "./PositionService"

export interface UserGroupPositionServiceInteface {
  id?: number
  position_id?: number
  division_id?: number
  group_id?: number
  employee_id?: number
  created_at?: any
  updated_at?: any

  is_enabled?: boolean

  position?: PositionInterface
  division?: DivisionInterface
  employee?: EmployeeInterface
  group?: GroupInterface
}

export interface UserGroupPositionServiceServiceInteface extends UserGroupPositionServiceInteface {

}

const UserGroupPositionService = {
  addOrUpdate(props: UserGroupPositionServiceInteface) {
    try{
     
      return resData.data;
    }catch(ex){

    }
  },
  update(props: UserGroupPositionServiceInteface) {

  },
  gets(props: UserGroupPositionServiceServiceInteface) {

  },
  getById(id: number) {

  },
  deletes(ids: Array<number>) {

  }
}

export default UserGroupPositionService;