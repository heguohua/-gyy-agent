// i18n.ts
import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';
import lstore from '../lstore';
import { languages } from './languages';
import req from '../req';
import { logger } from '../logger';
import { alaConsts } from '@/config/alaConsts';

// async function fetchLocaleMessages() {
//   try {
//     let lang = lstore.getItem(alaConsts.I18N_LOCALSTORAGE_KEY_NAME);
//     if (!lang) {
//       lstore.setItem(alaConsts.I18N_LOCALSTORAGE_KEY_NAME, languages.Chinese_Simplified);
//     }
//     lang = lang ? lang : languages.Chinese_Simplified;
//     const response = await req.get('/editor/api/locale', { language: lang });
//     logger.error(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//     logger.error('获取国际化语言包失败:', error);
//     return {};
//   }
// }

// // 假设从后台获取的语言包格式为 { zh_CN: {}, en: {} }
// const {data} = (await fetchLocaleMessages()) as unknown as {
//   [key: string]: LocaleMessages<VueMessageType>;
// };

// console.log("国际化语言包",data);

// const i18n = createI18n({
//   locale: lstore.getItem(alaConsts.I18N_LOCALSTORAGE_KEY_NAME), // 默认语言
//   //   locale: "zh_CN", // 默认语言
//   data, // 后台返回的语言包
// });

const messages = {
  en: {
    button:"button"
    // Element Plus English messages
  },
  zh: {
    
    // Element Plus Chinese messages
  }
};
 
const i18n = createI18n({
  locale: 'zh', // set default locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

export default i18n;
