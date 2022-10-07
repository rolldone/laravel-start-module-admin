import AuthService from "src/services/AuthService";

const SubmitLogin = async (email: string, password: string) => {
  try {
    let resData = await AuthService.login({
      email: email,
      password: password
    });
    return resData;
  } catch (ex) {
    throw ex;
  }
}

export default SubmitLogin