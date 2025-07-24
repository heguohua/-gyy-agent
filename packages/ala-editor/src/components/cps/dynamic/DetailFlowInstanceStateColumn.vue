<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-24 20:56:09
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailFlowInstanceStateColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-flow-instance-state">
        <p class="title" :style="{ width: labelWidth }">{{ label }} <template v-if="isDetailPage"> ：</template></p>
        <p class="value" :style="style" @click="showInstanceInfo">{{ showValue }}</p>

    </div>


    <teleport to="body" v-if="showPreviewPage">
        <!-- 新增、编辑 -->
        <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程信息" width="1800" :tabs="tabs"
            :previewParams="previewParams" />
    </teleport>

</template>

<script setup lang="ts">
import { alaDetailBuild, alaDetailDate, alaDetailInput } from '@/config/alaDetailBuilder'
import u from '@/utils/u'
import { dType } from './detailType'
import { alaPost } from '@/utils/req'
import notify from '@/utils/notify'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
        type: [String, Number, Boolean, Object] as PropType<string | number | boolean | object>,
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
    }
})

// Methods

const color = ref('')
const style = computed(() => {
    const st = {}

    if (color.value) {
        u.merged(st, { color: color.value, fontWeight: 'bold' })
    }

    return st
})


// 2025-6-9 修复分页列表、详情页面值回显异常bug
const showValue = computed(() => {
    const value = props.value
    const items = props.formItem.formData.items.desktop

    let v = undefined

    if (items) {
        items.forEach((item: any) => {

            Object.keys(item).forEach((key: string) => {

                if (item[key] === value) {
                    v = key
                    if (item.name) {
                        v = item.name
                    }
                    if (item.color) {
                        color.value = item.color
                    } else {
                        color.value = ''
                    }
                }
            })

        })
    }

    return v
})



const showPreviewPage = ref(false)
const previewParams = reactive<any>({ forms: [], defineId: 0, data: {} })


const formAttr = ref({
    formWidth: 1800,
    columnNum: 1,
    labelWidth: 120,
    labelPosition: 'left',
    useFormTitle: false,
})

const detailFields: any = ref([
    alaDetailInput('defineDisplayName', "流程名称", 1, true),
    alaDetailInput('operatorName', "发起人"),
    alaDetailDate('createdTime', "发起时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailDate('expireTime', "过期时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailBuild(dType.textColor, 'stateName', "审批状态", 1, true, { colors: { desktop: { '进行中': '#409eff', '已完成': '#67c23a', '已拒绝': '#f56c6c', '已撤回': '#b2b6bf' } }, background: { desktop: true } }),
])

const tabsModel = reactive([
    { title: '流程基本信息', code: 'AlaDetailNoDrawer', props: { fields: detailFields, formAttr: formAttr } },
    { title: '流程表单', code: 'AlaDetailNoDrawerForms', props: { forms: [], formAttr: formAttr } },
    { title: '流程图', code: 'ProcessPreview', props: { viewer: true } },
    { title: '审批记录', code: 'AlaDetailNoDrawerTasks', props: {} },
])
const tabs = computed(() => {
    return tabsModel
})

// 获取数据缓存对象
const baseInfo = inject('baseInfo', {
    module: '',
    moduleName: '',
    id: 0,
    item: Object
});
const showInstanceInfo = () => {

    const businessNo = [{ id: props.data.id || baseInfo.id, tableName: baseInfo.module }]
    const params = { businessNo: u.tojson(businessNo) }

    const url = '/p/instance/findByBusinessNo'
    alaPost(u.url(url), params, false, '').then((response: any) => {

        if (response.data) {
            const row = response.data

            // // 组装 基本信息 
            previewParams.data = { item: row }

            // 组装 审核表单预览页面参数
            const variable = u.parseJson(row.variable)
            const forms = u.parseJson(variable.forms)
            previewParams.forms = []
            forms.forEach((form: { id: number, tableName: string }) => {
                previewParams.forms.push({ id: form.id, tableName: form.tableName })
            })

            // 组装 流程图 预览页面参数
            previewParams.defineId = row.defineId

            // 组装 审批记录 页面参数
            previewParams.instanceId = row.id


            showPreviewPage.value = true

        } else {
            notify.error(t('pop.warm_title'), "没有查询到符合条件的【 流程实例 】")
        }



    });



}

</script>

<style scoped lang="scss">
.ala-detail-flow-instance-state {

    width: 100%;
    display: flex;

    &:hover {
        cursor: pointer;

        .value {
            color: #67c23a !important;
        }
    }
}

:deep(.ala-chapter-icon) {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}

:deep(.title) {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}

:deep(.content) {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}
</style>
