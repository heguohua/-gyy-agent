/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-13 20:59:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-10 10:20:03
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/req.ts
 * @Description: axios 使用工具类
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// utils/request.ts

import axios from 'axios';
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { alaConsts } from '@/config/alaConsts';

//创建一个axios实例
const axiosInstance = axios.create({
  timeout: 20000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // 请求地址携带时间戳
    const _t = new Date().getTime();
    config.url += `?ts=${_t}`;

    // 请求头携带token
    config.headers[alaConsts.token_name] = localStorage.getItem(alaConsts.token_name) || '';

    // 在发送请求之前做些什么
    //console.log('我要准备请求啦------');
    //console.log('请求配置', config);

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    //console.log('接收到响应数据------');
    //console.log('响应数据', response);
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    logger.error("失败，失败，失败！！！！！！ 无权限URL如下：", error.config.url);
    console.log('error:', error);

    const response = error.response;
    // 对响应错误做点什么
    if (error && response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未登录，请重新登录';
          notify.error("温馨提示：", "请先登录系统。")
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
          error.message = '服务器端出错';
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
      error.message = '连接到服务器失败';
    }
    //console.log('网络错误信息：', error.message);

    return Promise.reject(error);
  },
);

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
export function alaPost(url: string, params = {}) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'post',
      data: params,
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
