export default function (to: any, from: any, done: Function, nextMiddleware: Function) {
  let auth = window.sessionStorage.getItem("auth");
  console.log(auth);
  nextMiddleware();
}