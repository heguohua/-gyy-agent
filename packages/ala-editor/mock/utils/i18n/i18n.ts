/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 17:10:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-16 10:18:02
 * @FilePath: /low-coding/packages/ala-editor/mock/utils/i18n/i18n.ts
 * @Description: i18n 国际化语言包模拟数据
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
// mock/user.ts

import { logger } from '@/utils/logger';

const languages: Record<string, unknown> = {
  zh_CN: {
    button: {
      yulan: '预览',
      fabu: '发布',
    },
    icon: {
      back: '返回',
    },
    p_editor: {
      list_page: '列表页面',
    },
    common: {
      select_placeholder: '请选择',
    },
  },
  en: {
    button: {
      yulan: 'Preview',
      fabu: 'Publish',
    },
    icon: {
      back: 'Back',
    },
    p_editor: {
      list_page: 'List Page',
    },
    common: {
      select_placeholder: 'Please Select',
    },
  },
};
export default [
  // 获取国际化语言包接口
  {
    url: '/editor/api/locale',
    method: 'get',
    response: (request: any) => {
      const language = request.query.language;
      logger.info('获取国际化语言包接口，入参', language);
      let language_package = languages[language];
      logger.error(language_package);
      // 有就返回成功信息
      const resp: Record<string, any> = {
        code: 200,
        data: {
          messages: {},
        },
      };
      resp.data.messages[language] = language_package;
      return resp;
    },
  },
];
