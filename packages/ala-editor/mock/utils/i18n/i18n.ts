// mock/user.ts

import { logger } from '@/utils/logger';

const languages: Record<string, unknown> = {
  zh_CN: {
    button: {
      yulan: '预览',
    },
  },
  en: {
    button: {
      yulan: 'Preview',
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
          "messages":{}
        },
      };
      resp.data.messages[language] = language_package;
      return resp;
    },
  },
];
