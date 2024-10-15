/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 16:28:41
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 11:21:59
 * @FilePath: /low-coding/packages/ala-editor/src/config/alaConsts.ts
 * @Description: 全局唯一的 常量类
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export class alaConsts {
  private static readonly PREFIX = 'ala_';

  //  自定义常量
  public static readonly I18N_LOCALSTORAGE_KEY_NAME = alaConsts.PREFIX + 'i18n_localstorage_key_name';

  public static readonly USER_ROLE = alaConsts.PREFIX + 'USER_ROLE';
  public static readonly ACCESS_TOKEN = alaConsts.PREFIX + 'ACCESS_TOKEN';

  // 私有构造函数，防止实例化
  private constructor() {}
}
