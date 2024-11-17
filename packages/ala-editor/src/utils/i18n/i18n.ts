/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-16 14:36:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-17 18:48:12
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/i18n/i18n.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// plugins/i18n.ts
import { useLocaleStore } from '@/store/locale'

import en from "@/locales/en"
import zh_CN from "@/locales/zh-CN"
import zh_TW from "@/locales/zh-TW"
import zh from "@/locales/zh"
import ru from "@/locales/ru"
import { App } from 'vue'
import { createI18n, I18n } from 'vue-i18n'

export let i18n: ReturnType<typeof createI18n>
// export let i18n: any

// 用于创建vuei18n实例的方法
const createI18nOptions = () => {

    // 从 localeStore 中获取currentLocale
    const localeStore = useLocaleStore()
    const currentLocale = localeStore.getCurrentLocale

    return {

        //当前语言
        locale: currentLocale.lang,

        //默认语言包, 当没有匹配的语言包时使用默认语言包
        fallbackLocale: 'zh-CN',

        //注册本地内置的语言包
        messages: {
            en,
            'zh-CN': zh_CN,
            'zh-TW': zh_TW,
            'zh': zh,
            'ru': ru,
        },
        // 后台返回的语言包
        globalInjection: true

    }
}

// 使用i18n的方法
export const setupI18n = (app: App<Element>) => {
    const options = createI18nOptions()
    // i18n = createI18n(options) as I18n
    i18n = createI18n(options);
    // 将i18n实例挂载到全局window对象上
    // window['ai18n'] = i18n;
    (window as any).ai18n = i18n;
    app.use(i18n)
}
