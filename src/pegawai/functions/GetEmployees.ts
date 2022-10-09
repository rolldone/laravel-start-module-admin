import PegawaiService from "src/services/EmployeeService";

const GetEmployees = async () => {
  try{
    let resDatas = await PegawaiService.gets({});
    return resDatas;
  }catch(ex){
    throw ex;
  }
}

export default GetEmployees;