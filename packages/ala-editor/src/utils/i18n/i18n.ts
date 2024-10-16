/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-14 16:22:03
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-16 10:07:39
 * @FilePath: /low-coding/packages/ala-editor/src/utils/i18n/i18n.ts
 * @Description: 国际化语言包help工具类
 *
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved.
 */
// i18n.ts
import { createI18n } from 'vue-i18n';
import lstore from '../lstore';
import req from '../req';
import { logger } from '../logger';
import { alaConsts } from '@/config/alaConsts';

/**
 * @description: 动态获取对应语言的国际化语言包
 * @param {string} lang 语言类型
 * @return {*}
 */
export async function fetchLocaleMessages(lang?: string) {
  try {
    // 调用方传递了语言类型，首先将语言类型存储到 local storage
    if (lang) {
      lstore.setItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME, lang);
    } else {
      lang = lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME);
    }
    // 如果local storage中没有获取到语言类型，则设置默认语言为简体中文
    if (!lang) {
      lstore.setItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME, 'zh_CN');
      lang = 'zh_CN';
    }
    const response = await req.get('/editor/api/locale', { language: lang });
    return response;
  } catch (error) {
    console.log(error);
    logger.error('获取国际化语言包失败:', error);
    return {};
  }
}

// 假设从后台获取的语言包格式为 { zh_CN: {}, en: {} }
interface vmt {
  data: {
    messages: {};
  };
}

const {
  data: { messages },
} = (await fetchLocaleMessages()) as vmt;

const i18n = createI18n({
  locale: lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME), // 默认语言
  fallbackLocale: 'zh_CN',
  messages, // 后台返回的语言包
});

export default i18n;
