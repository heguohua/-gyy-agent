/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-16 14:45:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-16 16:41:05
 * @FilePath: /1-low-coding/packages/ala-editor/src/hooks/useLocale.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { i18n } from '@/utils/i18n/i18n'
import { useLocaleStore } from '@/store/locale'
import { logger } from '@/utils/logger'

// 切换语言的方法
// const setI18nLanguage = (locale: LocaleType) => {
const setI18nLanguage = (locale: any) => {

    const localeStore = useLocaleStore()

    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        ; (i18n.global.locale as any).value = locale
    }

    // 存储当前语言
    localeStore.setCurrentLocale({
        lang: locale
    })

}

export const useLocale = () => {

    // const changeLocale = async (locale: LocaleType) => {
    const changeLocale = async (locale: any) => {
        
        // 获取全局的i18n实例
        const globalI18n = i18n.global
        // 设置语言
        globalI18n.locale = locale
        // 存储当前语言
        setI18nLanguage(locale)
    }
    return {
        changeLocale
    }
}
