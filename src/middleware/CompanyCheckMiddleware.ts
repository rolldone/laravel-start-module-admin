import PortalSelectedService from "src/services/PortalSelectedService";

export default async function (to: any, from: any, done: Function, nextMiddleware: Function) {
  let auth = window.sessionStorage.getItem("auth");
  let resData = await PortalSelectedService.getCurrent();
  resData = resData.return;
  if(resData == null){
    return window.location.replace("/admin/portal/selected")
  }
  nextMiddleware();
}