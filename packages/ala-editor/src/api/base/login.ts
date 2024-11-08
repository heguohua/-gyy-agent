/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-08 14:38:10
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-08 17:27:54
 * @FilePath: /1-low-coding/packages/ala-editor/src/api/base/login.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { logger } from '@/utils/logger';
import notify from '@/utils/notify';
import { get, post } from '@/utils/req';
const profile = import.meta.env.VITE_PROFILE

export const api = {
    login: profile + '/login',
};

//登录
export const login = (params: any) => {

    return post(api.login, params).then((res: any) => {

        const data = res.data
        if (data.code === 2000) {
            notify.error("温馨提示：", data.msg)
        }

        return Promise.resolve(res);
    });
};

