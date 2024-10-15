<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:21:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-15 15:04:32
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/editor-header.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <v-icon-tooltip content="返回" icon="back" />
        <div class="header-title">页面</div>
      </div>
      <div class="line"></div>
    </div>
    
    <div class="header-right">
      <el-button>
        <v-icon icon="preview" />
        预览-{{ $t('button.yulan') }}
      </el-button>
      <el-button type="primary">
        <v-icon icon="publish" />
        发布
      </el-button>
      <el-select v-model="currentLanguage" placeholder="请选择" @change="changLanguage">
        <el-option v-for="(value, key) in languages" :key="key" :label="value" :value="key">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">

import { alaConsts } from '@/config/alaConsts';
import i18n, { fetchLocaleMessages } from '@/utils/i18n/i18n';
import { languages } from '@/utils/i18n/languages';
import { logger } from '@/utils/logger';
import lstore from '@/utils/lstore';

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
  const messages = i18n.global.messages as vmt["data"]
  if (!(currentLanguage.value in messages)) {
    fetchLocaleMessages(currentLanguage.value).then((data) => {
      const { data: { messages } } = data as vmt;
      Object.assign(i18n.global.messages, messages)
      i18n.global.locale = currentLanguage.value
    })
  } else {
    logger.info("语言包已存在", currentLanguage.value)
  }

}

</script>

<style scoped lang="scss">
img {
  background: red
}
</style>