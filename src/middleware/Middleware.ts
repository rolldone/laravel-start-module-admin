import defineRecursiveMiddleware from './DefineRecursiveMiddleware';
export default async function (middlewares: Array<any>, to: any, the_from: any, next: Function) {
  var startIndex = 0;
  let theNewMiddleware = await defineRecursiveMiddleware(startIndex, to, the_from, next, middlewares);
  if (theNewMiddleware != null) {
    return theNewMiddleware();
  }
  if (next != null) {
    return next();
  }
}