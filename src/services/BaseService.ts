import axios from 'axios';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  NProgress.done();
  return response;
}, function (error) {
  // Do something with response error
  console.error(error)
  setTimeout(() => {
    NProgress.done();
  }, 5000);
  return Promise.reject(error);
});

const ENDPOINT = 'http://virtualbox.lan:8330/api'
export default {
  AUTH: ENDPOINT + '/auth',
}