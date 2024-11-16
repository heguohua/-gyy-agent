/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-16 14:23:51
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-16 16:04:39
 * @FilePath: /1-low-coding/packages/ala-editor/src/store/locale.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { defineStore } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import ru from 'element-plus/es/locale/lang/ru'
import lstore from '@/utils/lstore'
import { alaConsts } from '@/config/alaConsts'
import { logger } from '@/utils/logger'

export enum languages {
    "zh-CN" = '简体中文',
    'zh-TW' = "繁體中文",
    "en" = 'English',
    "ru" = 'Русский язык',
}
const elLocaleMap: { [key: string]: any } = {
    'zh-CN': zhCn,
    'zh-TW': zhTw,
    'en': en,
    'ru': ru,
}

interface CurrentLocale {
    lang: string,
    // elLocale: any,
    elLocale: {},
}

const getConfig = () => {
    let language = lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME)
    logger.warn(`当前localStorage中存储的语言名字为【 ${language} 】`);
    if (!language) {
        language = 'zh-CN'
    }
    const elLocale = elLocaleMap[language]
    logger.info(`当前启用的el语言包：`, elLocale);
    return elLocale
}

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        currentLocale: {
            //当前语言
            lang: "zh",
            //element-plus的语言包
            elLocale: getConfig(),
        }
    }),
    getters: {
        getCurrentLocale(): CurrentLocale {
            return this.currentLocale
        },
    },
    actions: {
        setCurrentLocale(localeMap: typeof elLocaleMap) {
            // this.locale = Object.assign(this.locale, localeMap)
            this.currentLocale.lang = localeMap?.lang
            this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
            lstore.setItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME, localeMap?.lang)
        }
    }
})




