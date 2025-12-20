<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-12-25 16:15:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-20 16:21:20
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/dynamic/DetailFlowInstanceStateColumn.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="ala-detail-flow-instance-state">
        <p class="title" :style="{ minWidth: labelWidth }">
            <template v-if="isDetailPage">
                <AlaFormLabel :label="label" :help="formItem.formData.help?.desktop" />：
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <p class="value" v-if="showValue" :style="style" @click="showInstanceInfo">{{ showValue ? showValue : '123' }}
        </p>
        <p class="value startFlow" v-else :style="style" @click="startFlow">{{ t('buttons.form_initiate') }}</p>

    </div>

    <teleport to="body" v-if="showPreviewPage">
        <!-- 新增、编辑 -->
        <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程信息" width="1800" :tabs="tabs"
            :previewParams="previewParams" />
    </teleport>

    <AlaSelectListPop ref="alaSelectListPop" :columns="columns" :data="pageData" title="办理流程"
        :itemProperty="itemProperty" @selectedChange="handleSelectedFlow" :singleValue="true" />

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
    },
    formIndex: {
        type: Number,
        default: 0
    },
    previewParams: {
        type: Object as any
    },

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
    alaDetailBuild(dType.textColor, 'stateName', "办理状态", 1, true, { colors: { desktop: { '进行中': '#409eff', '已通过': '#67c23a', '已拒绝': '#f56c6c', '已撤回': '#b2b6bf' } }, background: { desktop: true } }),
])


const tabsModel = reactive([
    { title: '流程基本信息', code: 'AlaDetailNoDrawer', props: { fields: detailFields, formAttr: formAttr } },
    { title: '流程表单', code: 'AlaDetailNoDrawerForms', props: { forms: [], formAttr: formAttr } },
    { title: '流程图', code: 'ProcessPreview', props: { viewer: true } },
    { title: '办理记录', code: 'AlaDetailNoDrawerTasks', props: {} },
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

    if (props.isDetailPage) {
        return
    }

    if (props.formItem.formData?.disableEvent?.desktop) {
        return
    }

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

            // 组装 办理记录 页面参数
            previewParams.instanceId = row.id

            showPreviewPage.value = true

        } else {
            notify.error(t('pop.warm_title'), "没有查询到符合条件的【 流程实例 】")
        }
    });
}

const alaSelectListPop = ref()
const itemProperty: { valueName: string, propertyName: string, otherProperty: any } = {
    valueName: 'id',
    propertyName: 'displayName',
    otherProperty: {}
}

const columns = ref([
    { label: '流程名称', prop: 'displayName' },
    { label: '唯一编码', prop: 'name' },
    { label: '备注', prop: 'remark' },
])

const pageData = ref([])

const startFlow = () => {

    if (props.isDetailPage) {
        return
    }

    if (props.formItem.formData?.disableEvent?.desktop) {
        return
    }

    // 1）根据 dict_code 从数据字典中查询当前流程分类的id和dict_label；
    const url = '/a/dict/list'

    let params = { dictCode: `pType-${baseInfo.module}` }

    alaPost(u.url(url), params, false, '').then((response: any) => {
        if (response.data?.[0]) {
            // 根据 流程分类信息获取流程流程定义数据
            const url = '/p/define/searchForApply'
            const params = { state: 1, type: response.data?.[0].id }
            alaPost(u.url(url), params, false, '').then((response: any) => {
                if (response.data?.[0]?.defineVos) {
                    pageData.value = response.data?.[0].defineVos
                    alaSelectListPop.value.openDialog()
                }
            })
        } else {
            notify.error(t('pop.warm_title'), `错误：没有在数据字典中查询到【字典值】为“pType-${baseInfo.module}”的流程分类信息！`)
        }
    });
}

const handleSelectedFlow = (flows: any[]) => {

    if (flows?.[0]?.id) {
        const defineId = flows[0].id

        const url = '/l/dynamic/startForPage'

        let params = { tableName: `${baseInfo.module}`, defineId, businessId: props.data.id || baseInfo.id }

        alaPost(u.url(url), params, false, '').then((response: any) => {
            if (response.code == 200) {
                notify.success(t('pop.warm_title'), `流程发起【 成功 】！`)

                // 刷新当前列表数据
                emit('refresh')

            } else {
                notify.error(t('pop.warm_title'), `错误：发起流程【 失败 】！`)
            }
        });

    }
}

const emit = defineEmits(['refresh'])

</script>

<style scoped lang="scss">
.ala-detail-flow-instance-state {

    width: 100%;
    display: flex;

    .startFlow {
        color: var(--el-text-color-regular);
        background: rgb(230, 162, 60, 0.6);
        border-radius: 4px;
        padding: 2px 16px;


    }

    &:hover {
        cursor: pointer;

        .value {
            color: #67c23a !important;
        }

        .startFlow {
            background: #409eff;
            color: #fff !important;
            font-weight: bold;

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
