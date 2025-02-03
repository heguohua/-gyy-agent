<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-20 14:50:35
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-03 16:34:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/config/ala-config-collapse-item.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="config-collapse-item">
        {{ title }}
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();



const emit = defineEmits(["callback"])

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    viewport: {
        type: String,
        default: 'desktop'
    },
    bType: {
        type: String,
        default: 'page'
    }
})

const bType = props.bType

const { data } = toRefs(props)
const { formData, parentKey, key, id } = data.value

const { title, default: defaultValue, placeholder, required, rules } = data.value.properties[props.viewport]




// Methods

</script>

<style scoped lang="scss">

</style>
