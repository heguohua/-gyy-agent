<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 20:21:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2026-01-12 11:04:41
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

      <div class="languages">
        <el-select v-model="currentLanguage" :placeholder="$t('common.select_placeholder')" @change="chang">
          <el-option v-for="(value, key) in languages" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
      </div>

      <div class="systems">
        <el-select v-model="system" :placeholder="$t('common.select_placeholder')" @change="changSystem">
          <el-option v-for="(value, key) in systems" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
      </div>

      <div class="icon-operation">
        <el-dropdown trigger="hover" @command="handleCommand">
          <div class="ala-icon">
            <img :src="imageValue" class="photo" />
            <p class="userName">{{ user?.realName }}</p>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="updatePassword">
                <VIcon icon="password" width="18" height="18" />&nbsp;&nbsp;{{ t('buttons.updatePassword') }}
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                <VIcon icon="logout" width="18" height="18" />&nbsp;&nbsp;{{ t('buttons.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

  </div>

  <ala-change-password ref="changePasswordRef" />

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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// 切换语言
// 引入useLocale
import { changLanguage, useLocale } from '@/hooks/useLocale'
// 使用useLocale
const { changeLocale } = useLocale()
import u from '@/utils/u';
import { alaDownload, alaPost, get } from '@/utils/req';
import { useAlaStore } from '@/store/ala-store';
const { getLocaleMessage } = useI18n();
const alaStore = useAlaStore()

const chang = (locale: any) => {
  changLanguage(locale, getLocaleMessage, changeLocale)
}

const changSystem = (system: any) => {

  if (!system) {
    return
  }
  // 切换语言环境
  logger.warn(`正在切换项目菜单，项目名称【 ${system} 】`);


  // 1、先从 pinia 缓存中加载语言包，如果没有加载到，则从服务器端加载
  // const alaStore = useAlaStore()
  // let messages = alaStore.get(system);
  // if (!messages) {


  lstore.setItem(alaConsts.SYSTEM_LOCAL_STORAGE_KEY_NAME, system)


  alaPost(u.url("/u/menu/queryListForUser"), { "system": system }, true).then((data: any) => {

    // 先加载所有语言包
    changLanguage(lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME) || alaConsts.I18N_DEFAULT, getLocaleMessage, changeLocale)

    const modules = import.meta.glob('@/pages/**/*.vue');
    // MenuUtil.registerDynamicRouter(data.data, t, modules)
    // 从 localStorage 中恢复路由

  });

  // } else {
  //   logger.info(`不需要后台查询，直接从【 缓存 】中加载语言包`, existedMessages);


  // }



}

let currentLanguage = ref(lstore.getItem(alaConsts.I18N_LOCAL_STORAGE_KEY_NAME) || alaConsts.I18N_DEFAULT)



enum systems {
  "all" = '全量功能',
  "oa" = '办公数字化',
  'yuanqu' = "智慧园区/建筑"
}

let system = ref(lstore.getItem(alaConsts.SYSTEM_LOCAL_STORAGE_KEY_NAME) || alaConsts.SYSTEM_DEFAULT)

const changePasswordRef = ref()


const viewport = ref<Viewport>('desktop')
const editorStore = useEditorStore()

watch(viewport, (value) => {
  logger.info("editor-header中切换 viewport,更新 editorStore 中的 viewport 和 configPanelShow");
})

let app_types = computed(() => {
  return [

  ]
})

const logout = () => {
  alaPost(u.url('/out'), '', false, "get").then((response: any) => {
    console.log('response:', response);
    if (response.code === 200) {
      // 删除本地 localStorage中的token
      lstore.removeItem(alaConsts.is_logined_key)
      window.location.href = '/'
    }
  })
}
const handleCommand = (command: string) => {
  if (command === 'updatePassword') {
    // 显示密码修改框
    changePasswordRef.value.open()
  } else if (command === 'logout') {
    logout()
  }
}

const user = ref<any>()
onMounted(() => {
  user.value = lstore.getItem(alaConsts.user_name)
})

const imageValue = ref<any>()
watch(() => user.value, async (v) => {

  if (v) {
    const fid = user.value.icon
    const result = await alaDownload(u.url('/f/ossfile/download'), { fid: fid }).then((data: any) => {
      const response = data;
      return response
    })
    const blob = new Blob([result.data])
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result
      if (typeof base64 === 'string') {
        imageValue.value = base64
        alaStore.set('userPhoto', base64)
      }
    }

    reader.onerror = (e) => {
      console.log('e:', e)
    }

    reader.readAsDataURL(blob) // 转成 base64
  }
}, {
  immediate: true,
  deep: true
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

    .systems {
      min-width: 140px;
      margin-left: 12px;
    }

    .icon-operation {

      margin-left: 16px;
      cursor: pointer;
      width: 130px;

      .ala-icon {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        white-space: nowrap;

        .photo {
          height: 2rem;
          border-radius: 1rem;
        }

        .userName {
          display: flex;
          flex-wrap: nowrap;
          margin-left: 4px;
        }
      }


    }
  }

}

/* 设置下拉菜单的宽度 */
.el-dropdown-menu {
  min-width: 140px;
  padding: 8px 0px;

  /* 如果需要设置每个菜单项的宽度，可以这样设置 */
  :deep(.el-dropdown-menu__item) {
    // width: 100%;
    line-height: 32px !important;

  }
}
</style>