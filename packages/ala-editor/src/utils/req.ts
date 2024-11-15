/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-13 20:59:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-15 22:36:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/req.ts
 * @Description: axios 使用工具类
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// utils/request.ts

import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaConsts } from '@/config/alaConsts';
import lstore from '@/utils/lstore';
import { App } from 'vue';
import { AxiosInstance } from 'axios';

import axios from 'axios';
import u from '@/utils/u';
import { date } from '@/utils/date';


// 扩展 AxiosRequestConfig 接口，添加自定义参数

let axiosInstance: AxiosInstance;
let vApp: App;

export function configAxios(app: App<Element>) {
  vApp = app

  // 创建 axios 实例
  axiosInstance = axios.create({
    timeout: 20000,
  });

  // 添加请求拦截器
  axiosInstance.interceptors.request.use(
    function (config) {


      // 显示滚动条
      if (config.headers.sp) {
        app.config.globalProperties.$loadingBar.exposed.show()
      }

      // 请求地址携带时间戳
      const _t = new Date().getTime();
      config.url += `?ts=${_t}`;
      if (config.data) {
        // 说明是post请求
        const head = {
          trace: u.uuid(),
          time: date.now(),
          // sid:"",
          sign: "sign",
        }
        config.data['head'] = head
      }


      // 请求头携带token
      config.headers[alaConsts.token_name] = localStorage.getItem(alaConsts.token_name) || '';

      return config;
    },
    function (error) {
      // 对请求错误做些什么
      // 关闭滚动条
      if (error.config.headers.sp) {
        app.config.globalProperties.$loadingBar.exposed.hide()
      }
      return Promise.reject(error);
    },
  );

  // 添加响应拦截器
  axiosInstance.interceptors.response.use(
    function (response) {
      // 关闭滚动条
      if (response.config.headers.sp) {
        app.config.globalProperties.$loadingBar.exposed.hide()
      }

      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    function (error) {
      logger.error("失败，失败，失败！！！！！！URL如下：", error.config.url);
      console.log('error:', error);

      // 关闭滚动条
      if (error.config.headers.sp) {
        app.config.globalProperties.$loadingBar.exposed.hide()
      }

      const response = error.response;
      // 对响应错误做点什么
      if (error && response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求';
            break;
          case 401:
            error.message = '未登录，请重新登录';
            // 删除本地 localStorage中的token
            lstore.removeItem(alaConsts.is_logined_key)
            notify.error("温馨提示：", "请先登录系统。")
            window.location.href = '/login'

            break;
          case 403:
            error.message = '无权限，请联系管理员。';
            notify.error("温馨提示：", "无权限，请联系管理员。")
            break;
          case 404:
            error.message = '请求错误,未找到该资源';
            break;
          case 405:
            error.message = '请求方法未允许';
            break;
          case 408:
            error.message = '请求超时';
            break;
          case 500:
            error.message = '服务器端连接出错';
            notify.error("温馨提示：", error.message)
            break;
          case 501:
            error.message = '网络未实现';
            break;
          case 502:
            error.message = '网络错误';
            break;
          case 503:
            error.message = '服务不可用';
            break;
          case 504:
            error.message = '网络超时';
            break;
          case 505:
            error.message = 'http版本不支持该请求';
            break;
          default:
            error.message = `未知错误${error.response.status}`;
        }
      } else {
        error.message = '服务器连接失败';
        notify.error("温馨提示：", error.message)
      }
      //console.log('网络错误信息：', error.message);

      return Promise.reject(error);
    },
  );
}


/*
 *  get请求:从服务器端获取数据
 *  url:请求地址
 *  params:参数
 * */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: url,
      method: 'get',
      params: params,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
 *  post请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function post(url: string, params = {}) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
 *  post请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function alaPost(url: string, params = {}, showProgress = false) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'post',
      data: params,
      headers: {
        sp: showProgress
      }
    })
      .then((response) => {
        const data = response.data
        if (data.code != 200) {
          logger.error("服务器返回错误信息", data);
          notify.error("温馨提示：", data.msg)
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
 *  delete 请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function alaDelete(url: string, params = {}, showProgress = false) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'DELETE',
      headers: {
        sp: showProgress
      },
      params
    })
      .then((response) => {
        const data = response.data
        if (data.code != 200) {
          logger.error("服务器返回错误信息", data);
          notify.error("温馨提示：", data.msg)
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
 *  post请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function alaPage(url: string, page = {}, params = {}, showProgress = false) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'post',
      data: { page, body: params },
      headers: {
        sp: showProgress
      }
    })
      .then((response) => {
        const data = response.data
        if (data.code != 200) {
          logger.error("服务器返回错误信息", data);
          notify.error("温馨提示：", data.msg)
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// 对外暴露请求方法
export default {
  get,
  post,
};
