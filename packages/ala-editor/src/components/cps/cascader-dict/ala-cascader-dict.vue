<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 21:55:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-11-22 11:53:37
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/cascader-dict/ala-cascader-dict.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
  <div class="ala-cascader-dict-wrapper">
    <el-form-item :label="label" :label-position="position" :prop="fieldName">
      <template #label>
        <AlaFormLabel :label="label" :help="help" />
      </template>
      <el-cascader :model-value="data" :options="options" :props="configs" @change="handleChange" :clearable="clearable"
        :showAllLevels="showAllLevels" :filterable="filterable" :placeholder="placeholder" :disabled="isDisabled">

        <template #default="{ node, data }">
          <div v-if="node.isLeaf" class="c-leaf">
            <img v-if="data.image" :src="data.image" class="c-image" />
            <span class="c-title">{{ data.label }}</span>
          </div>
          <span v-if="!node.isLeaf"> {{ data.label }}({{ data.children.length }}) </span>
        </template>

      </el-cascader>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaPost } from '@/utils/req';
import u from '@/utils/u'
import { CascaderValue } from 'element-plus'


interface Item {
  name: string,
  value: string
}

// State
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  position: {
    type: String as () => '' | 'top' | 'left' | 'right',
    default: 'left'
  },
  placeholder: {
    type: String,
    default: ''
  },
  items: {
    type: String,
    default: ''
  },
  bType: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 100,
  },
  fieldName: {
    type: String,
    default: ''
  },
  help: {
    type: String,
  },
  dictValue: {
    type: String,
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showAllLevels: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
  },
  noEditable: {
    type: Boolean,
    default: () => false
  }
})


const configs = {
  expandTrigger: 'hover' as const,
  label: 'label',
  value: 'id',       // 关键！！！
  children: 'children'
}

const model = defineModel({
  type: String || Number || Boolean || undefined
})

logger.info(`bType[ ${props.bType} ]，渲染 动态表单 ala-cascader-dict 组件，props：`, props);
logger.info(`${model.value}`);


// const styles = computed(() => ({}))
const data = ref<CascaderValue>([])
const handleChange = (value: any) => {
  data.value = value
}

watch(() => data.value, (value: any) => {
  model.value = u.tojson(value)

})

watch(() => model.value, (value: any) => {

  if (value) {
    data.value = u.parseJson(value)
  }
}, {
  immediate: true
})

// Methods
interface TreeNode {
  dictLabel?: string;
  label?: string;
  id: number;
  isLeaf: boolean;
  children?: TreeNode[];
}

const options = ref<Array<TreeNode>>([])

const isDisabled = computed(() => {
  const idd = false

  if (props.noEditable) {
    return true
  }
  return idd
})


/**
 * 将树形数组中所有 dictLabel 重命名为 label
 */
const transformDictLabelToLabel = (data: TreeNode[]): TreeNode[] => {
  const deepTransform = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map(node => {
      const { dictLabel, children, ...rest } = node;

      const newNode: TreeNode = {
        ...rest,
        label: dictLabel ?? node.label, // 若已有 label 则保持原 label
        children: children && children.length ? deepTransform(children) : [],
        leaf: children && children.length ? false : true
      } as TreeNode;


      return newNode;
    });
  };

  return deepTransform(data);
}

const query = () => {
  // Methods
  const url = '/a/dict/selectTree'

  let params = { dictValue: props.dictValue }


  logger.info(`从 dict 模块加载下拉组件数据，url【 ${url} 】，查询参数：`, params);

  alaPost(u.url(url), params, false, '').then((data: any) => {
    const response = data;

    if (response.data) {
      options.value = transformDictLabelToLabel(response.data[0].children || [])
    }

  });
}
onMounted(() => {
  query()
})

</script>

<style scoped lang="scss">
.ala-cascader-dict-wrapper {
  :deep(.el-cascader) {
    width: 100%;
  }
}
</style>

<style lang="scss">
.c-leaf {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .c-image {
    width: 20%;
    margin-right: 8%;
  }

  .c-title {
    width: 72%;
  }
}
</style>
