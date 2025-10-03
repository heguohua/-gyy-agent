<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-10 19:22:08
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailFileColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <template v-if="isDetailColumn">
        <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
    </template>
    <template v-else>
        <p class="title" :style="{ minWidth: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <p class="value">
            <div v-if="localValues && localValues.length > 0" class="files">
                <div class="one-file" v-for="(item, index) in localValues" :key="u.uuid()" @click="handleDownload(item)">
                    {{ item.fileName }}
                </div>
            </div>
        </p>
    </template>


</template>

<script setup lang="ts">
import { alaDownload } from '@/utils/req'
import u from '@/utils/u'


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
        type: [String] as PropType<string>,
        default: ''
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
    deepColumnName: {
        type: String,
        default: ''
    }
})

const isDetailColumn = computed(() => {
    return props.formItem.formData?.detail?.desktop
})

// Methods
interface AFile {
    id: number,
    fid: string,
    fileName: string
    classify: string
    url: string
}

const localValues = ref<Array<AFile>>([])

watch(() => props.value, () => {
    if (props.value) {
        localValues.value = u.parseJson(props.value)
    } else {
        localValues.value = []
    }
}, {
    immediate: true,
    deep: true
})

const handleDownload = async (file: AFile) => {

    const result = await alaDownload(u.url('/f/ossfile/download'), { fid: file.fid }).then((data: any) => {
        const response = data;
        return response
    });

    const blob = new Blob([result.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = file.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl); // 释放内存

}

</script>

<style scoped lang="scss">
.files {

    display: flex;
    flex-wrap: wrap;

    .one-file {
        width: 100%;

        &:hover {
            color: var(--el-color-primary);
            cursor: pointer;
        }
    }



}
</style>
