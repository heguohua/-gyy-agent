/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-13 20:59:28
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-10 21:34:21
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
      logger.error("失败，失败，失败！！！！！！URL如下：", error.config?.url);
      console.log('error:', error);

      // 关闭滚动条
      if (error.config?.headers?.sp) {
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
            window.location.href = '/'

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

    let alatb = undefined
    if (url.indexOf('/dynamic') > 0) {
      if (params.tableName) {
        alatb = params.tableName
      } else {
        notify.error('温馨提示：', '错误：请求参数中没有发现tableName属性！')
      }
    }

    axiosInstance({
      url: url,
      method: 'get',
      params: params,
      headers: {
        alatb,
      }
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
export function post(url: string, params = {}, timeout = 20000) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'post',
      timeout,
      data: params,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function alaDownload(url: string, params = {}) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: 'post',
      data: params,
      responseType: 'blob', // 👈 关键，确保响应为 Blob（二进制）
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })

    // axiosInstance({
    //   url: url,
    //   method: 'post',
    //   data: params,
    // })
    //   .then((response) => {
    //     resolve(response);
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  });
  // axiosInstance({
  //   url: url,
  //   method: 'post',
  //   data: params,
  //   responseType: 'blob', // 👈 关键，确保响应为 Blob（二进制）
  //   timeout: 10000,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // })
  //   .then((response) => {
  //     resolve(response);
  //   })
  //   .catch((error) => {
  //     reject(error);
  //   })

  // })
}

