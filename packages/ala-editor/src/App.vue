<template>
  <!-- <el-config-provider :locale="elLocale"> -->
    <RouterView />
  <!-- </el-config-provider> -->


</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { useI18n } from 'vue-i18n';
import { logger } from './utils/logger';

// const { locale } = useI18n();

// logger.info(locale.value);


// const elLocale = computed(() => {
//   if (locale.value === 'en') return en;
//   return zhCn;
// });
</script>
<style scoped></style>
