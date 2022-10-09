import PegawaiService, { EmployeeInterface } from "src/services/EmployeeService";

const AddPegawai = async (props: EmployeeInterface) => {
  try {
    let resData = await PegawaiService.add(props);
    return resData;
  } catch (ex) {
    throw ex;
  }
}

export default AddPegawai;