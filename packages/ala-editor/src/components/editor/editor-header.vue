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
      <el-select v-model="currentlanguage" placeholder="请选择" @change="changLanguage">
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
import lstore from '@/utils/lstore';

let currentlanguage = ref(lstore.getItem(alaConsts.I18N_LOCALSTORAGE_KEY_NAME))

const changLanguage = () => {
  
  interface vmt {
    data: {
      messages: {}
    }
  }

  fetchLocaleMessages(currentlanguage.value).then((data) => {
    const { data:{messages} } = data as vmt;
    Object.assign(i18n.global.messages, messages)
    i18n.global.locale = currentlanguage.value
  })
  
}

</script>

<style scoped lang="scss"></style>