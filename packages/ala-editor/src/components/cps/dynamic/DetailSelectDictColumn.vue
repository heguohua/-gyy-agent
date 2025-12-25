<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-20 16:22:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailSelectDictColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <template v-if="isDetailColumn">
        <p class="title" :style="{ minWidth: labelWidth }">
            <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" :alaComponent="formItem.code" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <p class="detail-link value" @click="showDetail">{{ showValue }}</p>
    </template>
    <template v-else>
        <p class="title" :style="{ minWidth: labelWidth }">
            <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" :alaComponent="formItem.code" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <p class="value">{{ showValue }}</p>

    </template>


</template>

<script setup lang="ts">
import u from '@/utils/u';
import { useAlaStore } from '@/store/ala-store'
import { alaPost } from '@/utils/req';
import { PropType } from 'vue';

// State
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    formItem: {
        type: Object,
        default: {}
    },
    value: {
        type: [String, Array<any>] as PropType<string | Array<any>>,
        default: []
    },
    label: {
        type: String,
        default: ''
    },
    labelWidth: {
        type: String,
        default: ''
    },
    isDetailPage: {
        type: Boolean,
        default: false
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    }
})

const tmpValue = ref('')
watch(() => props.value, async () => {

    let values = toRaw(props.value)

    const propertyName = props.formItem.formData.itemProperty.desktop.propertyName
    const valueName = props.formItem.formData.itemProperty.desktop.valueName
    const results: string[] = []

    if (values && typeof values === 'string' && values.toString().startsWith('[')) {
        values = u.parseJson(values)
    }

    if (values && values.length > 0) {

        for (let index in values) {
            let v: any = values[index]

            if (v[propertyName] != undefined) {

                results.push(v[propertyName])

            } else {
                const alaStore = useAlaStore()
                const key = 'd-' + v[valueName]
                const dictValue = alaStore.get(key)
                if (!dictValue) {
                    // 从数据字典中加载并缓存
                    // Methods
                    const url = '/a/dict/list'
                    let params = { [valueName]: v[valueName] }

                    await alaPost(u.url(url), params).then((data: any) => {
                        const response = data;
                        if (response.data && response.data.length > 0) {
                            const dv = response.data[0][propertyName]
                            results.push(dv)
                        }

                    });
                }
            }

            tmpValue.value = results.join('，')

        }




    }
}, {
    immediate: true,
    deep: true
})

// Methods
const showValue = computed(() => {
    return tmpValue.value
})

const emit = defineEmits(['showDetail', 'refresh'])
const showDetail = () => {
    emit('showDetail', props.data)
}

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

</script>

<style scoped lang="scss">
.detail-link {
    color: var(--el-menu-active-color);

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        font-weight: 500;
    }
}
</style>
