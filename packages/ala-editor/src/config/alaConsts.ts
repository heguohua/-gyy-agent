/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 16:28:41
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-08 11:05:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/alaConsts.ts
 * @Description: 全局唯一的 常量类
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
export class alaConsts {
  private static readonly PREFIX = 'ala_';

  //  自定义常量
  public static readonly I18N_LOCAL_STORAGE_KEY_NAME = 'ala_' + 'i18n_localStorage_key_name';
  public static readonly I18N_DEFAULT = 'zh-CN' ;

  public static readonly USER_ROLE = 'ala_' + 'USER_ROLE';
  public static readonly ACCESS_TOKEN = 'ala_' + 'ACCESS_TOKEN';
  public static readonly COMPONENT_PREFIX = 'ala-';

  // 私有构造函数，防止实例化
  private constructor() { }

  // localstorage中存储用户是否登录标识的key
  public static readonly is_logined_key = 'ala_' + 'is_logined';

  // localStorage中存储token的名字、传递给后端 http header中的名字
  public static readonly token_name = 'alatk';

  // 当前正在访问的router name存储在localstorage中的key
  public static readonly current_router_name = 'ala_' + 'current_router_name';

  // localStorage中存储的当前用户相关信息
  public static readonly user_name = 'userInfo';

}
