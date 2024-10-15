/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-13 21:28:58
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 11:23:50
 * @FilePath: /low-coding/packages/ala-editor/src/api/user.ts
 * @Description: 用户登录模拟api接口
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { get, post } from '@/utils/req';

const api = {
  login: '/api/user/login',
  users: '/api/user/info',
};

//登录
export const login = (params: any) => {
  return post(api.login, params).then((res: any) => {
    if (res.code === 200) {
      localStorage.setItem('token', res.data.token);
    }
    return Promise.resolve(res);
  });
};

//获取用户信息
export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('用户未登录'));
  return get(api.users);
};
