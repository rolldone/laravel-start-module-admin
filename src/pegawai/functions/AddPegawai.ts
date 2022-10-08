import PegawaiService, { PegawaiInterface } from "src/services/PegawaiService";

const AddPegawai = async (props: PegawaiInterface) => {
  try {
    let resData = await PegawaiService.add(props);
    return resData;
  } catch (ex) {
    throw ex;
  }
}

export default AddPegawai;