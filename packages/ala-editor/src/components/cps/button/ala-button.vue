<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-25 15:52:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/button/ala-button.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

  <div class="ala-button-wrapper" v-if="displayButton()">

    <div :style="iconStyle" class="icon">
      <VIcon :icon="icon" :image="image" :width="iconWidth" :height="iconHeight" />
    </div>

    <el-button :size="size" :type="buttonType" @click="handleClick" class="ala-button" v-if="!popConfirm" :plain="plain"
      :round="round" :circle="circle" :style="buttonStyles">
      {{ $t('buttons.' + name) }}
    </el-button>

    <el-popconfirm width="250" :icon="InfoFilled" icon-color="#e6a23c" :title="title" @cancel="onCancel"
      @confirm="onConfirm" :hide-after="50" v-else>
      <template #reference>

        <el-button :size="size" :type="buttonType" class="ala-button" :plain="plain" :round="round" :circle="circle"
          :style="buttonStyles">
          {{ $t('buttons.' + name) }}
        </el-button>

      </template>
      <template #actions="{ confirm, cancel }">

        <el-button :size="size" @click="cancel" class="popConfirm-button">{{ t('buttons.cancel') }}</el-button>
        <!-- <el-button type="danger" :size="size" :disabled="!clicked" @click="confirm"> -->
        <el-button type="danger" :size="size" @click="confirm" class="popConfirm-button">
          {{ t('buttons.confirm') }}
        </el-button>

      </template>
    </el-popconfirm>

  </div>

</template>

<script setup lang="ts">
import VIcon from '@/components/base/v-icon.vue';
import { InfoFilled } from '@element-plus/icons-vue'
import { style } from '@logicflow/extension/es/bpmn-elements/presets/icons';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: "small",
  },
  buttonType: {
    type: String,
    default: null,
  },
  showButton: {
    type: Boolean,
    default: false,
  },
  popConfirm: {
    type: Boolean,
    default: false,
  },
  handle: {
    type: Function
  },
  row: {
    type: Object as PropType<any>
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: true
  },
  circle: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  iconWidth: {
    type: String,
    default: '30px'
  },
  iconHeight: {
    type: String,
    default: '30px'
  },
})

const displayButton = () => {
  return props.showButton;
}

const emit = defineEmits()

const handleClick = () => {
  if (props.handle) {
    props.handle(props.row)
  } else {
    emit(props.name)
  }
}

const onCancel = () => {
}

const onConfirm = () => {
  handleClick()
}

const title = computed(() => {
  const action = t('buttons.' + props.name)
  return t('pop.confirm', { action })
})

const iconColor = () => {
  return '#409eff'
}


const buttonStyles = computed(() => {
  const st: any = {}
  if (props.icon || props.image) {
    // 当 按钮左侧有图标时，设置 按钮外层div padding-left 为0
    st['padding-left'] = '2px'
    st['justify-content'] = 'left';
  }
  return st
})

const iconStyle = computed(() => {
  const st: any = {}
  if (props.icon || props.image) {
    // 当 按钮左侧有图标时，设置 按钮外层div padding-left 为0
    st['padding-left'] = '11px'
  }
  return st
})

</script>

<style scoped lang="scss">
.ala-button-wrapper {

  display: inline-flex;
  margin: 0px 2px 2px 0px;
  gap: 2px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

  .icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    justify-items: end;
  }


  .popConfirm-button,
  button {
    border-radius: 3px;
  }

}
</style>