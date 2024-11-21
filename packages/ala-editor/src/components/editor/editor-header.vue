<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:21:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-21 15:03:17
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/editor/editor-header.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <v-icon-tooltip :content="$t('icon.back')" icon="back" />
        <div class="header-title">{{ $t('p_editor.list_page') }}</div>
      </div>
      <div class="line"></div>
      <v-select v-model="viewport" :options="app_types" />
    </div>

    <div class="header-right">
      <el-button>
        <v-icon icon="preview" />
        {{ $t('buttons.preview') }}
      </el-button>
      <el-button type="primary">
        <v-icon icon="publish" />
        {{ $t('buttons.publish') }}
      </el-button>
      <el-select v-model="currentLanguage" :placeholder="$t('common.select_placeholder')" @change="changLanguage"
        class="languages">
        <el-option v-for="(value, key) in languages" :key="bType + '-' + key" :label="value" :value="key">
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
// import { languages } from '@/utils/i18n/languages';
import { logger } from '@/utils/logger';
import lstore from '@/utils/lstore';

// const { global: { t } } = i18n

const props = defineProps({
  bType: {
    type: String,
    default: 'page'
  },
})
const bType = props.bType

let currentLanguage = ref(lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME))

/**
 * 切换语言包
 */
const changLanguage = () => {
  interface vmt {
    data: {
      messages: {}
    }
  }
  /**
   * 加载新的语言包，并切换语言
   */
  // const messages = i18n.global.messages as vmt["data"]
  // let currentLanguageValue = currentLanguage.value
  // if (!(currentLanguageValue in messages)) {
  //   fetchLocaleMessages(currentLanguageValue).then((data) => {
  //     logger.info(`即将加载并切换语言包 [ ${currentLanguageValue} ]`)
  //     const { data: { messages } } = data as vmt;
  //     Object.assign(i18n.global.messages, messages)
  //     i18n.global.locale = currentLanguageValue
  //   })
  // } else {
  //   logger.info("语言包已存在", currentLanguageValue)
  //   i18n.global.locale = currentLanguageValue
  // }
}

const viewport = ref<Viewport>('desktop')
const editorStore = useEditorStore()

watch(viewport, (value) => {
  logger.info("editor-header中切换 viewport,更新 editorStore 中的 viewport 和 configPanelShow");
  // editorStore.setViewport(value, bType)
  // editorStore.setConfigPanelShow('mobile' === value)
})

let app_types = computed(() => {
  return [
    {
      value: 'desktop',
      // label: t('common.app_type.desktop'),
    },
    {
      value: 'mobile',
      // label: t('common.app_type.mobile'),
    },
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
  height: var(--edit-header-height);
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

      .header-title {
        font-size: 14px;
        padding-left: 4px;
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