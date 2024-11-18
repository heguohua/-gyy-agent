/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-16 14:45:14
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-18 09:05:00
 * @FilePath: /1-low-coding/packages/ala-editor/src/hooks/useLocale.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import { i18n } from '@/utils/i18n/i18n'
import { useLocaleStore } from '@/store/locale'
import { logger } from '@/utils/logger'
import { alaPost } from '@/utils/req'
import u from '@/utils/u'

import { useAlaStore } from '@/store/ala-store'
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



/**
 * 切换语言
 */
export const changLanguage = (locale: any, getLocaleMessage: Function, changeLocale: Function) => {

    // 切换语言环境
    logger.warn(`正在切换语言环境，新语言【 ${locale} 】`);

    const existedMessages = getLocaleMessage(locale);


    // 1、先从 pinia 缓存中加载语言包，如果没有加载到，则从服务器端加载
    const alaStore = useAlaStore()

    let messages = alaStore.get(locale);
    if (!messages) {

        const url = '/a/dict/language/list'
        // 保存数据并刷新分页列表
        // 判断当前数据 id 存不存在，不存在调用【 新增 】接口，存在则调用【 更新 】接口

        alaPost(u.url(url || ''), { dictCode: locale }, false).then((data: any) => {

            const newMessages = data.data || {};
            logger.info(`当前语言【 后台新加载 】语言包`, newMessages);
            u.merged(existedMessages, newMessages)
            logger.info(`当前语言【 扩充后 】语言包`, getLocaleMessage(locale));

            alaStore.set(locale, newMessages)

            changeLocale(locale)

        });

    } else {
        logger.info(`不需要后台查询，直接从【 缓存 】中加载语言包`, existedMessages);

        // 直接切换，不需要加载
        changeLocale(locale)

    }




}