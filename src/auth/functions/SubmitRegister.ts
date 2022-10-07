import AuthService, { AuthInterface } from "src/services/AuthService";

const SubmitRegister = async (props: AuthInterface) => {
  try {
    let resData = await AuthService.register(props);
    return resData;
  } catch (ex) {
    throw ex;
  }
}

export default SubmitRegister