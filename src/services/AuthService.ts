import axios from "axios"
import BaseService from "./BaseService"

export interface AuthInterface {
  name?: string
  email: string
  password?: string
  password_confirm?: string
}

export interface AuthServiceInterface extends AuthInterface {

}

export interface LoginType {
  email: string
  password: string
}

const AuthService = {
  async getAuth() {
    try {
      let resData = await axios.get(BaseService.AUTH + '/get', {});
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async login(props: LoginType) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.AUTH + '/login',
        data: props,
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      })
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async register(props: AuthInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.AUTH + '/register',
        data: props,
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      })
      alert("Register success");
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },

}

export default AuthService;