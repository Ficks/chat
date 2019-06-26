import Vue from "vue";
import Axios from "axios";
import config from "@/config/config.js";
import store from "../store/store.js"; //状态管理
import Toast from "muse-ui-toast";
import router from "../router";

Toast.config({
  position: "top"
});

// 请求拦截

// 封装Axios
export default params => {
  params.method = params.type || "post";
  params.data = params.data || {};

  if (params.type == "get") params.params = params.data;

  return new Promise((resolve, reject) => {
    //创建Axios实例，把基本的配置放进去
    const instance = Axios.create({
      timeout: 10 * 1000,
      withCredentials: true,
      //定义请求根目录
      baseURL: config.baseUrl
    });

    instance.interceptors.request.use(
      config => {
        let token = sessionStorage.token;
        console.log(token);
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
      }
    );

    // params.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    instance(params)
      .then(res => {
        //请求成功后执行的函数
        if (res.data.status == 1) {
          if (params.tips) {
            Toast.success(res.data.msg);
          }
          resolve(res.data.data, res);
        } else {
          Toast.error(res.data.msg);
          if (res.data.status == 10000) {
            router.push("/login");
            return;
          }
          reject(res.data);
        }
      })
      .catch(err => {
        // 请求失败
        Toast.error("服务器开小差了");
        reject(err);
      });
  });
};
