/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 17:10:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 13:58:48
 * @FilePath: /low-coding/packages/ala-editor/mock/utils/i18n/i18n.ts
 * @Description: i18n 国际化语言包模拟数据
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
// mock/user.ts

import { logger } from '@/utils/logger';

const languages: Record<string, unknown> = {
  zh_CN: {
    // 公共部分
    common: {
      select_placeholder: '请选择',
      app_type: {
        desktop: "桌面端",
        mobile: "移动端",
      }
    },
    // 按钮
    button: {
      yulan: '预览',
      fabu: '发布',
    },
    // icon hover 文字
    icon: {
      back: '返回',
    },
    // 功能模块，命名规则“p_功能模块英文名”，例如 p_editor、p_user、p_role 等
    p_editor: {
      list_page: '列表页面',
      block: {
        base: {
          name: "组件",
          baseBlock: "基础组件",
          seniorBlock: "高级组件"
        },
        kit: {
          name: "套件",
          baseBlock: "基础套件",
          seniorBlock: "高级套件"
        },
      }
    },
  },
  en: {
    // 公共部分
    common: {
      select_placeholder: 'Please Select',
      app_type: {
        desktop: "Desktop",
        mobile: "Mobile",
      }
    },
    button: {
      yulan: 'Preview',
      fabu: 'Publish',
    },
    icon: {
      back: 'Back',
    },
    p_editor: {
      list_page: 'List Page',
      block: {
        base: {
          name: "Blocks",
          baseBlock: "Base Blocks",
          seniorBlock: "Senior Blocks"
        },
        kit: {
          name: "Kits",
          baseBlock: "Base Kits",
          seniorBlock: "Senior Kits"
        },
      }
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
