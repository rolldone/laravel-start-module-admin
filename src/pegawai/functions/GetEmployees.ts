import PegawaiService from "src/services/PegawaiService";

const GetEmployees = async () => {
  try{
    let resDatas = await PegawaiService.gets({});
    return resDatas;
  }catch(ex){
    throw ex;
  }
}

export default GetEmployees;