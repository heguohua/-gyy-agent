<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:21:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 13:37:14
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/layout/layout-header.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <img :src="logo" class="logo" />
        <div class="header-title">{{ $t('system.title') }}</div>
      </div>
      <!-- <div class="line"></div> -->
      <!-- <v-select v-model="viewport" :options="app_types" /> -->
    </div>

    <div class="header-right">
      <!-- <el-button>
        <v-icon icon="preview" />
        {{ $t('buttons.preview') }}
      </el-button>
      <el-button type="primary">
        <v-icon icon="publish" />
        {{ $t('buttons.publish') }}
      </el-button> -->
      <el-select v-model="currentLanguage" :placeholder="$t('common.select_placeholder')" @change="chang"
        class="languages">
        <el-option v-for="(value, key) in languages" :key="key" :label="value" :value="key">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">

import { alaConsts } from '@/config/alaConsts';
import { useEditorStore } from '@/store/useEditorStore';
import { Viewport } from '@/types/editorType';
// import i18n, { fetchLocaleMessages } from '@/utils/i18n/i18n';
import { languages } from '@/store/locale';
import { logger } from '@/utils/logger';
import lstore from '@/utils/lstore';
import logo from '@/assets/images/logo.svg'

// 切换语言
// 引入useLocale
import { changLanguage, useLocale } from '@/hooks/useLocale'
// 使用useLocale
const { changeLocale } = useLocale()
import { useI18n } from 'vue-i18n';
const { getLocaleMessage } = useI18n();
const chang = (locale: any) => {
  changLanguage(locale, getLocaleMessage, changeLocale)
}

let currentLanguage = ref(lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME))




const viewport = ref<Viewport>('desktop')
const editorStore = useEditorStore()

watch(viewport, (value) => {
  logger.info("editor-header中切换 viewport,更新 editorStore 中的 viewport 和 configPanelShow");
  // editorStore.setViewport(value)
  // editorStore.setConfigPanelShow('mobile' === value,businessType)
})

let app_types = computed(() => {
  return [
    // {
    //   value: 'desktop',
    //   label: t('common.app_type.desktop'),
    // },
    // {
    //   value: 'mobile',
    //   label: t('common.app_type.mobile'),
    // },
  ]
})


</script>

<style scoped lang="scss">
.header {


  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  height: var(--el-menu-item-height);
  background: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .back {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      flex-shrink: 0;

      .logo {
        width: 40px;
        margin-right: 12px;
      }

      .header-title {
        font-size: 1.4rem;
        font-weight: bold;
        color: transparent;
        /* 使文字透明，以便看到背景 */
        // background: linear-gradient(45deg, #ff9a9e 30%, #fad0c4 50%, #fad0c4 50%, #ff9a9e 70%);
        background: linear-gradient(45deg, #00a8ff 20%, #46c1ff 50%, #6acdff 50%, #00a8ff 30%);
        background-size: 200% 200%;
        background-clip: text;
        -webkit-background-clip: text;
        animation: gradientAnimation 5s ease infinite;
      }

      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }

        50% {
          background-position: 100% 50%;
        }

        100% {
          background-position: 0% 50%;
        }
      }
    }

    .line {
      width: 1px;
      height: 20px;
      border-left: 1px solid var(--color-border);
      padding-right: 16px;
    }
  }

  .header-right {
    position: relative;
    padding-right: 16px;
    display: flex;

    .languages {
      min-width: 150px;
      margin-left: 12px;
    }
  }

}
</style>