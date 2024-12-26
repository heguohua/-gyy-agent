<template>

    <template v-for="(item, index) in columns" :key="item.fieldName + '-' + index">

        <component :is="item.componentName" :label="item.label ? parseLabel(item.label) : ''" :value="item.value"
            :formItem="item.formItem" />

    </template>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State
interface Column {
    componentName: string,
    value: any,
    label: string,
    formItem: object,
}

const props = defineProps({
    columns: {
        type: Array<Column>,
        default: []
    },
})

// Methods

/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label);
}

</script>

<style scoped lang="scss"></style>