/*
 *  post请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function alaPost(url: string, params: { [key: string]: any } = {}, showProgress = false, method?: string, timeout = 20000) {
  return new Promise((resolve, reject) => {

    let alatb = undefined
    if (url.indexOf('/dynamic') > 0) {
      if (params.tableName) {
        alatb = params.tableName
      } else if (params.body?.tableName) {
        alatb = params.body.tableName
      } else {
        notify.error('温馨提示：', '错误：请求参数中没有发现tableName属性！')
      }
    }

    axiosInstance({
      url: url,
      method: method ? method : 'post',
      timeout,
      data: params,
      headers: {
        sp: showProgress,
        'Content-Type': 'application/json',
        alatb,
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

export function alaUpload(url: string, params = {}, showProgress = false, method?: string) {
  return new Promise((resolve, reject) => {

    axiosInstance({
      url: url,
      method: method ? method : 'post',
      data: params,
      timeout: 200 * 1000, // 200 秒
      headers: {
        sp: showProgress
      }
    })
      .then((response) => {
        const data = response.data
        if (data.code != 200) {
          logger.error("服务器返回错误信息", data);
          notify.error("温馨提示：", data.msg)
          reject(data);
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
export function alaDelete(url: string, params: { [key: string]: any } = {}, showProgress = false) {
  return new Promise((resolve, reject) => {

    let alatb = undefined
    if (url.indexOf('/dynamic') > 0) {
      if (params.tableName) {
        alatb = params.tableName
      } else {
        notify.error('温馨提示：', '错误：请求参数中没有发现tableName属性！')
      }
    }

    axiosInstance({
      url: url,
      method: 'DELETE',
      headers: {
        sp: showProgress,
        alatb
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
export function alaPage(url: string, page: { [key: string]: any } = {}, params: { [key: string]: any } = {}, showProgress = false) {
  return new Promise((resolve, reject) => {


    let alatb = undefined
    if (url.indexOf('/dynamic') > 0) {
      if (params.tableName) {
        alatb = params.tableName
      } else {
        notify.error('温馨提示：', '错误：请求参数中没有发现tableName属性！')
      }
    }


    axiosInstance({
      url: url,
      method: 'post',
      data: { page, body: params },
      headers: {
        sp: showProgress,
        alatb
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


interface Result {
  tableName: string,
  conditionGroups: Array<any>,
  tableInfos: Array<any>,
  joinRightColumn?: string,
}

export const beforeQuery = (params: any, className: string, formConfigItems: { [key: string]: any }) => {

  const result: Result = { tableName: className, conditionGroups: [], tableInfos: [] }
  const conditionGroups = result.conditionGroups

  const conditionGroup: { [key: string]: any } = {
    logicalOperator: 'and',
    conditions: []
  }

  conditionGroups.push(conditionGroup)

  Object.keys(params).forEach((key: string) => {
    if (key != 'tableName' && params[key]) {
      // 转换字段查询条件为动态分页列表形式
      const formConfigItem = formConfigItems[key]
      if (!formConfigItem) return

      const code = formConfigItem.code
      const fieldName = formConfigItem.formData.fieldName.desktop
      if (code === 'input') {
        conditionGroup.conditions.push({ column: 'a_' + key, operator: 'like', value: params[key], logicalOperator: 'and' })
      } else if (code === 'date') {
        // 开始时间戳
        conditionGroup.conditions.push({ column: 'a_' + key, operator: '>=', value: params[key][fieldName + '_start'], logicalOperator: 'and' })

        // 结束时间戳 + 1 天
        conditionGroup.conditions.push({ column: 'a_' + key, operator: '<', value: params[key][fieldName + '_end'] + 86400000, logicalOperator: 'and' })

      } else if (code === 'selectTable') {

        const tableName = className

        let tableInfos = result['tableInfos']
        if (!tableInfos) {
          tableInfos = []
          result['tableInfos'] = tableInfos
        }


        if (tableInfos.length === 0) {

          // 使用主表id 作为 联表关联左侧条件
          if (!result['joinRightColumn']) {
            result['joinRightColumn'] = 'id'
          }

          const url = formConfigItem.formData.linkUrl.desktop //"http://f-ala-lowcoding/dynamic/list";
          const parts = url.split("/");
          const innerColumnName = parts[parts.length - 2];

          const fullRelationTableName = `a_${tableName}_${fieldName}`
          const tableInfo = {
            tableName: fullRelationTableName,
            joinType: 'innerJoin',
            joinLeftColumn: `a_${tableName}_id`,
            conditionGroupVos: [
              {
                logicalOperator: 'and',
                conditions: [
                  {
                    tableName: fullRelationTableName,
                    column: `a_${innerColumnName}_list`,
                    logicalOperator: 'and',
                    operator: '=',
                    value: params[key][0].id
                  }
                ]
              }
            ]
          }

          tableInfos.push(tableInfo)

        } else {


          // 使用上一个联表中的主表字段 作为 联表关联左侧的连接条件
          const leftTable = tableInfos[tableInfos.length - 1]

          if (!leftTable['joinRightColumn']) {
            leftTable['joinRightColumn'] = leftTable.joinLeftColumn
          }

          const url = formConfigItem.formData.linkUrl.desktop //"http://f-ala-lowcoding/dynamic/list";
          const parts = url.split("/");
          const innerColumnName = parts[parts.length - 2];

          const fullRelationTableName = `a_${tableName}_${fieldName}`
          const tableInfo = {
            tableName: fullRelationTableName,
            joinType: 'innerJoin',
            joinLeftColumn: `a_${tableName}_id`,
            conditionGroupVos: [
              {
                logicalOperator: 'and',
                conditions: [
                  {
                    tableName: fullRelationTableName,
                    column: `a_${innerColumnName}_list`,
                    logicalOperator: 'and',
                    operator: '=',
                    value: params[key][0].id
                  }
                ]
              }
            ]
          }

          tableInfos.push(tableInfo)

        }



      } else if (code === 'selectDict') {

        const tableName = className

        let tableInfos = result['tableInfos']
        if (!tableInfos) {
          tableInfos = []
          result['tableInfos'] = tableInfos
        }

        if (tableInfos.length === 0) {

          // 使用主表id 作为 联表关联左侧条件
          if (!result['joinRightColumn']) {
            result['joinRightColumn'] = 'id'
          }

          const url = formConfigItem.formData.linkUrl.desktop //"http://f-ala-lowcoding/dynamic/list";
          const parts = url.split("/");
          const innerColumnName = parts[parts.length - 2];

          const fullRelationTableName = `a_${tableName}_${fieldName}`
          const tableInfo = {
            tableName: fullRelationTableName,
            joinType: 'innerJoin',
            joinLeftColumn: `a_${tableName}_id`,
            conditionGroupVos: [
              {
                logicalOperator: 'and',
                conditions: [
                  {
                    tableName: fullRelationTableName,
                    column: `a_${innerColumnName}_list`,
                    logicalOperator: 'and',
                    operator: '=',
                    value: u.parseJson(params[key])[0].id
                  }
                ]
              }
            ]
          }

          tableInfos.push(tableInfo)

        } else {


          // 使用上一个联表中的主表字段 作为 联表关联左侧的连接条件
          const leftTable = tableInfos[tableInfos.length - 1]

          if (!leftTable['joinRightColumn']) {
            leftTable['joinRightColumn'] = leftTable.joinLeftColumn
          }

          const url = formConfigItem.formData.linkUrl.desktop //"http://f-ala-lowcoding/dynamic/list";
          const parts = url.split("/");
          const innerColumnName = parts[parts.length - 2];

          const fullRelationTableName = `a_${tableName}_${fieldName}`
          const tableInfo = {
            tableName: fullRelationTableName,
            joinType: 'innerJoin',
            joinLeftColumn: `a_${tableName}_id`,
            conditionGroupVos: [
              {
                logicalOperator: 'and',
                conditions: [
                  {
                    tableName: fullRelationTableName,
                    column: `a_${innerColumnName}_list`,
                    logicalOperator: 'and',
                    operator: '=',
                    value: params[key][0].id
                  }
                ]
              }
            ]
          }

          tableInfos.push(tableInfo)

        }


      } else if (code === 'radio') {
        conditionGroup.conditions.push({ column: 'a_' + key, operator: '=', value: params[key], logicalOperator: 'and' })
      } else if (code === 'cascaderDict') {
        if (params[key] && params[key].length > 2) {
          conditionGroup.conditions.push({ column: 'a_' + key, operator: '=', value: params[key], logicalOperator: 'and' })
        }
      } else if (code === 'textarea') {
        conditionGroup.conditions.push({ column: 'a_' + key, operator: 'like', value: params[key], logicalOperator: 'and' })
      }
    }
  })


  return result
}


// 对外暴露请求方法
export default {
  get,
  post,
  beforeQuery,
};
