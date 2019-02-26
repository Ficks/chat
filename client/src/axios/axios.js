import Vue from 'vue';
import Axios from 'axios';
import config from '@/config/config.js';
import store from '../store/store.js'; //状态管理
import Toast from 'muse-ui-toast';
Toast.config({
  position: 'top'
})

// 封装Axios
export default params => {
  params.method = params.type || 'post';
  params.data = params.data || {};

  if (params.type == 'get') params.params = params.data;

  return new Promise((resolve, reject) => {
    //创建Axios实例，把基本的配置放进去
    const instance = Axios.create({
      timeout: 10 * 1000,
      withCredentials: true,
      //定义请求根目录
      baseURL: config.baseUrl,
    });

    // params.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    instance(params).then(res => {
      //请求成功后执行的函数
      if (res.data.status == 1) {
        if (params.tips) {
          Toast.success(res.data.msg)
        }
        resolve(res.data.data, res);
      } else {
        Toast.error(res.data.msg)
        reject(res.data);
      }
      console.log(res.data);
    }).catch(err => {
      // 请求失败
      Toast.error("服务器开小差了")
      reject(err);
    })
  });
};
